import {buildAdjacencyList} from "./adjacencyList"
import BaseAlgorithm from "./BaseAlgorithm";


export default class BFSAlgorithm extends BaseAlgorithm{
    
    constructor(nodes, edges, graphConfig) {
        super(nodes, edges, graphConfig)

        this.queue = [];
        this.visited = new Set();
        this.directed = this.graphConfig.directed;

    }

    _runBFS(source, {
        onInit = () => {},
        onPop = () => {},
        onInspect = () => {},
        onDiscover = () => {},
    } = {}) {
        const graph = buildAdjacencyList(this.nodes, this.edges, this.directed);

        this.queue = [];
        this.visited = new Set();

        this.queue.push(source);
        this.visited.add(source);

        onInit({ source });

        while (this.queue.length > 0) {
            const current = this.queue.shift();

            onPop({ current });

            this.visited.add(current);

            const neighbors = graph[current] || [];
            const neighborIds = neighbors.map(e => e.to);

            onInspect({ current, neighbors, neighborIds });

            for (const { to } of neighbors) {
                if (!this.visited.has(to)) {
                    this.queue.push(to);
                    this.visited.add(to);

                    onDiscover({current, to, neighborIds });
                }
            }
        }
    }

    bfsTraversal(source) {
        this.steps = [];

        this._runBFS(source, {
            onInit: ({ source }) => {
                this.addStep(`Initialize queue with ${source}`, {
                    inQueue: [...this.queue],
                });
            },

            onPop: ({ current }) => {
                this.addStep(`Pop ${current} from queue`, {
                    current,
                    visited: [...this.visited],
                    inQueue: [...this.queue],
                    message: `Pop ${current} from queue`,
                });
            },

            onInspect: ({ current, neighborIds }) => {
                this.addStep(`Inspect neighbors of ${current}`, {
                    current,
                    visited: [...this.visited],
                    neighbors: neighborIds,
                    inQueue: [...this.queue],
                });
            },

            onDiscover: ({ current, neighborIds, to }) => {
                this.addStep(`Add ${to} to queue`, {
                    current,
                    visited: [...this.visited],
                    neighbors: neighborIds,
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



}

