import {buildAdjacencyList} from "./adjacencyList"
import BaseAlgorithm from "./BaseAlgorithm";


export default class BFSAlgorithm extends BaseAlgorithm{
    
    constructor(nodes, edges, graphConfig) {
        super(nodes, edges, graphConfig)

        this.queue = [];
        this.visited = new Set();
        this.directed = this.graphConfig.directed;

        this.current_edges = []
        this.current_neighbours = []

        this.bfs = ""

    }

    _runBFS(source, {
        onInit = () => {},
        onPop = () => {},
        onInspect = () => {},
        onDiscover = () => {},
        onEdges = () => {},
        onReturn = () => {}
    } = {}) {
        const graph = buildAdjacencyList(this.nodes, this.edges, this.directed);

        this.queue = [];
        this.visited = new Set();

        this.queue.push(source);
        this.visited.add(source);

        onInit({ source });

        while (this.queue.length > 0) {
            const current = this.queue.shift();

            if (this.bfs.length == 0) {
                this.bfs += current
            }
            else {
                this.bfs += " -> "
                this.bfs += current
            }

            onPop({ current });

            this.visited.add(current);

            const neighbours = graph[current] || [];
            const neighborIds = neighbours.map(e => e.to);

            onInspect({ current, neighbours, neighborIds });

            for (const { to } of neighbours) {
                const newEdge = `${current}-${to}`
                this.current_edges.push(newEdge);
                this.current_neighbours.push(to)
                onEdges({current, newEdge});

                if (!this.visited.has(to)) {
                    this.queue.push(to);
                    this.visited.add(to);

                    onDiscover({current, to });
                }
            }
            this.current_neighbours = []
            this.current_edges = []
        }

        onReturn()
    }

    bfsTraversal(source) {
        this.steps = [];

        this._runBFS(source, {
            onInit: ({ source }) => {
                this.addStep(`Initialize queue with ${source}`, {
                    current: undefined,
                    inQueue: [...this.queue],
                });
            },

            onPop: ({ current }) => {
                this.addStep(`Pop ${current} from queue`, {
                    current,
                    visited: [...this.visited],
                    inQueue: [...this.queue],
                    neighbours: [],
                });
            },

            onInspect: ({ current, neighborIds }) => {
                this.addStep(`Inspect neighbours of ${current}`, {
                    current,
                    visited: [...this.visited],
                    neighbours: [],
                    inQueue: [...this.queue],
                });
            },

            onDiscover: ({ current, to }) => {
                this.addStep(`Add ${to} to queue`, {
                    current,
                    visited: [...this.visited],
                    edges: [... this.current_edges],
                    neighbours: [...this.current_neighbours],
                    inQueue: [...this.queue],
                });
            },

            onEdges: ({current, newEdge}) => {
                this.addStep(`Inspect edge ${newEdge}`, {
                    current,
                    visited: [...this.visited],
                    edges: [... this.current_edges],
                    neighbours: [...this.current_neighbours],
                    inQueue: [...this.queue],
                });
            },

            onReturn: () => {
            this.addStep(`All reachable nodes found`, {
                    visited: [...this.visited],
                    inQueue: [...this.queue],
                });
            },

        });


        return this.steps;
    }

    bfsDistances(source) {
        const distances = {};
        this.steps = [];

        this._runBFS(source, {
            onInit: ({ source }) => {
                distances[source] = 0;
            },

            onDiscover: ({ current, neighborIds, to }) => {
                distances[to] = distances[current] + 1;
            },
        });
        return distances;
    }

    
    bfsShortest(source, targetNode) {
        const parent = {};
        const distances = {};
        this.steps = [];


        let found = false;

        this._runBFS(source, {
            onInit: ({ source }) => {
                distances[source] = 0;
                parent[source] = source;
            },

            onPop: ({ current }) => {
                if (current === targetNode) {
                    found = true;
                }
            },

            onDiscover: ({ current, neighborIds, to }) => {
                if (found) return;

                distances[to] = distances[current] + 1;
                parent[to] = current;

                if (to === targetNode) {
                    found = true;
                }
            },
        });

        if(!found) {
            this.addStep("Node target is not reachable from the source you picked");
            return;
        }

        const path = [];
        let node = targetNode;

        while (parent[node] != node) {
            path.push(Number(node));
            node = Number(parent[node])
        } 

        path.push(Number(source));

        path.reverse()
        this.addStep(`Shortest path found`, {
            path,
        });

        return {
            path,
            length: path.length - 1,
        };

    }




    run(params) {
        const { startNode, targetNode, task } = params;
        switch (task) {
            case "shortest":
                return this.bfsShortest(startNode, targetNode);

            case "distances":
                return this.bfsDistances(startNode);

            default:
                return this.bfsTraversal(startNode);
        }
    }

    getResult(){
        return this.bfs;
    }



}

