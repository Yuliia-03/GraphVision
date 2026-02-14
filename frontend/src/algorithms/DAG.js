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

        //console.log(params)
        const { returnTopo } = params;
        //console.log(returnTopo)
        const graph = buildAdjacencyList(this.nodes, this.edges, true);
        //console.log(graph)

        for (const node of this.nodes) {
            if(!this.visited.has(node.data.id)) {
                if (this.recDFSCycle(graph, node.data.id)) {
                    this.addStep(`Cycle detected, cannot perform topological sort`);
                    console.log(this.steps)
                    return false;
                }
            }
        }
        if (returnTopo) {
            return this.topoOrder.reverse();
        }
        return true;
    }


    recDFSCycle(graph, source){

        this.recStack.push(source);
        this.visited.add(source);


        this.addStep(`Start to explore new component with ${source}`, {
            inStack: [...this.recStack]
        });
        
        const neighbors = graph[source] || [];
        //console.log(neighbors)

        for (const { to } of neighbors) {

            if (!this.visited.has(to)) {
                if (this.recDFSCycle(graph, to)) {
                    return true;
                }
            } else if (this.recStack.includes(to)) {
                console.log(`${to} is on stack`)
                return true;
            }

        }

        this.recStack.pop();
        this.topoOrder.push(source)
        this.addStep(`Finished exploring ${source}`, {
            topoOrder: [...this.topoOrder],
        });


        console.log("this.steps")
        console.log(this.steps)

        return false;
    }
    
}
