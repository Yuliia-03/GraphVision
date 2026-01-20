from django.db import models
from .user import User

class Graph(models.Model):
    
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=100)

class Node(models.Model):
    graph = models.ForeignKey(Graph, related_name="nodes", on_delete=models.CASCADE)
    node_id = models.CharField(max_length=50)   # frontend ID
    x = models.FloatField()
    y = models.FloatField()
    label = models.CharField(max_length=50, blank=True)

class Edge(models.Model):
    graph = models.ForeignKey(Graph, related_name="edges", on_delete=models.CASCADE)
    source = models.CharField(max_length=50)
    target = models.CharField(max_length=50)
    weight = models.FloatField(null=True, blank=True)