from django.contrib import admin
from .models import CommentData, VideoData


admin.site.register(VideoData)
admin.site.register(CommentData)