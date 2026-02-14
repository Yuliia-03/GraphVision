import {buildAdjacencyList} from "./adjacencyList"
import BaseAlgorithm from "./BaseAlgorithm";
import DAGAlgorithm from "./DAG";


export default class DFSAlgorithm extends BaseAlgorithm{

    constructor(nodes, edges, graphConfig) {
        super(nodes, edges, graphConfig);
        this.stack = [];
        this.visited = new Set();
        this.directed = this.graphConfig.directed;
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

    dfsTraversal(source){

        const graph = buildAdjacencyList(this.nodes, this.edges, this.directed);

        this.stack.push(source);
        this.visited.add(source);

        this.addStep(`Initialize stack with ${source}`, {
            inStack: [...this.stack]
        });

        while (this.stack.length > 0) {
            const current = this.stack.pop();

            this.addStep(`Pop ${current} from stack`, {
                current: current,
                visited: [...this.visited],
                inStack: [...this.stack]
            });

            const neighbours = graph[current] || [];
            const neighborIds = neighbours.map(e => e.to);

            this.addStep(`Inspect neighbours of ${current}`, {
                current: current,
                visited: [...this.visited],
                neighbours: neighborIds,
                inStack: [...this.stack]
            });

            for (const { to } of neighbours) {
                if (!this.visited.has(to)) {
                    this.stack.push(to);
                    this.visited.add(to);
                    this.addStep(`Add ${to} to stack`, {
                    current: current,
                    visited: [...this.visited],
                    neighbours: neighborIds,
                    inStack: [...this.stack]
                    });
                }
            }
        }

        console.log(this.steps)

        return this.steps;
    }


    
}
