from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import DailyRankData
from .serializers import DailyRankDataSerializer

class VideoDataAPIView(APIView):
    def get(self, *args, **kwargs):
        date = kwargs.get('date')
        try:
            queryset = DailyRankData.objects.select_related("video").filter(date=date).order_by("rank")
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        serializer_class = DailyRankDataSerializer(queryset, many=True)
        return Response(data=serializer_class.data, status=status.HTTP_200_OK)