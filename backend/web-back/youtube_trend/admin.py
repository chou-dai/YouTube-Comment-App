from django.contrib import admin
from .models import CommentData, DailyRankData, VideoData


admin.site.register(VideoData)
admin.site.register(CommentData)
admin.site.register(DailyRankData)