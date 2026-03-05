from rest_framework import serializers
from api.models import Graph, Node, Edge


class NodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Node
        fields = ['node_id','x', 'y', 'label']


class EdgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Edge
        fields = ['id', 'source', 'target', 'weight']


class GraphCreateSerializer(serializers.ModelSerializer):
    
    nodes = NodeSerializer(many=True)
    edges = EdgeSerializer(many=True)

    class Meta:
        model = Graph
        fields = ['id', 'name', 'description', 'nodes', 'edges']

    def create(self, validated_data):

        nodes_data = validated_data.pop('nodes')
        edges_data = validated_data.pop('edges')

        user = self.context['request'].user

        graph = Graph.objects.create(
            owner=user,
            is_sample=False,
            **validated_data
        )

        node_mapping = {}

        for node_data in nodes_data:
            node = Node.objects.create(graph=graph, **node_data)
            node_mapping[node.node_id] = node

        # Then create edges
        for edge_data in edges_data:
            Edge.objects.create(
                graph=graph,
                source=node_mapping[edge_data['source']],
                target=node_mapping[edge_data['target']],
                weight=edge_data.get('weight', 1)
            )

        return graph