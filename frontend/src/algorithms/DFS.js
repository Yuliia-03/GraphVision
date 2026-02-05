import {buildAdjacencyList} from "./adjacencyList"
import BaseAlgorithm from "./BaseAlgorithm";



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
            case "cycle_undirected":return
        }
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

            this.visited.add(current);

            const neighbors = graph[current] || [];
            const neighborIds = neighbors.map(e => e.to);

            this.addStep(`Inspect neighbors of ${current}`, {
                current: current,
                visited: [...this.visited],
                neighbors: neighborIds,
                inStack: [...this.stack]
            });

            for (const { to } of neighbors) {
                if (!this.visited.has(to)) {
                    this.stack.push(to);
                    this.visited.add(to);
                    this.addStep(`Add ${to} to stack`, {
                    current: current,
                    visited: [...this.visited],
                    neighbors: neighborIds,
                    inStack: [...this.stack]
                    });
                }
            }
        }

        console.log(this.steps)

        return this.steps;
    }


    
}
