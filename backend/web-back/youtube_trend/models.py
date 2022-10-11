from enum import unique
from django.db import models

class VideoData(models.Model):
    id = models.CharField(primary_key=True, max_length=50, unique=True)
    title = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateField()
    channel_name = models.CharField(max_length=100)
    thumbnail_url = models.URLField()

    class Meta:
        db_table = 'video'

    def __str__(self):
        return self.title


class CommentData(models.Model):
    video_id = models.ForeignKey(VideoData, related_name="comments", on_delete=models.CASCADE)
    comment = models.TextField()

    class Meta:
        db_table = 'comment'

    def __str__(self):
        return self.comment