import {buildAdjacencyList} from "./adjacencyList"
import BaseAlgorithm from "./BaseAlgorithm";


export default class BFSAlgorithm extends BaseAlgorithm{
    
    constructor(nodes, edges, graphConfig) {
        super(nodes, edges, graphConfig)

        this.queue = [];
        this.visited = new Set();

    }

    bfsTraversal(nodes, edges, source, directed) {

        const graph = buildAdjacencyList(nodes, edges, directed);

        this.queue.push(source);

        this.addStep(`Initialize queue with ${source}`, {
            inQueue: [...this.queue],
        });

        while (this.queue.length > 0) {
            const current = this.queue.shift();

            this.addStep(`Pop ${current} from queue`, {
                current: current,
                visited: [...this.visited],
                inQueue: [...this.queue],
                message: `Pop ${current} from queue`
            });

            this.visited.add(current);

            const neighbors = graph[current] || [];
            const neighborIds = neighbors.map(e => e.to);

            this.addStep(`Inspect neighbors of ${current}`, {

                current: current,
                visited: [...this.visited],
                neighbors: neighborIds,
                inQueue: [...this.queue],
            });

            for (const { to } of neighbors) {
                if (!this.visited.has(to)) {
                    this.queue.push(to);

                    this.addStep(`Add ${to} to queue`, {
                    current: current,
                    visited: [...this.visited],
                    neighbors: neighborIds,
                    inQueue: [...this.queue]
                    });
                }
            }
        }
        
        console.log(this.steps)

        return this.steps
    }

    run(task, params) {
        const { startNode, targetNode } = params;
        console.log(this.graphConfig.directed)
        const directed = this.graphConfig.directed;
        switch (task) {
            case "shortest":
                return bfsShortest(this.nodes, this.edges, startNode, targetNode, directed);

            case "distances":
                return bfsDistances(this.nodes, this.edges, startNode, directed);

            default:
                return this.bfsTraversal(this.nodes, this.edges, startNode, directed);
        }
    }



}

