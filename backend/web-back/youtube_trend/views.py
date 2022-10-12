from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import VideoData
from .serializers import VideoDataSerializer

class VideoDataAPIView(APIView):
    def get(self, *args, **kwargs):
        created_at = kwargs.get('created_at')
        try:
            queryset = VideoData.objects.filter(created_at=created_at)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        serializer_class = VideoDataSerializer(queryset, many=True)
        return Response(data=serializer_class.data, status=status.HTTP_200_OK)