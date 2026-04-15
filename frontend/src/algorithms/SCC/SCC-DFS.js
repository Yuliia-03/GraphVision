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
        this.moments = [];

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

    _runDFS(source, visited = [], {
        onInit = () => {},
        onBacktrack = () => {},
        onInspect = () => {},
        onDiscover = () => {},
        onEdges = () => {},
        onReturn = () => {}
    } = {}) {

        const graph = buildAdjacencyList(this.nodes, this.edges, this.directed);

        this.dfs = [];
        this.visited = new Set(visited);
        this.stack = [];
        this.moments = [];

        const callStack = [];

        const dfsVisit = (current) => {

            this.current_edges = []
            this.current_neighbours = [];
            

            this.visited.add(current);

            const moment = {
                node: current,
                stackBefore: [...callStack],
                visitedBefore: [...this.visited],
                discovered: [],
                edgesLeadingToNew: [],
                neighbours: []
            };

            this.dfs.push(current);

            const neighbours = graph[current] || [];
            const neighborIds = neighbours.map(e => e.to);

            onInspect({ current, neighbours, neighborIds });

            for (const { to } of neighbours) {

                moment.neighbours.push(to);

                const newEdge = `${current}-${to}`;
                this.current_edges.push(newEdge);
                this.current_neighbours.push(to);

                onEdges({ current, newEdge });

                if (!this.visited.has(to)) {
                    moment.discovered.push(to);
                    moment.edgesLeadingToNew.push(newEdge);

                    callStack.push(to);
                    this.stack = [...callStack];

                    onDiscover({ current, to, stop });

                    dfsVisit(to); 
                } 
            }
            onBacktrack({current});
            // add current to finish order

            callStack.pop();
            this.stack = [...callStack];

            moment.stackAfter = [...callStack];
            moment.visitedAfter = [...this.visited];

            moment.stepIndex = this.steps.length + this.stepIndex;
            moment.type = "backtrack"
            moment.finishOrder = this.finishOrder || [],

            this.moments.push(moment);

            this.current_edges = [];
            this.current_neighbours = [];
        };


        callStack.push(source);
        this.stack = [...callStack];

        onInit({ source });

        dfsVisit(source);

        onReturn();

        console.log(this.steps);

        return this.steps;
    }

    addMoment(extra = {}) {
        this.moments.push({
            node: extra.current,
            visited: [...this.visited],
            stackBefore: [...this.stack.slice(0,-1)],
            stackAfter: [...this.stack],
            edges: [...this.current_edges],
            neighbours: [...this.current_neighbours],
            stepIndex: this.steps.length + this.stepIndex,
            finishOrder: this.finishOrder || [],
            ...extra
        });
    }
    


    dfsTraversal(source, phase, step) {
        this.steps = [];
        this.moments = [];

        this._runDFS(source, phase, {
            onInit: ({ source }) => {
                this.addStep(`Initialize stack with ${this.getLabel(source)}`, {
                    current: undefined,
                    inStack: [...this.stack],
                    visited: [...this.visited]
                });
                
            },


            onBacktrack: ({ current }) => {
                this.addStep(`No more uninspected nodes from ${this.getLabel(current)}`, {
                    current,
                    visited: [...this.visited],
                    inStack: [...this.stack],
                    neighbours: [],
                });
            },

            onInspect: ({ current, neighbours, neighborIds }) => {
                this.addStep(`Inspect neighbours of ${this.getLabel(current)}`, {
                    current,
                    visited: [...this.visited],
                    neighbours: neighbours,
                    inStack: [...this.stack],
                });
                this.addMoment({
                    type: "discover",
                    current,
                    stepIndex: this.steps.length + this.stepIndex,
                    neighbours: neighborIds
                    
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
    
    run(params, phase, stepIndex) {
        this.stepIndex = stepIndex
        const { startNode, targetNode, task, finishOrder } = params;
        if (finishOrder) {
            this.finishOrder = finishOrder;
        }
        return this.dfsTraversal(startNode, phase);
    }

    getResult() {
        return this.dfs;
    }

    getMoments() {
        return this.moments
    }


    
}
