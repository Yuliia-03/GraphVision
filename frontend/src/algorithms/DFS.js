import {buildAdjacencyList} from "./adjacencyList"
import BaseAlgorithm from "./BaseAlgorithm";


export default class DFSAlgorithm extends BaseAlgorithm{

    constructor(nodes, edges, graphConfig) {
        super(nodes, edges, graphConfig);
        this.stack = [];
        this.visited = new Set();
        this.directed = this.graphConfig.directed;

        this.current_edges = [];
        this.current_neighbours = [];

        this.dfs = "";
        this.paths = {};
    }

    run(params) {
        const { startNode, targetNode, task } = params;

        switch(task) {
            case "traversal":
                return this.dfsTraversal(startNode)
            case "path":return
            case "cycle_undirected":
                // if(this.directed) {
                //     const graph = buildAdjacencyList(this.nodes, this.edges, true);
                //     return DAGAlgorithm.recDFSCycle(graph, startNode)
                // } else {
                    const res =  this.cycleDetection();
                    console.log(res);
                    return res;
                // }
        }
    }

    cycleDetection(){

        let parent = []
        this.stack = []

        const graph = buildAdjacencyList(this.nodes, this.edges, false);


        for (const node of this.nodes) {
            const start = node.data.id;
            if (this.visited.has(start)) continue;

            this.stack.push({ node: start, parent: null });
            this.visited.add(start);

            while (this.stack.length > 0) {
                const { node: current, parent } = this.stack.pop();

                for (const { to } of graph[current] || []) {
                    if (!this.visited.has(to)) {
                        this.visited.add(to);
                        this.stack.push({ node: to, parent: current });
                    } else if (to !== parent) {
                        return true;
                    }
                }

            }
        }

        return false;
    }

    _runDFS(source, {
        onInit = () => {},
        onPop = () => {},
        onInspect = () => {},
        onDiscover = () => {},
        onEdges = () => {},
        onReturn = () => {}
    } = {}) {

        const graph = buildAdjacencyList(this.nodes, this.edges, this.directed);

        this.stack = [];
        this.visited = new Set();
        this.current_edges = [];
        this.current_neighbours = [];

        let shouldStop = false;
        const stop = () => { shouldStop = true; };

        this.stack.push(source);
        this.visited.add(source);

        // this.addStep(`Initialize stack with ${source}`, {
        //     inStack: [...this.stack]
        // });

        onInit({ source });

        while (this.stack.length > 0 && !shouldStop) {
            
            const current = this.stack.pop();

            this.dfs += this.dfs.length ? ` -> ${current}` : `${current}`;

            // this.addStep(`Pop ${current} from stack`, {
            //     current: current,
            //     visited: [...this.visited],
            //     inStack: [...this.stack]
            // });
            onPop({ current });

            const neighbours = graph[current] || [];
            const neighborIds = neighbours.map(e => e.to);

            // this.addStep(`Inspect neighbours of ${current}`, {
            //     current: current,
            //     visited: [...this.visited],
            //     neighbours: neighborIds,
            //     inStack: [...this.stack]
            // });
            onInspect({ current, neighbours, neighborIds });

            for (const { to } of neighbours) {

                if (shouldStop) break;

                const newEdge = `${current}-${to}`;
                this.current_edges.push(newEdge);
                this.current_neighbours.push(to);

                onEdges({ current, newEdge });

                if (!this.visited.has(to)) {

                    this.stack.push(to);
                    this.visited.add(to);

                    // this.addStep(`Add ${to} to stack`, {
                    //     current: current,
                    //     visited: [...this.visited],
                    //     neighbours: neighborIds,
                    //     inStack: [...this.stack]
                    // });
                    onDiscover({ current, to, stop });
                }
                
            }

            this.current_edges = [];
            this.current_neighbours = [];

        }
        onReturn();

        console.log(this.steps)

        return this.steps;
    }

    dfsTraversal(source) {
        this.steps = [];

        this._runDFS(source, {
            onInit: ({ source }) => {
                this.addStep(`Initialize stack with ${source}`, {
                    current: undefined,
                    inStack: [...this.stack],
                });
            },

            onPop: ({ current }) => {
                this.addStep(`Pop ${current} from stack`, {
                    current,
                    visited: [...this.visited],
                    inStack: [...this.stack],
                    neighbours: [],
                });
            },

            onInspect: ({ current }) => {
                this.addStep(`Inspect neighbours of ${current}`, {
                    current,
                    visited: [...this.visited],
                    neighbours: [],
                    inStack: [...this.stack],
                });
            },

            onDiscover: ({ current, to }) => {
                this.addStep(`Add ${to} to stack`, {
                    current,
                    visited: [...this.visited],
                    edges: [...this.current_edges],
                    neighbours: [...this.current_neighbours],
                    inStack: [...this.stack],
                });
            },

            onEdges: ({ current, newEdge }) => {
                this.addStep(`Inspect edge ${newEdge}`, {
                    current,
                    visited: [...this.visited],
                    edges: [...this.current_edges],
                    neighbours: [...this.current_neighbours],
                    inStack: [...this.stack],
                });
            },

            onReturn: () => {
                this.addStep("DFS finished", {
                    visited: [...this.visited],
                    inStack: [],
                    result: this.dfs,
                    isFinal: true,
                });
            }
        });

        return this.steps;
    }

    dfsPath(source, target) {
        const parent = {};
        this.steps = [];

        this._runDFS(source, {
            onInit: ({ source }) => {
                parent[source] = source;

                this.addStep(`Initialize stack with ${source}`, {
                    inStack: [...this.stack],
                });
            },

            onDiscover: ({ current, to, stop }) => {
                parent[to] = current;

                if (to === target) {
                    stop();
                }

                this.addStep(`Add ${to} to stack`, {
                    current,
                    visited: [...this.visited],
                    edges: [...this.current_edges],
                    neighbours: [...this.current_neighbours],
                    inStack: [...this.stack],
                });
            }
        });

        if (!parent[target]) {
            this.addStep("Target not reachable", { isFinal: true });
            return this.steps;
        }

        const path = this.buildPath(parent, source, target);

        this.addStep(`Path found ${path}`, {
            result: path,
            isFinal: true,
        });

        return this.steps;
    }

    buildPath(parent, source, target) {
        const path = [];
        let node = target;

        while (parent[node] !== node) {
            path.push(Number(node));
            node = parent[node];
        }

        path.push(Number(source));
        return path.reverse();
    }

    run(params) {
        const { startNode, targetNode, task } = params;

        switch (task) {
            case "path":
                return this.dfsPath(startNode, targetNode);
            default:
                return this.dfsTraversal(startNode);
        }
    }

    getResult() {
        return this.dfs;
    }


    
}
