from email.policy import default
from django.db import models

# 動画データ
class VideoData(models.Model):
    id = models.CharField(primary_key=True, max_length=50, unique=True)
    title = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    channel_name = models.CharField(max_length=100)
    thumbnail_url = models.URLField()

    class Meta:
        db_table = 'video'

    def __str__(self):
        return self.title


# 日付とランキングデータ
class DailyRankData(models.Model):
    date = models.DateField()
    created_at = models.DateTimeField(auto_now=True)
    rank = models.IntegerField(default=0)
    video_id = models.ForeignKey(VideoData, related_name="video", on_delete=models.CASCADE)

    class Meta:
        db_table = 'daily_rank'

    def __str__(self):
        return self.date

 
# コメントデータ
class CommentData(models.Model):
    video_id = models.ForeignKey(VideoData, related_name="comments", on_delete=models.CASCADE)
    comment = models.TextField()

    class Meta:
        db_table = 'comment'

    def __str__(self):
        return self.comment