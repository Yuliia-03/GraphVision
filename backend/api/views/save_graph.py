from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from api.models import Graph
from rest_framework.response import Response
from api.serializer import GraphSerializer
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny
from api.services.graph_service import create_graph, create_graph_structure
from django.db import transaction

class SampleGraphs(APIView):
    """
    API endpoint for retrieving publicly available sample graphs.

    This endpoint does not require authentication and returns
    graphs that are marked as sample data within the system.
    """
    permission_classes = [AllowAny]

    def get(self, request):
        """Return all graphs flagged as sample graphs."""
        graphs = Graph.objects.filter(is_sample=True)
        serializer = GraphSerializer(graphs, many=True)
        return Response(serializer.data)


class SaveGraph(APIView):
    """
    API endpoint for authenticated users to store and retrieve
    their personal graphs.

    - POST: Saves a new graph including its nodes and edges.
    - GET: Returns all graphs owned by the authenticated user.
    """
    
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        """Create and persist a new graph for the current user."""

        name = request.data.get("name")
        description = request.data.get("description", "")
        nodes = request.data.get("nodes", "")
        edges = request.data.get("edges", "")
        directed = request.data.get("directed", "")
        weighted = request.data.get("weighted", "")

        
        graph = create_graph(
            request.user,
            name,
            description,
            nodes,
            edges,
            directed,
            weighted
        )

        return Response({"message": "Graph saved"}, status=status.HTTP_201_CREATED)
        

    def get(self, request):
        """Retrieve all graphs belonging to the authenticated user."""
        print(request.user.id)
        graphs = Graph.objects.filter(owner = request.user)
        print(graphs)
        serializer = GraphSerializer(graphs, many=True)
        return Response(serializer.data)


class GraphDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, graph_id):
        try:
            graph = Graph.objects.get(id=graph_id, owner=request.user)
        except Graph.DoesNotExist:
            return Response({"error": "Graph not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = GraphSerializer(graph)
        return Response(serializer.data)

class GraphDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, user, graph_id):
        try:
            return Graph.objects.get(id=graph_id, owner=user)
        except Graph.DoesNotExist:
            return None

    def get(self, request, graph_id):
        graph = self.get_object(request.user, graph_id)
        print(graph.directed)
        if not graph:
            return Response({"error": "Graph not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = GraphSerializer(graph)
        return Response(serializer.data)

    def put(self, request, graph_id):
        graph = self.get_object(request.user, graph_id)
        if not graph:
            return Response({"error": "Graph not found"}, status=404)

        name = request.data.get("name")
        description = request.data.get("description", "")
        nodes = request.data.get("nodes", [])
        edges = request.data.get("edges", [])
        directed = request.data.get("directed", "")
        weighted = request.data.get("weighted", "")

        with transaction.atomic():
            graph.name = name
            graph.description = description
            graph.weighted = weighted
            graph.directed = directed

            graph.save()

            graph.nodes.all().delete()
            graph.edges.all().delete()

            create_graph_structure(graph, nodes, edges)

        graph.refresh_from_db()

        serializer = GraphSerializer(graph)
        return Response(serializer.data)

    def delete(self, request, graph_id):
        """Delete a graph"""
        graph = self.get_object(request.user, graph_id)
        if not graph:
            return Response({"error": "Graph not found"}, status=status.HTTP_404_NOT_FOUND)

        graph.delete()
        return Response({"message": "Graph deleted"}, status=status.HTTP_204_NO_CONTENT)