from django.urls import path, include
from .views import ListYoutubeTrend, DetailYoutubeTrend

urlpatterns = [
    path('<int:pk>/', DetailYoutubeTrend.as_view()),
    path('', ListYoutubeTrend.as_view())
]