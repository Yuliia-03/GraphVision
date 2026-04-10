export class DFSStepBuilder {

    constructor(nodes) {
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
        this.steps = [];

        runner.on("init", ({ source }) => {
            this.steps.push({
                message: `Initialize stack with ${this.getLabel(source)}`,
                inStack: [...runner.stack],
                visited: []
            });
        });

        runner.on("pop", ({ current }) => {
            this.steps.push({
                message: `Pop ${this.getLabel(current)} from stack`,
                current,
                visited: [...runner.visited],
                inStack: [...runner.stack]
            });
        });

        runner.on("inspect", ({ current }) => {
            this.steps.push({
                message: `Inspect neighbours of ${this.getLabel(current)}`,
                current,
                visited: [...runner.visited],
                inStack: [...runner.stack]
            });
        });

        runner.on("edge", ({ current, to }) => {
            this.steps.push({
                message: `Inspect edge ${this.getLabel(current)}-${this.getLabel(to)}`,
                current,
                visited: [...runner.visited],
                edges: [...runner.currentEdges],
                neighbours: [...runner.currentNeighbours],
                inStack: [...runner.stack]
            });
        });

        runner.on("discover", ({ current, to }) => {
            this.steps.push({
                message: `Add ${this.getLabel(to)} to stack`,
                current,
                visited: [...runner.visited],
                edges: [...runner.currentEdges],
                neighbours: [...runner.currentNeighbours],
                inStack: [...runner.stack]
            });
        });
    }
}