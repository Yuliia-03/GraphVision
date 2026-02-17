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
        this.paths = {};

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

        let shouldStop = false;
        const stop = () => { shouldStop = true; };


        onInit({ source });

        while (this.queue.length > 0 && !shouldStop) {
            const current = this.queue.shift();

            this.bfs += this.bfs.length ? ` -> ${current}` : `${current}`;

            onPop({ current });

            this.visited.add(current);

            const neighbours = graph[current] || [];
            const neighborIds = neighbours.map(e => e.to);

            onInspect({ current, neighbours, neighborIds });

            for (const { to } of neighbours) {

                if(shouldStop) break;

                const newEdge = `${current}-${to}`
                this.current_edges.push(newEdge);
                if (!this.directed) {
                    this.current_edges.push(`${to}-${current}`);
                }
                this.current_neighbours.push(to)

                onEdges({current, newEdge});

                if (!this.visited.has(to) && !shouldStop) {
                    this.queue.push(to);
                    this.visited.add(to);

                    onDiscover({current, to, stop });
                }
            }
            this.current_neighbours = []
            this.current_edges = []
        }

        onReturn()
    }

    bfsTraversal(source) {
        this.steps = [];
        const parent = {};

        this._runBFS(source, {
            onInit: ({ source }) => {
                parent[source] = source;
                this.addStep(`Initialize queue with ${source}`, {
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
                parent[to] = current;
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

                const treeEdges = this.buildTreeEdges(parent);
                const paths = this.buildAllPaths(parent, source);
                
                this.addStep("DFS finished", {
                    reached: [...this.visited],
                    inQueue: [],
                    result: {
                        type: "traversal",
                        treeEdges,
                        paths: this.getAllBFSTraversals(source),
                        bfs: this.bfs
                    },
                    // result: this.bfs,
                    isFinal: true
                });

            }
        });
        console.log(this.getAllBFSTraversals(source))

        return this.steps;
    }

    bfsDistances(source) {

        const distances = {};
        const parent = {};
        this.steps = [];

        this._runBFS(source, {

            onInit: ({ source }) => {

                distances[source] = 0;
                parent[source] = source;

                this.addStep(`Initialize queue with ${source}`, {
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

            onDiscover: ({ current, neighborIds, to }) => {
                distances[to] = distances[current] + 1;
                parent[to] = current;

                this.addStep(`Add ${to} to queue`, {
                    current,
                    visited: [...this.visited],
                    edges: [... this.current_edges],
                    neighbours: [...this.current_neighbours],
                    inQueue: [...this.queue],
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

                const treeEdges = this.buildTreeEdges(parent);
                const paths = this.buildAllPaths(parent, source);
                
                this.addStep("DFS finished", {
                    reached: [...this.visited],
                    inQueue: [],
                    result: {
                        type: "distances",
                        treeEdges,
                        paths,
                    },
                    isFinal: true
                });

            }
        });
        return this.steps;
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

                this.addStep(`Initialize queue with ${source}`, {
                    current: undefined,
                    inQueue: [...this.queue],
                });
            },

            onPop: ({ current }) => {
                if (current === targetNode) {
                    found = true;
                }

                this.addStep(`Pop ${current} from queue`, {
                    current,
                    visited: [...this.visited],
                    inQueue: [...this.queue],
                    neighbours: [],
                });
            },

            onDiscover: ({ current, to, stop }) => {
                if (found) return;

                distances[to] = distances[current] + 1;
                parent[to] = current;

                if (to === targetNode) {
                    found = true;
                    stop();
                }

                this.addStep(`Add ${to} to queue`, {
                    current,
                    visited: [...this.visited],
                    edges: [... this.current_edges],
                    neighbours: [...this.current_neighbours],
                    inQueue: [...this.queue],
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

            onEdges: ({current, newEdge}) => {
                this.addStep(`Inspect edge ${newEdge}`, {
                    current,
                    visited: [...this.visited],
                    edges: [... this.current_edges],
                    neighbours: [...this.current_neighbours],
                    inQueue: [...this.queue],
                });
            },
            
        });

        if(!found) {
            this.addStep("Node target is not reachable from the source you picked");
            return;
        }

        this.paths = this.buildPath(parent, source, targetNode);
        console.log(this.paths)

        const treeEdges = this.buildTreeEdges(parent);
        const allPaths = this.buildAllPaths(parent, source);
                
        this.addStep("DFS finished", {
            reached: [...this.visited],
            inQueue: [],
            result: {
                type: "shortest",
                treeEdges,
                allPaths,
                path: this.paths
            },
            isFinal: true
        });

        return this.steps

    }

    buildPath(parent, source, target) {
        const path = [];
        let node = target;

        while (parent[node] != node) {
            path.push(Number(node));
            node = Number(parent[node])
        } 

        path.push(Number(source));

        return path.reverse()
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

    buildTreeEdges(parent) {
        const edges = Object.entries(parent)
            .filter(([node, p]) => p !== node)
            .map(([node, p]) => `${p}-${node}`);

        if (this.directed) return edges;

        return edges.flatMap(edge => {
            const [from, to] = edge.split("-");
            return [`${from}-${to}`, `${to}-${from}`];
        });
    }


    buildAllPaths(parent, source) {
        const paths = {};

        Object.keys(parent).forEach(node => {
            paths[node] = this.buildPath(parent, source, node);
        });

        return paths;
    }

    getAllBFSTraversals(source) {
        const graph = buildAdjacencyList(this.nodes, this.edges, this.directed);
        const results = [];

        const permute = (arr) => {
            if (arr.length <= 1) return [arr];
            return arr.flatMap((v, i) =>
                permute([...arr.slice(0, i), ...arr.slice(i + 1)])
                    .map(p => [v, ...p])
            );
        };

        const bfsBacktrack = (queue, visited, order) => {
            if (queue.length === 0) {
                results.push([...order]);
                return;
            }

            const current = queue[0];
            const restQueue = queue.slice(1);

            const neighbors = (graph[current] || [])
                .map(e => e.to)
                .filter(v => !visited.has(v));

            if (neighbors.length === 0) {
                bfsBacktrack(restQueue, visited, [...order, current]);
                return;
            }

            for (const perm of permute(neighbors)) {
                const newVisited = new Set(visited);
                perm.forEach(v => newVisited.add(v));

                bfsBacktrack(
                    [...restQueue, ...perm],
                    newVisited,
                    [...order, current]
                );
            }
        };

        bfsBacktrack([source], new Set([source]), []);
        return results;
    }


}

