from rest_framework import serializers
from .models import Graph, Node, Edge


class NodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Node
        fields = ["node_id", "label", "x", "y"]


class EdgeSerializer(serializers.ModelSerializer):
    source = serializers.CharField(source="source.node_id")
    target = serializers.CharField(source="target.node_id")

    class Meta:
        model = Edge
        fields = ["edge_id", "source", "target", "weight"]


class GraphCreateSerializer(serializers.ModelSerializer):
    nodes = NodeSerializer(many=True)
    edges = EdgeSerializer(many=True)

    class Meta:
        model = Graph
        fields = ["id", "name", "nodes", "edges"]