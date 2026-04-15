
import {nodeRules, edgeRules} from "../AlgorithmAdapters";
import DFSAdapter from "../DFS/DFSAdapter";

export default class SCCAdapter {

    constructor(){
        this.dfsAdapter = new DFSAdapter()
        this.sccNodeRules = [
            nodeRules.inList("neighbours", "neighbours"),
            nodeRules.inList("topoOrder", "visited"),
            nodeRules.inList("inStack", "inStack"),
        ]

        this.sccEdgeRules = [
            edgeRules.activeEdge("neighbours", "neighbours"),
        ]
    }

    getNodeState(nodeId, step) {

        const states = [];

        if(step.type === 2){
            return ["unseen"];
        }

        if((step.phase === "secondDFS" || step.phase === "result") && step.components) {
            step.components.forEach((component, index) => {
                if(component.includes(String(nodeId))) {
                    states.push(`component-${index}`);
                    console.log(`component-${index}`)
                }
            });
        }

        return [...states, ...this.dfsAdapter.getNodeState(nodeId, step)];
    }
    
    getEdgeState(edgeId, step) {

        if(step.type === 2){
            return "unactive";
        }

        return this.dfsAdapter.getEdgeState(edgeId, step);

    }
}