from apscheduler.schedulers.background import BackgroundScheduler
from .apiClient.YoutubeClient import YoutubeApiClient
from .classes.VideoDataClass import YoutubeVideoData
from .models import VideoData
from django.utils import timezone
from django.utils.timezone import localtime
import datetime

# main関数
def youtube_api_service():
    youtube_client = YoutubeApiClient()
    # 急上昇取得
    response = youtube_client.fetch_youtube_trend()
    video_data_list = to_video_data_list(response)
    insert_database(video_data_list)


# DBにinsert
def insert_database(video_data_list: list[YoutubeVideoData]):
    query_list = []
    now = localtime(timezone.now())
    now.strftime('%Y-%m-%d')
    for item in video_data_list:
        query = VideoData(
            id = item.id,
            title = item.title,
            description = item.description,
            created_at = now,
            channel_name = item.channel_title,
            thumbnail_url = item.thumbnail_url
        )
        query_list.append(query)
    try:
        VideoData.objects.bulk_create(query_list)
        print("================")
        print(" Insert Success")
        print("================")
    except:
        print("================")
        print(" Insert Error")
        print("================")


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
        # description
        description = snippet['description']
        # image_url
        thumbnail_url = snippet['thumbnails']['high']['url']
        # channel_title
        channel_title = snippet['channelTitle']
        # VideoDataClass生成
        video_data = YoutubeVideoData(id, title, description, thumbnail_url, channel_title)
        video_data_list.append(video_data)
    return video_data_list


# 定期実行
def start():
    scheduler = BackgroundScheduler()
    # scheduler.add_job(youtube_api_service, 'cron', minute=6)
    scheduler.start()