from apscheduler.schedulers.background import BackgroundScheduler
from .apiClient.YoutubeClient import YoutubeApiClient
from .classes.VideoDataClass import YoutubeVideoData
from .models import DailyRankData, VideoData
from django.utils import timezone
from django.utils.timezone import localtime
import MeCab


"""
==== 処理の流れ ====
1. youtubeAPI fetch
2. response List[YoutubeVideoData] cast
3. insert database
==================
"""

# main関数
def youtube_api_service():
    youtube_client = YoutubeApiClient()
    # 急上昇取得
    response = youtube_client.fetch_youtube_trend()
    # YoutubeVideoDataのListに変換
    video_data_list = to_video_data_list(response)
    insert_database(video_data_list)


# データベースにinsert
def insert_database(video_data_list: list[YoutubeVideoData]):
    now = localtime(timezone.now())
    now.strftime('%Y-%m-%d')
    for i, item in enumerate(video_data_list):
        try:
            # insert video table
            video, created = VideoData.objects.get_or_create(
                id = item.id,
                defaults={
                    'title' : item.title,
                    'channel_name' : item.channel_title,
                    'thumbnail_url' : item.thumbnail_url
                }
            )
            # insert daily_rank table
            DailyRankData.objects.create(
                date = now,
                rank = i+1,
                video = video
            )
            print("Insert {} Success".format(item.title))
        except Exception as e:
            print("Insert {} Error".format(item.title))
            print("type:" + str(type(e)))
            print("message:" + str(e))


# VideoDataクラスのリストにキャスト
def to_video_data_list(response) -> list[YoutubeVideoData]:
    video_data_list = []
    # VideoDataにキャストしてvideo_data_listに追加
    for item in response['items']:
        snippet = item['snippet']
        # videoId
        id = item['id']
        # title
        title = snippet['title']
        # tagger = MeCab.Tagger('-r /usr/lib/mecab/')
        # try:
        #     parsed_txt = tagger.parse(title)
        #     print(parsed_txt)
        # except:
        #     print("error")
        # image_url
        thumbnail_url = snippet['thumbnails']['high']['url']
        # channel_title
        channel_title = snippet['channelTitle']
        # VideoDataClass生成
        video_data = YoutubeVideoData(id, title, thumbnail_url, channel_title)
        video_data_list.append(video_data)
    return video_data_list


# 定期実行
def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(youtube_api_service, 'cron', hour=0, minute=0)
    scheduler.start()