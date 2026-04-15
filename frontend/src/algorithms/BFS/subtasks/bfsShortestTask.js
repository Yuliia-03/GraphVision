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
        
        Object.entries(this.parent)
        .filter(([node, p]) => node !== p && path.includes(node))
        .forEach(([node, p]) => {
            edges.push(`${p}-${node}`);

            if (!runner.directed) {
                edges.push(`${node}-${p}`);
            }
        });


        return {
            type: "shortest",
            path: path.reverse(),
            treeEdges: edges
        };
    }
}
