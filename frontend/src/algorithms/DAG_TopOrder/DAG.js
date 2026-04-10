import {buildAdjacencyList} from "../adjacencyList"
import BaseAlgorithm from "../BaseAlgorithm";



export default class DAGAlgorithm extends BaseAlgorithm{

    constructor(nodes, edges) {
        super(nodes, edges);
        this.recStack = [];
        this.visited = new Set();
        this.topoOrder = [];
        this.moments = [];
        this.cycle = [];

        this.idToLabel = Object.fromEntries(nodes.map(n => [n.data.id, n.data.label]));
    
    }

    getLabel(id) {
        return this.idToLabel[id] || id;
    }

    recordMoment(type, data = {}) {
        this.moments.push({
            type,
            currentNode: data.currentNode ?? null,
            recStack: [...this.recStack],
            visited: [...this.visited],
            topoOrder: [...this.topoOrder],
            neighbours: data.neighbours ?? null,
            cycle: data.cycle ?? null
        });
    }

    
    run(params) {

        const { returnTopo } = params;
        const graph = buildAdjacencyList(this.nodes, this.edges, true);

        for (const node of this.nodes) {
            if(!this.visited.has(node.data.id)) {
                this.addStep(`Start to explore new component with node ${node.data.label}`, {
                    inStack: [...this.recStack],
                    topoOrder: [...this.topoOrder]
                });
                this.recordMoment("startComponent", { currentNode: node.data.id });

                if (this.recDFSCycle(graph, node.data.id)) {
                    this.addStep(`Cycle detected, cannot perform topological sort`, {cycle: this.cycle});
                    this.recordMoment("cycleDetected", { currentNode: node.data.id , cycle: this.cycle});
                    
                    return {
                        steps: this.steps,
                        moments: this.moments
                    }
                } else if(this.visited.size == this.nodes.length){
                    this.addStep(`No cycle detected. Graph is DAG`, {
                        topoOrder: [...this.topoOrder],
                    });
                    this.recordMoment("dagConfirmed", {
                        topoOrder: [...this.topoOrder]
                    });
                }
            }
        }
        if (returnTopo) {
            this.addStep(`Reverse list of visited nodes to obtaine topological order`, {
                topoOrder: [...this.topoOrder.reverse()],
                final: [...this.topoOrder.reverse()],
            });
            this.recordMoment("topoCompleted", {
                topoOrder: [...this.topoOrder]
            });
            console.log(this.steps)
            return {
                steps: this.steps,
                moments: this.moments
            }
        }
        return {
            steps: this.steps,
            moments: this.moments
        }
    }


    recDFSCycle(graph, source){

        this.recStack.push(source);
        this.visited.add(source);


        this.addStep(`Add new node ${this.getLabel(source)}`, {
            current: source,
            inStack: [...this.recStack],
            topoOrder: [...this.topoOrder]
        });
        this.recordMoment("nodeVisited", {
            currentNode: source
        });
        
        const neighbours = graph[source] || [];

        for (const { to } of neighbours) {

            this.addStep(`Current node neighbours ${neighbours.map(e => this.getLabel(e.to)) || undefined}`, {
                current: source,
                inStack: [...this.recStack],
                topoOrder: [...this.topoOrder],
                edges: neighbours.map(e => `${source}-${e.to}`),
                neighbours: neighbours.map(e => e.to)
            });
            this.recordMoment("exploringNeighbours", {
                currentNode: source,
                neighbours: neighbours.map(e => e.to)
            });
            if (!this.visited.has(to)) {
                if (this.recDFSCycle(graph, to)) {
                    return true;
                }
            } else if (this.recStack.includes(to)) {
                const index = this.recStack.indexOf(to);
                this.cycle = this.recStack.slice(index);
                this.cycle.push(to)
                return true;
            }

        }

        this.recStack.pop();
        this.topoOrder.push(source)
        this.visited.add(source)
        this.addStep(`No unvisited neighbours. Finished exploring ${source}`, {
            current: source,
            inStack: [...this.recStack],
            topoOrder: [...this.topoOrder],
        });

        this.recordMoment("backtrack", {
            currentNode: source,
        });

        return false;
    }
    
}
