import {buildAdjacencyList} from "./adjacencyList"
import BaseAlgorithm from "./BaseAlgorithm";



export default class DAGAlgorithm extends BaseAlgorithm{

    constructor(nodes, edges) {
        super(nodes, edges);
        this.recStack = [];
        this.visited = new Set();
        this.topoOrder = []
    }

    
    run(params) {

        const { returnTopo } = params;
        const graph = buildAdjacencyList(this.nodes, this.edges, true);

        for (const node of this.nodes) {
            if(!this.visited.has(node.data.id)) {
                this.addStep(`Start to explore new component with node ${node.data.id}`, {
                    inStack: [...this.recStack],
                    topoOrder: [...this.topoOrder]
                });
                if (this.recDFSCycle(graph, node.data.id)) {
                    this.addStep(`Cycle detected, cannot perform topological sort`);
                    return this.steps;
                } else if(this.visited.size == this.nodes.length){
                    this.addStep(`No cycle detected. Graph is DAG`);
                }
            }
        }
        if (returnTopo) {
            this.addStep(`Reverse list of visited nodes to obtaine topological order`, {
                topoOrder: [...this.topoOrder.reverse()],
                final: [...this.topoOrder.reverse()],
            });
            return this.steps;
        }
        return this.steps;
    }


    recDFSCycle(graph, source){

        this.recStack.push(source);
        this.visited.add(source);


        this.addStep(`Add new node ${source}`, {
            current: source,
            inStack: [...this.recStack],
            topoOrder: [...this.topoOrder]
        });
        
        const neighbours = graph[source] || [];

        for (const { to } of neighbours) {

            if (!this.visited.has(to)) {
                this.addStep(`Current node neighbours ${neighbours.map(e => e.to) || undefined}`, {
                    current: source,
                    inStack: [...this.recStack],
                    topoOrder: [...this.topoOrder],
                    neighbours: neighbours.map(e => e.to)
                });
                if (this.recDFSCycle(graph, to)) {
                    return true;
                }
            } else if (this.recStack.includes(to)) {
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

        return false;
    }
    
}
