from rest_framework import serializers
from .models import CommentData, DailyRankData, VideoData


class CommentDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentData
        fields = ('video_id', 'comment')


class VideoDataSerializer(serializers.ModelSerializer):
    comments = CommentDataSerializer(many=True)
    class Meta:
        model = VideoData
        fields = ('id', 'rank', 'description', 'created_at', 'channel_name', 'title', 'thumbnail_url', 'comments')


class DailyRankDataSerializer(serializers.ModelSerializer):
    video = VideoDataSerializer()
    class Meta:
        model = DailyRankData
        fields = ('date', 'rank', 'created_at', 'video')