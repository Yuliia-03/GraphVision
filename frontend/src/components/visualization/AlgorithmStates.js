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
            neighbours: "bfs-tree-edge",
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
            unactive: "bfs-edge",
            neighbours: "bfs-tree-edge",
        }
    },

    MST: {
        nodes: {
            connected: "mst-node-visited",
            unseen: "mst-node-unseen"
        },
        edges: {
            unseen: "mst-initial-edge",
            current_edge: "mst-current-edge",
            mst_tree: "mst-edge",
            cycle_edge: "mst-unpicked-edge",
        }
    },

    DAG: {
        nodes: {
            current: "bfs-node-current",
            visited: "bfs-node-visited",
            neighbours: "bfs-node-neighbours",
            inStack: "bfs-node-inStack",
            unseen: "bfs-node-unseen",
        },
        edges: {
            unactive: "bfs-edge",
            neighbours: "bfs-tree-edge",
        }
    },
    TOP: {
        nodes: {
            current: "bfs-node-current",
            visited: "bfs-node-visited",
            neighbours: "bfs-node-neighbours",
            inStack: "bfs-node-inStack",
            unseen: "bfs-node-unseen",
        },
        edges: {
            unactive: "bfs-edge",
            neighbours: "bfs-tree-edge",
        }
    },
    SCC: {
        nodes: {
            current: "bfs-node-current",
            visited: "bfs-node-visited",
            neighbours: "bfs-node-neighbours",
            inStack: "bfs-node-inStack",
            unseen: "bfs-node-unseen",
        },
        edges: {
            unactive: "bfs-edge",
            neighbours: "bfs-tree-edge",
        }
    },

}