import string
from .apiClient.YoutubeClient import YoutubeApiClient
from .classes.VideoDataClass import YoutubeVideoData
from .models import CommentData, DailyRankData, VideoData
from django.utils import timezone
from django.utils.timezone import localtime
from collections import Counter
from .utils.anti_word import ANTI_WORD_LIST
import MeCab

"""
==== main関数 処理の流れ ====
1. youtubeAPI fetch
2. responseData to List[YoutubeVideoData]
3. fetch comment
4. morphological analysis
5. insert database
===========================
"""
def youtube_api_service():
    now = localtime(timezone.now())
    now.strftime('%Y-%m-%d')
    print("Access YouTube API {}".format(now))
    youtube_client = YoutubeApiClient()
    # 急上昇取得
    response = youtube_client.fetch_youtube_trend()
    # YoutubeVideoDataのListに変換
    video_data_list = to_video_data_list(response)
    # コメントを取得してYoutubeVideoDataのListに追加
    video_data_list = fetch_comments(video_data_list, youtube_client)
    # コメントを形態素解析してYoutubeVideoDataのListに追加
    video_data_list = morphological_analysis_comment(video_data_list)
    # データベースにInsert
    insert_database(video_data_list)


"""
fetchしたYouTubeの動画データをYoutubeVideoDataクラスのリストにキャストする
@param response fetchデータ
@return video_data_list キャスト後データ
"""
def to_video_data_list(response) -> list[YoutubeVideoData]:
    video_data_list = []
    # responseがFalseでない
    if response:
        # VideoDataにキャストしてvideo_data_listに追加
        for item in response['items']:
            snippet = item['snippet']
            # videoId
            id = item['id']
            # title MySQL非対応の4バイト絵文字を取り除く
            title = snippet['title']
            title = ''.join(filter(lambda c: len(c.encode('utf-16-be')) == 2, title))
            # image_url
            thumbnail_url = snippet['thumbnails']['high']['url']
            # channel_title MySQL非対応の4バイト絵文字を取り除く
            channel_title = snippet['channelTitle']
            channel_title = ''.join(filter(lambda c: len(c.encode('utf-16-be')) == 2, channel_title))
            # VideoDataClass生成
            video_data = YoutubeVideoData(id, title, thumbnail_url, channel_title)
            video_data_list.append(video_data)
    return video_data_list


"""
DBにレコードが存在しないYouTube動画のコメントをfetchして形態素解析してvideo_data_listにsetする
@param video_data_list
@param youtube_client
@return video_data_list
"""
def fetch_comments(
        video_data_list: list[YoutubeVideoData], youtube_client: YoutubeApiClient
    ) -> list[YoutubeVideoData]:
    for video_data in video_data_list:
        # 動画のレコードが存在しない
        # if not(VideoData.objects.filter(id = video_data.id).exists()):
        response = youtube_client.fetch_comments_by_videoId(video_data.id)
        # responseがFalseでない
        if response:
            # コメント抽出
            comment_str = extract_comment(response)
            video_data.set_comment_str(comment_str)
    return video_data_list


"""
fetchしたコメントデータをコメントだけ抽出して一文の文字列にする
@param response
@return comment_str
"""
def extract_comment(response):
    comment_str = ""
    for item in response['items']:
        comment_str += item['snippet']['topLevelComment']['snippet']['textOriginal']
    return comment_str


"""
コメントを形態素解析して多い単語の順のリストをYoutubeVideoDataにset
@param video_data_list
@return video_data_list
"""
def morphological_analysis_comment(video_data_list: list[YoutubeVideoData]) -> list[YoutubeVideoData]:
    tagger = MeCab.Tagger('-r /usr/lib/mecab/')
    for video_data in video_data_list:
        try:
            # 形態素に分解
            parsed_txt = tagger.parse(video_data.comment_str)
        except:
            print("mecab parse error")
            continue
        elements = parsed_txt.split('\n')
        word_pos_list = extract_word_and_part_of_speech(elements)
        word_list = extract_word_list(word_pos_list)
        # [('急', 5), ('上昇', 5), ('一', 3)]
        word_counter = Counter(word_list)
        video_data.set_comment_word_count_list(word_counter.most_common())
    return video_data_list


"""
単語と品詞の辞書型のリストを生成する
@param elements
@return word_pos_list [{単語:動画, 品詞:名詞}]
"""
def extract_word_and_part_of_speech(elements):
    word_pos_list = []
    for element in elements:
        # element : '動画\tドーガ\tドウガ\t動画\t名詞-普通名詞-一般\t\t\t0'
        parts = element.split('\t')
        try:
            word = parts[0]
            if word == "EOS" or word == "":
                continue
            pos = parts[4].split('-')[0]
            # result : {単語:動画, 品詞:名詞}
            word_pos_list.append(dict(単語=word, 品詞=pos))
        except:
            print("to part of speech error", parts)
    return word_pos_list


"""
品詞が名詞・動詞・感動詞の単語リストを生成する
@param word_pos_list
@return word_list
"""
def extract_word_list(word_pos_list):
    word_list = []
    for word_pos in word_pos_list:
        if word_pos['品詞'] == '名詞' or word_pos['品詞'] == '動詞' or word_pos['品詞'] == '感動詞':
            word = word_pos['単語']
            # アンチword + 数値 を除外する
            if not(word in ANTI_WORD_LIST) and not(word.isdecimal()):
                word_list.append(word)
    return word_list


"""
DBにInsertする
@param video_data_list
"""
def insert_database(video_data_list: list[YoutubeVideoData]):
    now = localtime(timezone.now())
    now.strftime('%Y-%m-%d')
    for i, video_data in enumerate(video_data_list):
        try:
            # insert video table
            video, created = VideoData.objects.get_or_create(
                id = video_data.id,
                defaults={
                    'title' : video_data.title,
                    'channel_name' : video_data.channel_title,
                    'thumbnail_url' : video_data.thumbnail_url
                }
            )
            # insert daily_rank table
            DailyRankData.objects.create(
                date = now,
                rank = i+1,
                video = video
            )
            # insert comment table
            if created:
                for j, comment in enumerate(video_data.comment_word_count_list):
                    try:
                        if j == 100:
                            break
                        CommentData.objects.create(
                            word=comment[0],
                            count=comment[1],
                            video_id=video
                        )
                    except Exception as e:
                        print("Insert Comments {} Error".format(video_data.title))
                        print("type:" + str(type(e)))
                        print("message:" + str(e))
            print("Insert {} Success".format(video_data.title))
        except Exception as e:
            print("Insert {} Error".format(video_data.title))
            print("type:" + str(type(e)))
            print("message:" + str(e))