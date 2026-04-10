export class BFSStepBuilder {

    constructor(nodes) {
        this.nodes = nodes;
        this.steps = [];

        this.idToLabel = Object.fromEntries(nodes.map(n => [n.data.id, n.data.label]));
    }

    getLabel(id) {
        return this.idToLabel[id] || id;
    }

    mapLabels(arr) {
        return arr.map(id => this.getLabel(id));
    }

    attach(runner) {

        runner.on("init", ({ source }) => {
            this.steps.push({
                message: `Initialize queue with ${this.getLabel(source)}`,
                inQueue: [...runner.queue],
                visited: [],
                edgesLeadingToNew: []
            });
        });

        runner.on("pop", ({ current }) => {
            this.steps.push({
                message: `Pop ${this.getLabel(current)} from queue`,
                current,
                visited: [...runner.visited],
                inQueue: [...runner.queue],
                edgesLeadingToNew: []
            });
        });

        runner.on("edge", ({ current, to }) => {
            this.steps.push({
                message: `Inspect edge ${this.getLabel(current)}-${this.getLabel(to)}`,
                current,
                visited: [...runner.visited],
                inQueue: [...runner.queue],
                edgesLeadingToNew: [...runner.currentEdges],
                neighbours: [...runner.currentNeighbours]
            });
        });

        runner.on("discover", ({ current, to }) => {
            this.steps.push({
                message: `Add ${this.getLabel(to)} to queue`,
                current,
                visited: [...runner.visited],
                inQueue: [...runner.queue],
                edgesLeadingToNew: [...runner.currentEdges],
                neighbours: [...runner.currentNeighbours]
            });
        });

        runner.on("finish", () => {
            this.steps.push({
                message: "BFS finished",
                isFinal: true
            });
        });
    }
}