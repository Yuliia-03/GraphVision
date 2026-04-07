import {buildAdjacencyList} from "../adjacencyList"
import BaseAlgorithm from "../BaseAlgorithm";


export default class DFSAlgorithm extends BaseAlgorithm{

    constructor(nodes, edges, graphConfig) {
        super(nodes, edges, graphConfig);
        this.stack = [];
        this.visited = new Set();
        this.directed = this.graphConfig.directed;

        this.current_edges = [];
        this.current_neighbours = [];

        //this.dfs = "";
        this.dfs = [];
        this.paths = {};
    }

    _runDFS(source, phase, {
        onInit = () => {},
        onPop = () => {},
        onInspect = () => {},
        onDiscover = () => {},
        onEdges = () => {},
        onReturn = () => {}
    } = {}) {

        const graph = buildAdjacencyList(this.nodes, this.edges, this.directed);

        this.dfs = [];
        // this.stack = [];
        // this.visited = new Set();
        // this.current_edges = [];
        // this.current_neighbours = [];

        let shouldStop = false;
        const stop = () => { shouldStop = true; };

        this.stack.push(source);
        this.visited.add(source);

        onInit({ source });

        while (this.stack.length > 0 && !shouldStop) {
            
            const current = this.stack.pop();

            // this.dfs += this.dfs.length ? ` -> ${current}` : `${current}`;
            
            this.dfs.push(current);
            onPop({ current });

            const neighbours = graph[current] || [];
            const neighborIds = neighbours.map(e => e.to);

            onInspect({ current, neighbours, neighborIds });

            for (const { to } of neighbours) {

                if (shouldStop) break;

                const newEdge = `${current}-${to}`;
                if (phase == "first-dfs"){
                    this.current_edges.push(newEdge);
                } else {
                    this.current_edges.push(`${to}-${current}`)
                }
                this.current_neighbours.push(to);

                onEdges({ current, newEdge });

                if (!this.visited.has(to)) {

                    this.stack.push(to);
                    this.visited.add(to);
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

    dfsTraversal(source, phase) {
        this.steps = [];

        this._runDFS(source, phase, {
            onInit: ({ source }) => {
                this.addStep(`Initialize stack with ${source}`, {
                    current: undefined,
                    inStack: [...this.stack],
                    visited: [...this.visited]
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
                    result: this.dfs.join('->'),
                    isFinal: true,
                });
            }
        });

        return this.steps;
    }
    
    run(params, phase) {
        const { startNode, targetNode, task } = params;

        return this.dfsTraversal(startNode, phase);
    }

    getResult() {
        return this.dfs;
    }


    
}
