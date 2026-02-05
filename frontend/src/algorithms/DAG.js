import {buildAdjacencyList} from "./adjacencyList"
import BaseAlgorithm from "./BaseAlgorithm";



export default class DAGAlgorithm extends BaseAlgorithm{

    constructor(nodes, edges) {
        super(nodes, edges);
        this.recStack = [];
        this.visited = new Set();
    }

    run() {
        return this.isDAG();
    }

    isDAG(){


        const graph = buildAdjacencyList(this.nodes, this.edges, true);
        console.log(graph)

        for (const node of this.nodes) {
            if(!this.visited.has(node.data.id)) {
                if (this.recDFSCycle(graph, node.data.id)) {return false;}
            }
        }
        return true;
    }


    recDFSCycle(graph, source){

        this.recStack.push(source);
        this.visited.add(source);

        console.log(source)
        console.log(this.recStack)
        console.log(this.visited)

        this.addStep(`Start to explore new component with ${source}`, {
            inStack: [...this.recStack]
        });
        
        const neighbors = graph[source] || [];
        const neighborIds = neighbors.map(e => e.to);
        console.log(neighbors)

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

        return false;
    }


    
}
