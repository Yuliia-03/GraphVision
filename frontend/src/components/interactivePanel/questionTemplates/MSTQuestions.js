export const mstQuestionTemplatesPrims = [

    {
        id: 1,
        type: "queue_after_expansion",
        text: "At this step connected nodes are {connectedNodes}. After connecting {node} to the MST at next step, what edges will be in the priority queue?",
        hint: "When a node is added to the MST, all edges from that node to unvisited nodes are added to the queue. Ignore edges leading to already connected nodes."
    },

    {
        id: 2,
        type: "new_edges_added",
        text: "At this step connected nodes are {connectedNodes}. After including node {node}, which NEW edges are added to the queue?",
        hint: "Only edges from {node} to nodes NOT already in the MST are added."
    },

    {
        id: 3,
        type: "next_edge_selection",
        text: "Current queue: {queue}. Which edge will Prim's algorithm select next?",
        hint: "Prim’s always selects the edge with the smallest weight that connects the MST to a new node."
    },

    {
        id: 4,
        type: "mst_nodes",
        text: "After adding edge {edge}, which nodes are now included in the MST?",
        hint: "When an edge is added, both of its endpoints become part of the MST if not already included."
    },

    {
        id: 5,
        type: "mst_nodes",
        text: "After adding edge {edge}, which edges are now included in the MST?",
        hint: "When an edge is added, both of its endpoints become part of the MST if not already included."
    },

    {
        id: 6,
        type: "total_weight",
        text: "After adding edge {edge}, what is the total weight of the MST so far?",
        hint: "Add the weight of the newly selected edge to the previous total weight."
    },

    {
        id: 7,
        type: "cycle_detection",
        text: "If edge {edge} connects two nodes already in the MST, what will Prim’s algorithm do?",
        hint: "Prim’s skips edges that would create a cycle."
    },

    {
        id: 8,
        type: "cut_property",
        text: "Why is edge {edge} chosen at this step?",
        hint: "Prim’s algorithm always selects the minimum-weight edge crossing the cut between visited and unvisited nodes."
    },

    {
        id: 9,
        type: "structure_change",
        text: "If edge {edge} had a smaller weight, how might it affect the MST?",
        hint: "Prim’s always prefers smaller edges. A lighter edge could be chosen earlier and change the MST structure."
    },
];

export const mstQuestionTemplatesKruskal = [
    {
        id: 11,
        type: "next_edge_selection",
        text: "Current edges sorted by weight: \n{queue} \nWhich edge will Kruskal's algorithm consider next?",
        hint: "Kruskal always picks the smallest-weight edge not yet processed."
    },
    {
        id: 12,
        type: "cycle_detection",
        text: "If edge {edge} connects two nodes already in the MST, what should Kruskal's algorithm do?",
        hint: "Edges that would create a cycle are skipped in Kruskal’s algorithm."
    },
    {
        id: 13,
        type: "mst_edge_added",
        text: "After including edge {edge}, which nodes are now connected in the MST?",
        hint: "Both endpoints of an added edge are now part of the MST if they weren’t already connected."
    },
    {
        id: 14,
        type: "total_weight",
        text: "After adding edge {edge}, what is the total weight of the MST so far?",
        hint: "Add the weight of this edge to the current MST weight."
    },
    {
        id: 15,
        type: "edge_skipped",
        text: "Why is edge {edge} skipped in this step?",
        hint: "It would create a cycle because its endpoints are already connected."
    },
    {
        id: 16,
        type: "mst_completion",
        text: "The MST is complete. How many edges should the MST contain for a graph with {n} nodes?",
        hint: "A valid MST contains exactly n-1 edges and connects all nodes."
    }
];