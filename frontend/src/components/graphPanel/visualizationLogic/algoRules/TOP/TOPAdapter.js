import {nodeRules, edgeRules} from "../AlgorithmAdapters";

export default class dagAdapter {

    constructor(){
        this.dagNodeRules = [

            nodeRules.inList("cycle", "cycle"),
            nodeRules.inList("neighbours", "neighbours"),
            nodeRules.inList("final", "final"),
            nodeRules.inList("topoOrder", "visited"),
            nodeRules.inList("inStack", "inStack"),

            nodeRules.inList("final", "final"),
            //nodeRules.isCurrent(),
        ]

        this.dagEdgeRules = [
            edgeRules.activeEdge("edges", "neighbours"),
        ]
    }

    getNodeState(nodeId, step) {

        const states = []

        if (nodeRules.isCurrent().matches(nodeId, step)) {
            return ["current"];
        }

        for (const rule of this.dagNodeRules) {
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
        for (const rule of this.dagEdgeRules) {
            if(rule.matches(edgeId, step)){
                return rule.state;
            }
        }
        return "unactive";

    }
}