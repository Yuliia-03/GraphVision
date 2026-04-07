import {nodeRules, edgeRules} from "../AlgorithmAdapters";

export default class DFSAdapter {

    constructor(){
        this.dfsNodeRules = [
            nodeRules.inList("neighbours", "neighbours"),
            nodeRules.inList("inStack", "inStack"),
            nodeRules.inList("visited", "visited"),
            nodeRules.inList("reached", "final"),
        ]

        this.dfsEdgeRules = [
            edgeRules.activeEdge("edges","neighbours"),
        ]
    }

    getNodeState(nodeId, step) {
        const states = []

        if (nodeRules.isCurrent().matches(nodeId, step)) {
            return ["current"];
        }

        for (const rule of this.dfsNodeRules) {
            if(rule.matches(nodeId, step)){
                states.push(rule.state);
            }
        }
        
        if (states.length === 0) {
            states.push("unseen");
        }

        return states;

    }

    getEdgeState(edgeId, step) {

        if (step.isFinal && step.result?.treeEdges) {
            return step.result.treeEdges.includes(edgeId)
                ? "finalTree"
                : "ignored";
        }

        for (const rule of this.dfsEdgeRules) {
            if(rule.matches(edgeId, step)){
                return rule.state;
            }
        }
        return "unactive";

    }
}