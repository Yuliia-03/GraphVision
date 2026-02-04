export default class BaseAlgorithm {
    constructor(nodes, edges, graphConfig = {}) {
        this.nodes = nodes;
        this.edges = [...edges];
        this.graphConfig = graphConfig;

        this.steps = [];
        this.currentWeight = 0;
    }

    addStep(message, extra = {}) {
        this.steps.push({
        message,
        ...extra
        });
    }

    run() {
        throw new Error("run() must be implemented by subclass");
    }
}
