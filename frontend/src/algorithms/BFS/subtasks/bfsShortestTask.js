export class BFSShortestTask {

    constructor({ targetNode }) {
        this.target = targetNode;
        this.parent = {};
        this.found = false;
    }

    attach(runner) {

        runner.on("init", ({ source }) => {
            this.parent[source] = source;
        });

        runner.on("discover", ({ current, to, stop }) => {
            if (this.found) return;

            this.parent[to] = current;

            if (to === this.target) {
                this.found = true;
                stop();
            }
        });
    }

    getResult(runner, params) {

        if (!this.found) {
            return { type: "shortest", path: null };
        }

        const path = [];
        let node = this.target;

        while (this.parent[node] !== node) {
            path.push(node);
            node = this.parent[node];
        }

        path.push(params.startNode);

        const treeEdges = Object.entries(this.parent)
            .filter(([n, p]) => n !== p)
            .map(([n, p]) => `${p}-${n}`);

        return {
            type: "shortest",
            path: path.reverse(),
            treeEdges
        };
    }
}