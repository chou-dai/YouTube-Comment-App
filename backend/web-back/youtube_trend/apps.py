from django.apps import AppConfig

class YoutubeTrendConfig(AppConfig):
    name = 'youtube_trend'

    def ready(self):
        from .youtube_service import start
        start()