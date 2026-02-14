import {nodeRules, edgeRules} from "./AlgorithmAdapters";

export default class BFSAdapter {

    constructor(){
        this.bfsNodeRules = [
            nodeRules.isCurrent(),
            nodeRules.inList("neighbours", "neighbours"),
            nodeRules.inList("inQueue", "inQueue"),
            nodeRules.inList("visited", "visited"),
        ]

        this.bfsEdgeRules = [
            edgeRules.activeEdge("neighbours", "neighbours"),
        ]
    }

    getNodeState(nodeId, step) {
        for (const rule of this.bfsNodeRules) {
            if(rule.matches(nodeId, step)){
                return rule.state;
            }
        }
        return "unseen";

    }
    getEdgeState(edgeId, step) {
        for (const rule of this.bfsEdgeRules) {
            if(rule.matches(edgeId, step)){
                return rule.state;
            }
        }
        return "unactive";

    }
}