//import

export const AlgorithmStates = {

    BFS: {
        nodes: {
            current: "bfs-node-current",
            visited: "bfs-node-visited",
            neighbours: "bfs-node-neighbours",
            inQueue: "bfs-node-inQueue",
            unseen: "bfs-node-unseen",
            final: "bfs-node-final",

        },
        edges: {
            unactive: "bfs-edge",
            neighbours: "bfs-tree-edge",
            finalTree: "bfs-tree-edge-final",
            ignored: "bfs-ignored",
        }
    },

    DFS: {
        nodes: {
            current: "bfs-node-current",
            visited: "bfs-node-visited",
            neighbours: "bfs-node-neighbours",
            inStack: "bfs-node-inStack",
            unseen: "bfs-node-unseen",
            final: "bfs-node-final",
        },
        edges: {
            unactive: "bfs-edge",
            neighbours: "bfs-tree-edge",
            finalTree: "bfs-tree-edge-final",
            ignored: "bfs-ignored",
        }
    },

    MST: {
        nodes: {
            connected: "mst-node-visited",
            unseen: "mst-node-unseen",
            current_node: "mst-node-current"
        },
        edges: {
            unseen: "mst-initial-edge",
            current_edge: "mst-current-edge",
            mst_tree: "mst-edge",
            cycle_edge: "mst-unpicked-edge",
            prims_queue: "prims-queue",
            prims_cycle: "prims-cycle"
        }
    },

    DAG: {
        nodes: {
            current: "bfs-node-current",
            visited: "bfs-node-visited",
            neighbours: "bfs-node-neighbours",
            inStack: "bfs-node-inStack",
            unseen: "bfs-node-unseen",
            cycle: "bfs-node-current"
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
            final: "top-final",
            cycle: "bfs-node-current"
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
            "component-0": "scc-component-0",
            "component-1": "scc-component-1",
            "component-2": "scc-component-2",
            "component-3": "scc-component-3",
            "component-4": "scc-component-4",
        },
        edges: {
            unactive: "bfs-edge",
            neighbours: "bfs-tree-edge",
        }
    },

}