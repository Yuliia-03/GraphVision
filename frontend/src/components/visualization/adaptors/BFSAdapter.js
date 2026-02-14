import {nodeRules, edgeRules} from "./AlgorithmAdapters";

export default class BFSAdapter {

    constructor(){
        this.bfsNodeRules = [
            nodeRules.inList("neighbours", "neighbours"),
            nodeRules.inList("visited", "visited"),
            nodeRules.inList("inQueue", "inQueue"),
            //nodeRules.isCurrent(),
        ]

        this.bfsEdgeRules = [
            edgeRules.activeEdge("neighbours", "neighbours"),
        ]
    }

    getNodeState(nodeId, step) {

        const states = []

        if (nodeRules.isCurrent().matches(nodeId, step)) {
            return ["current"];
        }
        
        for (const rule of this.bfsNodeRules) {
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
        for (const rule of this.bfsEdgeRules) {
            if(rule.matches(edgeId, step)){
                return rule.state;
            }
        }
        return "unactive";

    }
}