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

        this.dfs = [];
        this.paths = {};
        this.idToLabel = Object.fromEntries(nodes.map(n => [n.data.id, n.data.label]));

    }
    
    getLabel(id) {
        return this.idToLabel[id] || id;
    }
    mapLabels(arr) {
        return arr.map(id => this.idToLabel[id] || id)
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

        let shouldStop = false;
        const stop = () => { shouldStop = true; };

        this.stack.push(source);
        this.visited.add(source);

        onInit({ source });

        while (this.stack.length > 0 && !shouldStop) {
            
            const current = this.stack.pop();

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
                this.addStep(`Initialize stack with ${this.getLabel(source)}`, {
                    current: undefined,
                    inStack: [...this.stack],
                    visited: [...this.visited]
                });
            },

            onPop: ({ current }) => {
                this.addStep(`Pop ${this.getLabel(current)} from stack`, {
                    current,
                    visited: [...this.visited],
                    inStack: [...this.stack],
                    neighbours: [],
                });
            },

            onInspect: ({ current }) => {
                this.addStep(`Inspect neighbours of ${this.getLabel(current)}`, {
                    current,
                    visited: [...this.visited],
                    neighbours: [],
                    inStack: [...this.stack],
                });
            },

            onDiscover: ({ current, to }) => {
                this.addStep(`Add ${this.getLabel(to)} to stack`, {
                    current,
                    visited: [...this.visited],
                    edges: [...this.current_edges],
                    neighbours: [...this.current_neighbours],
                    inStack: [...this.stack],
                });
            },

            onEdges: ({ current, newEdge }) => {
                this.addStep(`Inspect edge ${newEdge.split("-").map(id => this.getLabel(id)).join("-")}`, {
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
