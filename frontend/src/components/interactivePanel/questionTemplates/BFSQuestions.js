export const questionTemplates = [
    {
        "id": 1,
        "type": "queue_after_processing",
        "text": "After processing node {node}, what will the queue look like next?\n\n(front → back)",
        "hint": "When BFS processes {node}, it removes it from the front of the queue, then adds all unvisited neighbors of {node} to the back of the queue."
    },
    {
        "id": 2,
        "type": "discover_nodes",
        "text": "When processing node {node}, which neighbors will be discovered and added to the queue?",
        "hint": "Only neighbors of {node} that have NOT been visited yet will be discovered and added to the queue."
    },
    {
        "id": 3,
        "type": "next_action",
        "text": "We've explored node {node}. Current queue: {queue}. What will BFS do next?",
        "hint": "BFS always processes the node at the front of the queue next. Look at the current queue: {queue}."
    },
    {
        "id": 4,
        "type": "edges_leading_new",
        "text": "When inspecting node {node}, which edges lead to nodes that will be discovered next? \n\nCurrent queue: {queue}",
        "hint": "Check each edge from {node}. Only edges that lead to unvisited nodes will result in new discoveries."
    },
    {
        "id": 5,
        "type": "visited_set",
        "text": "After processing node {node}, which nodes have been visited so far?",
        "hint": "A node is added to the visited set as soon as it is discovered (when it is added to the queue), not when it is processed. Current queue: {queue}"
    },
    ]