from email.policy import default
from django.db import models

# 動画データ
class VideoData(models.Model):
    id = models.CharField(primary_key=True, max_length=50, unique=True)
    title = models.TextField(max_length=100)
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
    video = models.ForeignKey(VideoData, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["date", "rank"],
                name="date_rank_unique"
            ),
        ]
        db_table = 'daily_rank'

    def __str__(self):
        return str(self.date)
 

# コメントの単語と数のデータ
class CommentData(models.Model):
    video_id = models.ForeignKey(VideoData, related_name="comments", on_delete=models.CASCADE)
    word = models.CharField(max_length=200, null=True)
    count = models.IntegerField(default=0)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["video_id", "word"],
                name="video_word_unique"
            ),
        ]
        db_table = 'comment'

    def __str__(self):
        return self.word