from rest_framework import serializers
from .models import CommentData, VideoData


class CommentDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentData
        fields = ('video_id', 'comment')


class VideoDataSerializer(serializers.ModelSerializer):
    comments = CommentDataSerializer(many=True)
    class Meta:
        model = VideoData
        fields = ('id', 'description', 'created_at', 'channel_name', 'title', 'thumbnail_url', 'comments')