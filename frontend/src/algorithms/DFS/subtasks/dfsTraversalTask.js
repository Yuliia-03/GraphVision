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
        runner.on("visited", ({ current, to }) => {
            this.parent[to] = current;
            console.log(to, current)
        });
    }

    getResult(runner) {

        const { startNode } = this.params;

        const treeEdges = Object.entries(this.parent)
                .filter(([n, p]) => n !== p)
                .map(([n, p]) => `${p}-${n}`);
        
        if (!runner.directed) {
            const reversed = treeEdges.map(e => {
                const [u, v] = e.split("-");
                return `${v}-${u}`;
            });

            treeEdges.push(...reversed);
        }

        return {
            type: "traversal",
            dfs: this.order,
            treeEdges
        };
    }
}