import BFSRunner from "./bfsRunner";
import {BFSTraversalTask} from "./subtasks/bfsTraversalTask";
import {BFSDistanceTask} from "./subtasks/bfsDistanceTask";
import {BFSShortestTask} from "./subtasks/bfsShortestTask";
import {BFSStepBuilder} from "./bfsStepBuilder";

export default class BFSAlgorithm {

    constructor(nodes, edges, graphConfig, options = {}) {
        this.nodes = nodes;
        this.edges = edges;
        this.graphConfig = graphConfig;

        this.task = options.task || "traversal";

        this.stepBuilder = options.stepBuilder || new BFSStepBuilder(nodes);
    }

    createTaskStrategy(params) {
        const { startNode, targetNode, task } = params;
        switch (task) {
            case "shortest":
                return new BFSShortestTask(params);

            case "distances":
                return new BFSDistanceTask(params);

            default:
                return new BFSTraversalTask(params);
        }
    }

    run(params) {
        const runner = new BFSRunner(this.nodes, this.edges, this.graphConfig);

        this.stepBuilder.attach(runner);

        const taskStrategy = this.createTaskStrategy(params);
        taskStrategy.attach(runner);

        runner.run(params.startNode);

        const result = taskStrategy.getResult?.(runner, params) || null;

        const reachedNodes =
            result?.type === "shortest"
                ? result.path
                : [...runner.visited];

        this.stepBuilder.steps.push({
            message: "BFS finished",
            result,
            isFinal: true,
            inQueue: [],
            reached: reachedNodes
        });

        return {
            steps: this.stepBuilder.steps,
            moments: runner.moments,
            // quiz
        };
    }
}