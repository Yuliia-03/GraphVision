from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response

class GraphData(APIView):
    def get(self, request):
        data = {"nodes": [1,2,3], "edges": [(1,2),(2,3)]}
        return Response(data)
