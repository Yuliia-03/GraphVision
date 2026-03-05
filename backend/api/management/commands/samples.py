from django.core.management.base import BaseCommand
from api.models import Graph, Node, Edge
from django.contrib.auth.models import User


Samples = {

    "DFS": {
        "nodes": [
            { "id": "1", "label": "1", "x": 100, "y": 200 },
            { "id": "2", "label": "2", "x": 200, "y": 100 },
            { "id": "3", "label": "3", "x": 200, "y": 300 },
            { "id": "4", "label": "4", "x": 300, "y": 200 },
            { "id": "5", "label": "5", "x": 400, "y": 100 },
            { "id": "6", "label": "6", "x": 400, "y": 300 },
        ],
        "edges": [
            { "id": "1-2", "source": "1", "target": "2", "weight": 1 },
            { "id": "1-3", "source": "1", "target": "3", "weight": 1 },
            { "id": "2-4", "source": "2", "target": "4", "weight": 1 },
            { "id": "4-3", "source": "4", "target": "3", "weight": 1 },
            { "id": "2-5", "source": "2", "target": "5", "weight": 1 },
            { "id": "3-6", "source": "3", "target": "6", "weight": 1 },
            { "id": "4-6", "source": "4", "target": "6", "weight": 1 },
            { "id": "6-5", "source": "6", "target": "5", "weight": 1 },
        ],

    },

    "MST": {
        "nodes": [
            { "id": "1", "label": "1", "x": 40,  "y": 200 },
            { "id": "2", "label": "2", "x": 120, "y": 100 },
            { "id": "3", "label": "3", "x": 120, "y": 300 },
            { "id": "4", "label": "4", "x": 200, "y": 200 },
            { "id": "5", "label": "5", "x": 310, "y": 200 },
            { "id": "6", "label": "6", "x": 390, "y": 100 },
            { "id": "7", "label": "7", "x": 390, "y": 300 },
            { "id": "8", "label": "8", "x": 470, "y": 200 },
        ],
        "edges": [
            { "id": "1-2", "source": "1", "target": "2", "weight": 4 },
            { "id": "1-3", "source": "1", "target": "3", "weight": 3 },
            { "id": "2-4", "source": "2", "target": "4", "weight": 2 },
            { "id": "4-3", "source": "4", "target": "3", "weight": 4 },
            { "id": "1-4", "source": "1", "target": "4", "weight": 5 },
            
            { "id": "4-5", "source": "4", "target": "5", "weight": 1 },

            { "id": "2-6", "source": "2", "target": "6", "weight": 6 },
            { "id": "3-7", "source": "3", "target": "7", "weight": 8 },
            { "id": "5-7", "source": "5", "target": "7", "weight": 2 },
            { "id": "6-8", "source": "6", "target": "8", "weight": 3 },
            { "id": "7-8", "source": "7", "target": "8", "weight": 6 },
            { "id": "5-8", "source": "5", "target": "8", "weight": 2 },
        ],
    },

    "DAG": {
        "nodes": [
            { "id": "1", "label": "1", "x": 50, "y": 200 },
            { "id": "2", "label": "2", "x": 150, "y": 100 },
            { "id": "3", "label": "3", "x": 150, "y": 300 },
            { "id": "4", "label": "4", "x": 250, "y": 200 },
            { "id": "5", "label": "5", "x": 350, "y": 100 },
            { "id": "6", "label": "6", "x": 350, "y": 300 },
            { "id": "7", "label": "7", "x": 450, "y": 200 },
        ],
        "edges": [
            { "id": "1-2", "source": "1", "target": "2", "weight": 1 },
            { "id": "1-3", "source": "1", "target": "3", "weight": 1 },
            { "id": "2-4", "source": "2", "target": "4", "weight": 1 },
            { "id": "4-5", "source": "4", "target": "5", "weight": 1 },
            
            { "id": "5-2", "source": "5", "target": "2", "weight": 1 },
            { "id": "3-6", "source": "3", "target": "6", "weight": 1 },
            { "id": "4-6", "source": "4", "target": "6", "weight": 1 },
            { "id": "6-7", "source": "6", "target": "7", "weight": 1 },
            { "id": "5-7", "source": "5", "target": "7", "weight": 1 },
        ],

    },
    
    "Topological_sort": {
        "nodes": [
            {"id": "1", "label": "1", "x":  50, "y": 200 },
            {"id": "2", "label": "2", "x": 150, "y": 100 },
            {"id": "3", "label": "3", "x": 150, "y": 300 },
            {"id": "4", "label": "4", "x": 250, "y": 200 },
            {"id": "5", "label": "5", "x": 350, "y": 100 },
            {"id": "6", "label": "6", "x": 350, "y": 300 },
            {"id": "7", "label": "7", "x": 450, "y": 200 },
        ],
        "edges": [
            {"id": "1-2", "source": "1", "target": "2", "weight": 1 },
            {"id": "1-3", "source": "1", "target": "3", "weight": 1 },
            {"id": "2-4", "source": "2", "target": "4", "weight": 1 },
            {"id": "4-5", "source": "4", "target": "5", "weight": 1 },
            
            {"id": "2-5", "source": "2", "target": "5", "weight": 1 },
            {"id": "3-6", "source": "3", "target": "6", "weight": 1 },
            {"id": "4-6", "source": "4", "target": "6", "weight": 1 },
            {"id": "6-7", "source": "6", "target": "7", "weight": 1 },
            {"id": "5-7", "source": "5", "target": "7", "weight": 1 },
        ],

    },

    "SCC": {
        "nodes": [
            {"id": "1", "label": "1", "x": 40, "y": 50 },
            {"id": "2", "label": "2", "x": 150, "y": 100 },
            {"id": "3", "label": "3", "x": 40, "y": 200 },
            {"id": "4", "label": "4", "x": 150, "y": 280 },
            {"id": "5", "label": "5", "x": 360, "y": 100 },
            {"id": "6", "label": "6", "x": 470, "y": 100 },
            {"id": "7", "label": "7", "x": 360, "y": 200 },
            {"id": "8", "label": "8", "x": 470, "y": 200 },
            {"id": "9", "label": "9", "x": 300, "y": 280 },
            {"id": "10", "label": "10", "x": 470, "y": 370 },
            {"id": "11", "label": "11", "x": 40, "y": 370 },
        ],
        "edges": [
            { "id": "2-3", "source": "2", "target": "3", "weight": 4 },
            { "id": "3-4", "source": "3", "target": "4", "weight": 3 },
            { "id": "4-2", "source": "4", "target": "2", "weight": 2 },

            { "id": "4-9", "source": "4", "target": "9", "weight": 4 },
            { "id": "9-4", "source": "9", "target": "4", "weight": 5 },
            
            { "id": "5-4", "source": "5", "target": "4", "weight": 1 },
            { "id": "5-2", "source": "5", "target": "2", "weight": 1 },

            { "id": "5-6", "source": "5", "target": "6", "weight": 6 },
            { "id": "6-5", "source": "6", "target": "5", "weight": 8 },
            { "id": "7-5", "source": "7", "target": "5", "weight": 2 },
            { "id": "8-6", "source": "8", "target": "6", "weight": 3 },

            { "id": "7-8", "source": "7", "target": "8", "weight": 6 },

            { "id": "10-7", "source": "10","target": "7","weight": 2},
            { "id": "8-10", "source": "8", "target": "10","weight": 2},

            { "id": "10-9", "source": "10","target": "9","weight": 2},
            { "id": "10-11", "source": "10","target": "11", "weight": 2},
            { "id": "11-3", "source": "11","target": "3","weight": 2},
        ],
    },

    


}