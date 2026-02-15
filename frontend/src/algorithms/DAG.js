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
                this.addStep(`Start to explore new component with ${node.data.id}`, {
                    inStack: [...this.recStack],
                    topoOrder: [...this.topoOrder]
                });
                if (this.recDFSCycle(graph, node.data.id)) {
                    this.addStep(`Cycle detected, cannot perform topological sort`);
                    //console.log(this.steps)
                    //return false;
                    return this.steps;
                }
            }
        }
        if (returnTopo) {
            this.addStep(`Topological order found`, {
                topoOrder: [...this.topoOrder.reverse()],
            });
            return this.steps;
            //return this.topoOrder.reverse();
        }
        //return true;
        return this.steps;
    }


    recDFSCycle(graph, source){

        this.recStack.push(source);
        this.visited.add(source);


        this.addStep(`Current node ${source}`, {
            current: source,
            inStack: [...this.recStack],
            topoOrder: [...this.topoOrder]
        });
        
        const neighbours = graph[source] || [];
        //console.log(neighbours)
        this.addStep(`Current node neighbours ${neighbours.map(e => e.to)}`, {
            current: source,
            inStack: [...this.recStack],
            topoOrder: [...this.topoOrder],
            neighbours: neighbours.map(e => e.to)
        });

        for (const { to } of neighbours) {

            if (!this.visited.has(to)) {
                if (this.recDFSCycle(graph, to)) {
                    return true;
                }
            } else if (this.recStack.includes(to)) {
                //console.log(`${to} is on stack`)
                return true;
            }

        }

        this.recStack.pop();
        this.topoOrder.push(source)
        this.addStep(`Finished exploring ${source}`, {
            current: source,
            inStack: [...this.recStack],
            topoOrder: [...this.topoOrder],
        });


        //console.log("this.steps")
        //console.log(this.steps)

        return false;
    }
    
}
