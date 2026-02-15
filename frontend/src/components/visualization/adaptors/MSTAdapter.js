import {nodeRules, edgeRules} from "./AlgorithmAdapters";

export default class MSTAdaptor {

    constructor(){
        this.mstNodeRules = [
            nodeRules.inList("mstNodes", "connected"),
        ]

        this.mstEdgeRules = [
            edgeRules.activeEdge("currentEdge", "current_edge"),
            edgeRules.activeEdge("mstTree", "mst_tree"),
            //edgeRules.activeEdge("cycle_edge")
        ]
    }

    getNodeState(nodeId, step) {


        for (const rule of this.mstNodeRules) {
            if(rule.matches(nodeId, step)){
                return [rule.state];
            }
        }
        return ["unseen"];

    }

    getEdgeState(edgeId, step) {
        for (const rule of this.mstEdgeRules) {
            if(rule.matches(edgeId, step)){
                return rule.state;
            }
        }
        return "unseen";

    }
}