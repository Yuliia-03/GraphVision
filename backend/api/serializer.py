from rest_framework import serializers
from api.models import Graph, Node, Edge


class NodeSerializer(serializers.ModelSerializer):
    """
    Serializer for Node objects.

    Transforms Node model instances into a JSON representation
    used by the frontend graph editor.
    """

    id = serializers.CharField(source="node_id")

    class Meta:
        model = Node
        fields = ["id", "label", "x", "y"]

class EdgeSerializer(serializers.ModelSerializer):
    """
    Serializer for Edge objects.

    Converts edge relationships between nodes into a format
    compatible with the client-side graph structure.
    """

    id = serializers.CharField(source="edge_id")
    source = serializers.CharField(source="source.node_id")
    target = serializers.CharField(source="target.node_id")

    class Meta:
        model = Edge
        fields = ["id", "source", "target", "weight"]

class GraphSerializer(serializers.ModelSerializer):
    """
    Serializer for Graph objects including their associated
    nodes and edges.

    Nested serializers are used to return the complete graph
    structure in a single API response.
    """
    
    nodes = NodeSerializer(many=True, read_only=True)
    edges = EdgeSerializer(many=True, read_only=True)

    class Meta:
        model = Graph
        fields = ["id", "name", "description", "nodes", "edges", "directed", "weighted"]
        read_only_fields = ["owner"]