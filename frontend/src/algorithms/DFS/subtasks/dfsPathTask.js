export class DFSPathTask {

    constructor(params) {
        this.params = params;
        this.parent = {};
        this.found = false;
    }

    attach(runner) {

        const { targetNode } = this.params;

        runner.on("init", ({ source }) => {
            this.parent[source] = source;
        });

        runner.on("discover", ({ current, to, stop }) => {
            this.parent[to] = current;

            if (to === targetNode) {
                this.found = true;
                stop();
            }
        });
    }

    getResult(runner) {
        const { startNode, targetNode } = this.params;

        if (!this.parent[targetNode]) {
            return { type: "path", path: null };
        }

        const path = [];
        let node = targetNode;

        while (this.parent[node] !== node) {
            path.push(Number(node));
            node = this.parent[node];
        }

        path.push(Number(startNode));

        const treeEdges = Object.entries(this.parent)
            .filter(([n, p]) => n !== p)
            .map(([n, p]) => `${p}-${n}`);

        return {
            type: "path",
            path: path.reverse(),
            treeEdges
        };
    }
}