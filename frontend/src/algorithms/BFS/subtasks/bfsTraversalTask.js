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

        const edges = [];

    Object.entries(this.parent)
        .filter(([node, p]) => node !== p)
        .forEach(([node, p]) => {
            edges.push(`${p}-${node}`);

            // ✅ add reverse if undirected
            if (!runner.directed) {
                edges.push(`${node}-${p}`);
            }
        });


        return {
            type: "traversal",
            bfs: this.order,
            treeEdges: edges,
            allTraversals
        };
    }
}