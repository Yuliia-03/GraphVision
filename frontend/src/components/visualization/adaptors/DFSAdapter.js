import {nodeRules, edgeRules} from "./AlgorithmAdapters";

export default class DFSAdapter {

    constructor(){
        this.dfsNodeRules = [
            nodeRules.isCurrent(),
            nodeRules.inList("neighbours", "neighbours"),
            nodeRules.inList("inStack", "inStack"),
            nodeRules.inList("visited", "visited"),
        ]

        this.dfsEdgeRules = [
            edgeRules.activeEdge("neighbours","neighbours"),
        ]
    }

    getNodeState(nodeId, step) {
        for (const rule of this.dfsNodeRules) {
            if(rule.matches(nodeId, step)){
                return rule.state;
            }
        }
        return "unseen";

    }
    getEdgeState(edgeId, step) {
        for (const rule of this.dfsEdgeRules) {
            if(rule.matches(edgeId, step)){
                return rule.state;
            }
        }
        return "unactive";

    }
}