import {buildAdjacencyList} from "./adjacencyList"
import BaseAlgorithm from "./BaseAlgorithm";


export default class BFSAlgorithm extends BaseAlgorithm{
    
    constructor(nodes, edges, graphConfig) {
        super(nodes, edges, graphConfig)

        this.queue = [];
        this.visited = new Set();
        this.directed = this.graphConfig.directed;

    }

    bfsTraversal(source) {

        const graph = buildAdjacencyList(this.nodes, this.edges, this.directed);

        this.queue.push(source);
        this.visited.add(source)

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
                    this.visited.add(to);
                    this.addStep(`Add ${to} to queue`, {
                        current: current,
                        visited: [...this.visited],
                        neighbors: neighborIds,
                        inQueue: [...this.queue]
                    });
                }
            }
        }
        

        return this.steps
    }

    run(params) {
        const { startNode, targetNode, task } = params;
        switch (task) {
            case "shortest":
                return bfsShortest(startNode, targetNode);

            case "distances":
                return bfsDistances(startNode);

            default:
                return this.bfsTraversal(startNode);
        }
    }



}

