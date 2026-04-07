from django.db import models
from .user import User

class Graph(models.Model):
    
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=100, default="")
    is_sample = models.BooleanField(default=False)
    directed = models.BooleanField(default=True)
    weighted = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} (id={self.id})"

class Node(models.Model):
    node_id = models.CharField(max_length=50)
    graph = models.ForeignKey(Graph, related_name="nodes", on_delete=models.CASCADE)
    x = models.FloatField()
    y = models.FloatField()
    label = models.CharField(max_length=50, blank=True)

    class Meta:
        unique_together = ("node_id", "graph")

    def __str__(self):
        return f"{self.name} (id={self.id})"

class Edge(models.Model):
    edge_id = models.CharField(max_length=50)
    graph = models.ForeignKey(Graph, related_name="edges", on_delete=models.CASCADE)
    source = models.ForeignKey(Node,related_name="out_edges", on_delete=models.CASCADE)
    target = models.ForeignKey(Node,related_name="in_edges", on_delete=models.CASCADE)
    weight = models.FloatField(null=True, blank=True)
    
    class Meta:
        unique_together = ("edge_id", "graph")

    def __str__(self):
        return f"{self.source.node_id} -> {self.target.node_id}"