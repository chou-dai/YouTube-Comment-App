from django.urls import path
from .views import VideoDataAPIView


urlpatterns = [
    path('video/<str:date>/', VideoDataAPIView.as_view())
]