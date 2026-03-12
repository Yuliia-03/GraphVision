from api.models import Graph, Node, Edge
from django.db import transaction

"""
Creates a graph and its associated nodes and edges in the database.

The operation is wrapped in a database transaction to ensure atomicity.
If any step fails, all changes are rolled back to maintain consistency.
"""
def create_graph(user, name, description, nodes, edges):

    with transaction.atomic():

        graph = Graph.objects.create(
            owner=user,
            name=name,
            description=description
        )

        node_map = {}

        for node in nodes:

            n = Node.objects.create(
                graph=graph,
                node_id=node["id"],
                label=node.get("label", ""),
                x=node["x"],
                y=node["y"]
            )

            node_map[node["id"]] = n

        for edge in edges:

            Edge.objects.create(
                graph=graph,
                edge_id=edge["id"],
                source=node_map[edge["source"]],
                target=node_map[edge["target"]],
                weight=edge.get("weight")
            )

    return graph