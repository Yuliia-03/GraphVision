import Rules from "./AlgorithmAdapters";

export default class BFSAdapter {

    constructor(){
        this.bfsRules = [
            Rules.isCurrent(),
            Rules.inList("inQueue", "inQueue"),
            Rules.inList("visited", "visited"),
        ]
    }

    getNodeState(nodeId, step) {
        for (const rule of this.bfsRules) {
            if(rule.matces(nodeId, step)){
                return rule.state;
            }
        }
        return "unseen";

    }
}