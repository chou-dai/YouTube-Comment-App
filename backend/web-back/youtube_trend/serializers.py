from rest_framework import serializers
from .models import Youtube_Trend


class YoutubeTrendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Youtube_Trend
        fields = ('id', 'title', 'body')