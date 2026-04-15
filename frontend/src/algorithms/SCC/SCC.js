import {buildAdjacencyList} from "../adjacencyList"
import BaseAlgorithm from "../BaseAlgorithm";
import DFSAlgorithm from "./SCC-DFS";

export default class SCCAlgorithm extends BaseAlgorithm{


    constructor(nodes, edges, graphConfig) {
        super(nodes, edges, graphConfig);

        this.components = [];
        this.steps = [];
        this.moments = [];
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
                }, visited, this.steps.length);

                // this.addStep(`First DFS starting at ${id}`, { phase: "firstDFS-start" });
                this.addStep(`First DFS starting at ${node.data.label}`, {
                    phase: "firstDFS-start",
                    // current: id,
                    visited: [...visited],
                    inStack: [],
                    neighbours: [],
                    phase: "firstDFS",
                    finishOrder: finishOrder
                });

                

                newSteps.forEach(step => {
                    this.steps.push({
                        ...step,
                        phase: "firstDFS",
                        finishOrder: finishOrder
                    });
                });
                const result = dfs.getResult();
                result.forEach(n => visited.add(n));
                finishOrder = [...result, ...finishOrder];

                this.steps[this.steps.length - 1].message = `No more reachable nodes strating from ${id}. Update finish time`;
                this.steps[this.steps.length - 1].finishOrder = finishOrder;
                 this.moments = [...this.moments, ...dfs.getMoments()];

            }
        }
        return finishOrder;
    }

    secondDFS(firstOrder, reversedEdges) {
        const dfs = new DFSAlgorithm(this.nodes, reversedEdges, { directed: true });
        const visited = new Set();
        const components = [];

        for (let i = 0; i < firstOrder.length; i++) {

            const node = firstOrder[i];

            if (!visited.has(node)) {

                //  recompute before DFS
                let remainingOrder = firstOrder.filter(n => !visited.has(n));

                const newSteps = dfs.run({
                    startNode: node,
                    task: "dfs",
                    finishOrder: firstOrder
                }, visited, this.steps.length);

                this.addStep(`Second DFS starting at ${dfs.getLabel(node)}`, { 
                    phase: "secondDFS-start",
                    visited: [...visited],
                    inStack: [],
                    neighbours: [],
                    phase: "secondDFS",
                    components: [...components],
                    transposed: true,
                    finishOrder: [...firstOrder],
                    remainingOrder,
                    currentStart: node
                });

                newSteps.forEach(step => {
                    this.steps.push({
                        ...step,
                        phase: "secondDFS",
                        transposed: true,
                        components: [...components],
                        finishOrder: [...firstOrder],
                        remainingOrder,
                        currentStart: node
                    });
                });
                const result = dfs.getResult();
                result.forEach(n => visited.add(n));
                components.push(result);

                remainingOrder = firstOrder.filter(n => !visited.has(n));

                this.steps[this.steps.length - 1].message += 
                    `. New component ${dfs.mapLabels(result)}`;

                this.steps[this.steps.length - 1].components = [...components];
                this.steps[this.steps.length - 1].remainingOrder = remainingOrder;

                this.moments = [...this.moments, ...dfs.getMoments()];
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
        this.addStep('Transpose graph!', {phase: "transposition", edges: reversedEdges, transposed: true})
        this.moments.push({action: "reverse edges", firstTraversal: firstTraversal, stepIndex: this.steps.length})
        this.components = this.secondDFS(firstTraversal, reversedEdges);

        return {
            steps: this.steps,
            moments: this.moments
        }
    }

    run(params) {
        const { task } = params;

        switch (task) {
            case "kosaraju":
                return this.kosarajuSCC();
        }
    }
}
