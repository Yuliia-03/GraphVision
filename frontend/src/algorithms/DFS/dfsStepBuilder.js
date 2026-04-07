export class DFSStepBuilder {

    constructor() {
        this.steps = [];
    }

    attach(runner) {

        runner.on("init", ({ source }) => {
            this.steps.push({
                message: `Initialize stack with ${source}`,
                inStack: [...runner.stack],
                visited: []
            });
        });

        runner.on("pop", ({ current }) => {
            this.steps.push({
                message: `Pop ${current} from stack`,
                current,
                visited: [...runner.visited],
                inStack: [...runner.stack]
            });
        });

        runner.on("inspect", ({ current }) => {
            this.steps.push({
                message: `Inspect neighbours of ${current}`,
                current,
                visited: [...runner.visited],
                inStack: [...runner.stack]
            });
        });

        runner.on("edge", ({ current, to }) => {
            this.steps.push({
                message: `Inspect edge ${current}-${to}`,
                current,
                visited: [...runner.visited],
                edges: [...runner.currentEdges],
                neighbours: [...runner.currentNeighbours],
                inStack: [...runner.stack]
            });
        });

        runner.on("discover", ({ current, to }) => {
            this.steps.push({
                message: `Add ${to} to stack`,
                current,
                visited: [...runner.visited],
                edges: [...runner.currentEdges],
                neighbours: [...runner.currentNeighbours],
                inStack: [...runner.stack]
            });
        });
    }
}