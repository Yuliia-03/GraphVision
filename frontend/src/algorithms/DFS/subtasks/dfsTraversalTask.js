import {getAllDFSTraversals} from './getAllTraversals'
export class DFSTraversalTask {

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

        const allTraversals = getAllDFSTraversals(
            runner.nodes,
            runner.edges,
            runner.directed,
            startNode
        );

        const treeEdges = Object.entries(this.parent)
                .filter(([n, p]) => n !== p)
                .map(([n, p]) => `${p}-${n}`);

        return {
            type: "traversal",
            dfs: this.order.join(" -> "),
            treeEdges,
            allTraversals
        };
    }
}