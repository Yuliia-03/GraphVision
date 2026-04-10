import DFSRunner from "./dfsRunner";
import { DFSTraversalTask } from "./subtasks/dfsTraversalTask";
import { DFSPathTask } from "./subtasks/dfsPathTask";
import { DFSStepBuilder } from "./dfsStepBuilder";

export default class DFSAlgorithm {

    constructor(nodes, edges, graphConfig, options = {}) {
        this.nodes = nodes;
        this.edges = edges;
        this.graphConfig = graphConfig;

        this.stepBuilder = options.stepBuilder || new DFSStepBuilder(nodes);
    }

    createTaskStrategy(params) {
        switch (params.task) {
            case "path":
                return new DFSPathTask(params);
            default:
                return new DFSTraversalTask(params);
        }
    }

    run(params, externalVisited = []) {
        const runner = new DFSRunner(
            this.nodes,
            this.edges,
            this.graphConfig
        );
        this.stepBuilder.steps = []
        this.stepBuilder.attach(runner);

        const taskStrategy = this.createTaskStrategy(params);
        taskStrategy.attach(runner);

        runner.run(params.startNode, externalVisited);

        const result = taskStrategy.getResult?.(runner, params) || null;

        this.stepBuilder.steps.push({
            message: "DFS finished",
            result,
            isFinal: true,
            inStack: [],
            reached: [...runner.visited]
        });

        return {
            steps: this.stepBuilder.steps,
            moments: runner.moments
        };
    }
}