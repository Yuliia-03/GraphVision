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

        const edges = [];
        for (let i = 0; i < path.length - 1; i++) {
        const from = path[i];
        const to = path[i + 1];

        edges.push(`${from}-${to}`);

        // ✅ use graphConfig
        if (!runner.graphConfig.directed) {
            edges.push(`${to}-${from}`);
        }
    }



        return {
            type: "shortest",
            path: path.reverse(),
            treeEdges: edges
        };
    }
}