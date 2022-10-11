from django.urls import path
from .views import VideoDataAPIView


urlpatterns = [
    path('video/<str:created_at>/', VideoDataAPIView.as_view())
]