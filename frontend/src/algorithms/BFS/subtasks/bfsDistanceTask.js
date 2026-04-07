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

    getResult(_, params) {

        const { startNode } = params;

        const paths = {};

        Object.keys(this.parent).forEach(node => {
            paths[node] = this.buildPath(node, startNode);
        });

        const treeEdges = Object.entries(this.parent)
            .filter(([node, p]) => node !== p)
            .map(([node, p]) => `${p}-${node}`);

        return {
            type: "distances",
            distances: this.dist,
            paths,
            treeEdges
        };
    }
}