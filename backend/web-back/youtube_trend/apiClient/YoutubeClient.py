from apiclient import discovery
from .settings import YOUTUBE_API_KEY

class YoutubeApiClient():
    youtube = discovery.build("youtube", "v3", developerKey=YOUTUBE_API_KEY)

    # 急上昇動画取得
    def fetch_youtube_trend(self):
        try:
            response = self.youtube.videos().list(
                part='snippet',
                chart="mostPopular",
                regionCode="jp",
                maxResults=80
            ).execute()
        except:
            response = False
        return response

    # 動画のコメントを取得
    def fetch_comments_by_videoId(self, videoId):
        try:
            response = self.youtube.commentThreads().list(
                part='snippet',
                videoId=videoId,
                maxResults=100
            ).execute()
        except:
            # コメントがオフになっている
            response = False
        return response