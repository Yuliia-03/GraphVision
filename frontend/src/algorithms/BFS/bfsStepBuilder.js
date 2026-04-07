export class BFSStepBuilder {

    constructor() {
        this.steps = [];
    }

    attach(runner) {

        runner.on("init", ({ source }) => {
            this.steps.push({
                message: `Initialize queue with ${source}`,
                inQueue: [...runner.queue],
                visited: [],
                edgesLeadingToNew: []
            });
        });

        runner.on("pop", ({ current }) => {
            this.steps.push({
                message: `Pop ${current} from queue`,
                current,
                visited: [...runner.visited],
                inQueue: [...runner.queue],
                edgesLeadingToNew: []
            });
        });

        runner.on("edge", ({ current, to }) => {
            this.steps.push({
                message: `Inspect edge ${current}-${to}`,
                current,
                visited: [...runner.visited],
                inQueue: [...runner.queue],
                edgesLeadingToNew: [...runner.currentEdges],
                neighbours: [...runner.currentNeighbours]
            });
        });

        runner.on("discover", ({ current, to }) => {
            this.steps.push({
                message: `Add ${to} to queue`,
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