export const questionTemplates = [
    {
        "id": 1,
        "type": "queue_after_processing",
        "text": "After processing node {node}, what will the queue contain?",
        "hint": "When BFS processes {node}, it removes it from the front of the queue, then adds all unvisited neighbors of {node} to the back of the queue."
    },
    {
        "id": 2,
        "type": "discover_nodes",
        "text": "After BFS processes node {node}, which NEW nodes will be discovered?",
        "hint": "Only neighbors of {node} that have NOT been visited yet will be discovered and added to the queue."
    },
    {
        "id": 3,
        "type": "next_action",
        "text": "We've explored {node}. Current queue: {queue}. What will BFS do next?",
        "hint": "BFS always processes the node at the front of the queue next. Look at the current queue: {queue}."
    },
    {
        "id": 4,
        "type": "edges_leading_new",
        "text": "When inspecting node {node}, which edges will lead to new nodes?",
        "hint": "Check each edge from {node}. Only edges that lead to unvisited nodes will result in new discoveries."
    },
    {
        "id": 5,
        "type": "visited_set",
        "text": "After BFS processes node {node}, which nodes are in the visited set?",
        "hint": "A node is added to the visited set as soon as it is discovered (when it is added to the queue), not when it is processed."
    },
    {
        "id": 6,
        "type": "valid_traversal",
        "text": "Which of the following are valid BFS traversals?",
        "hint": "In BFS, nodes are visited level by level. All neighbors of a node are explored before moving deeper."
    },
    {
        "id": 7,
        "type": "structural_change",
        "text": "If node {node} had an additional edge to node {extra}, would node {extra} be discovered earlier?",
        "hint": "BFS discovers nodes based on their distance from the start. Would adding an edge from {node} create a shorter path to {extra}?"
    }
    ]