//import

export const AlgorithmStates = {

    BFS: {
        nodes: {
            current: "bfs-node-current",
            visited: "bfs-node-visited",
            neighbours: "bfs-node-neighbours",
            inQueue: "bfs-node-inQueue",
            unseen: "bfs-node-unseen",
        },
        edges: {
            unactive: "bfs-edge",
            neighbours: "bfs-tree_edge",
        }
    },

    DFS: {
        nodes: {
            current: "bfs-node-current",
            visited: "bfs-node-visited",
            neighbours: "bfs-node-neighbours",
            inStack: "bfs-node-inStack",
            unseen: "bfs-node-unseen",
        },
        edges: {
            edge: "bfs-edge",
            tree_edge: "bfs-tree_edge",
        }
    },
}