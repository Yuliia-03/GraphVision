import { Rules } from "./AlgorithmAdapters";

export default class DFSAdapter{

    constructor(){
        this.dfsRules = [
            Rules.isCurrent(),
            Rules.inList("inStack", "inStack"),
            Rules.inList("visited", "visited")
        ]
    }


    getNodeState(nodeId, step) {

        for (const rule of this.dfsRules) {
            if (rule.matches(nodeId, step)) return rule.state;
        }
        return "unseen";

    }
}