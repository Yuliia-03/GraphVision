from django.core.management.base import BaseCommand
from api.models import Graph, Node, Edge
from django.contrib.auth.models import User
from .samples import Samples

class Command(BaseCommand):
    help = "Create sample graphs"

    def handle(self, *args, **kwargs):


        for name, graph_data in Samples.items():

            graph = Graph.objects.create(
                name=name,
                description="Sample graph",
                owner=None,
                is_sample=True
            )

            node_map = {}

            for node in graph_data["nodes"]:
                n = Node.objects.create(
                    graph=graph,
                    node_id=node["id"],
                    label=node["label"],
                    x=node["x"],
                    y=node["y"],
                )

                node_map[node["id"]] = n

            for edge in graph_data["edges"]:
                Edge.objects.create(
                    graph=graph,
                    edge_id = edge["id"],
                    source=node_map[edge["source"]],
                    target=node_map[edge["target"]],
                    weight=edge.get("weight", 1),
                )

        self.stdout.write(self.style.SUCCESS("Sample graphs created"))