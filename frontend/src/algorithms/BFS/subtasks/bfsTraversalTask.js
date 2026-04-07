import { getAllBFSTraversals } from "./getAllTraversals";

export class BFSTraversalTask {

    constructor(params) {
        this.params = params;
        this.parent = {};
        this.order = [];
    }

    attach(runner) {

        runner.on("init", ({ source }) => {
            this.parent[source] = source;
        }); 

        runner.on("pop", ({ current }) => {
            this.order.push(current);
        });

        runner.on("discover", ({ current, to }) => {
            this.parent[to] = current;
        });
    }

    getResult(runner) {

        const { startNode } = this.params;

        const allTraversals = getAllBFSTraversals(
            runner.nodes,
            runner.edges,
            runner.directed,
            startNode
        );

        const treeEdges = Object.entries(this.parent)
            .filter(([node, p]) => node !== p)
            .map(([node, p]) => `${p}-${node}`);

        return {
            type: "traversal",
            bfs: this.order.join(" -> "),
            treeEdges,
            allTraversals
        };
    }
}