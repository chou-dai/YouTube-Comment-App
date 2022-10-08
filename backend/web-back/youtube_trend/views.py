from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework import generics
from .models import Youtube_Trend
from .serializers import YoutubeTrendSerializer


class ListYoutubeTrend(generics.ListAPIView):
    queryset = Youtube_Trend.objects.all()
    serializer_class = YoutubeTrendSerializer


class DetailYoutubeTrend(generics.RetrieveAPIView):
    queryset = Youtube_Trend.objects.all()
    serializer_class = YoutubeTrendSerializer