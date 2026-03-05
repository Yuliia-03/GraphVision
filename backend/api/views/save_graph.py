from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from api.models import Graph
from rest_framework.response import Response
from api.serializer import GraphCreateSerializer
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny

class SampleGraphs(ListAPIView):
    serializer_class = GraphCreateSerializer
    permission_classes = [AllowAny]

    queryset = Graph.objects.filter(owner__isnull=True)
    
class SaveGraph(APIView):
    
    queryset = Graph.objects.all()
    serializer_class = GraphCreateSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request):
        graphs = Graph.objects.filter(owner=request.user)
        serializer = GraphCreateSerializer(graphs, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = GraphCreateSerializer(
            data=request.data,
            context={'request': request}
        )

        if serializer.is_valid():
            graph = serializer.save()
            return Response(
                GraphCreateSerializer(graph).data,
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)