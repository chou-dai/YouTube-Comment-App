from django.apps import AppConfig

class YoutubeTrendConfig(AppConfig):
    name = 'youtube_trend'

    def ready(self):
        from .scheduler import start
        start()