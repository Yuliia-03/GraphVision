
import {nodeRules, edgeRules} from "./AlgorithmAdapters";

export default class SCCAdapter {

    constructor(){
        this.sccNodeRules = [
            nodeRules.inList("neighbours", "neighbours"),
            nodeRules.inList("topoOrder", "visited"),
            nodeRules.inList("inStack", "inStack"),
            //nodeRules.isCurrent(),
        ]

        this.sccEdgeRules = [
            edgeRules.activeEdge("neighbours", "neighbours"),
        ]
    }

    getNodeState(nodeId, step) {

        const states = []

        if (nodeRules.isCurrent().matches(nodeId, step)) {
            return ["current"];
        }

        for (const rule of this.sccNodeRules) {
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
        for (const rule of this.sccEdgeRules) {
            if(rule.matches(edgeId, step)){
                return rule.state;
            }
        }
        return "unactive";

    }
}