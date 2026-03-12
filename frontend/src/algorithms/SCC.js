import {buildAdjacencyList} from "./adjacencyList"
import BaseAlgorithm from "./BaseAlgorithm";
import DFSAlgorithm from "./DFS";

export default class SCCAlgorithm extends BaseAlgorithm{


    constructor(nodes, edges, graphConfig) {
        super(nodes, edges, graphConfig);

        this.components = [];
        this.steps = [];
    }

    reverseEdges() {
        return this.edges.map(e => ({
            data: {
                id: `${e.data.target}-${e.data.source}`,
                source: e.data.target,
                target: e.data.source
            }
        }));
    }

    firstDFS() {

        const dfs = new DFSAlgorithm(this.nodes, this.edges, { directed: true });

        const visited = new Set();
        let finishOrder = [];

        for (const node of this.nodes) {

            const id = node.data.id;

            if (!visited.has(id)) {

                const newSteps = dfs.run({
                    startNode: id,
                    task: "dfs"
                });

                this.addStep(`First DFS starting at ${id}`, { phase: "firstDFS-start" });

                newSteps.forEach(step => {
                    this.steps.push({
                        ...step,
                        phase: "firstDFS"
                    });
                });
                const result = dfs.getResult();
                result.forEach(n => visited.add(n));
                finishOrder = [...result, ...finishOrder];
            }
        }

        return finishOrder;
    }

    secondDFS(firstOrder, reversedEdges) {

        const dfs = new DFSAlgorithm(this.nodes, reversedEdges, { directed: true });
        const visited = new Set();
        const components = [];

        for (const node of firstOrder) {

            if (!visited.has(node)) {

                const newSteps = dfs.run({
                    startNode: node,
                    task: "dfs"
                });

                this.addStep(`Second DFS starting at ${node}`, { phase: "secondDFS-start" });

                newSteps.forEach(step => {
                    this.steps.push({
                        ...step,
                        phase: "secondDFS"
                    });
                });
                const result = dfs.getResult();
                result.forEach(n => visited.add(n));
                components.push(result);
            }
        }

        this.steps.push({
            phase: "result",
            message: "SCC result",
            components
        });

        return this.steps;
    }



    kosarajuSCC() {

        const firstTraversal = this.firstDFS();
        const reversedEdges = this.reverseEdges();
        this.addStep('Transpose graph!', {phase: "transposition", edges: reversedEdges})
        this.components = this.secondDFS(firstTraversal, reversedEdges);

        //console.log(this.steps)
        return this.components;
    }

    run(params) {
        const { task } = params;

        switch (task) {
            case "kosaraju":
                return this.kosarajuSCC();
        }
    }
}