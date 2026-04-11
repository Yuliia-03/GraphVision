export class BFSDistanceTask {

    constructor() {
        this.dist = {};
        this.parent = {};
    }

    attach(runner) {

        runner.on("init", ({ source }) => {
            this.dist[source] = 0;
            this.parent[source] = source; 
        });

        runner.on("discover", ({ current, to }) => {
            this.dist[to] = this.dist[current] + 1;
            this.parent[to] = current;
        });
    }

    buildPath(target, source) {
        const path = [];
        let node = target;

        while (this.parent[node] !== node) {
            path.push(node);
            node = this.parent[node];
        }

        path.push(source);
        return path.reverse();
    }

    getResult(runner, params) {

        const { startNode } = params;

        const paths = {};

        Object.keys(this.parent).forEach(node => {
            paths[node] = this.buildPath(node, startNode);
        });

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
            type: "distances",
            distances: this.dist,
            paths,
            treeEdges: edges
        };
    }
}