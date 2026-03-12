
import {nodeRules, edgeRules} from "./AlgorithmAdapters";
import DFSAdapter from "./DFSAdapter";

export default class SCCAdapter {

    constructor(){
        this.dfsAdapter = new DFSAdapter()
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

    transposeGraph(){

        this.cy.edges().forEach(edge => {

            const source = edge.source().id()
            const target = edge.target().id()

            edge.move({
                source: target,
                target: source
            })

        })
    }

    getNodeState(nodeId, step) {

        const states = []

        if(step.type === 2){
            return ["unseen"];
        }

        return this.dfsAdapter.getNodeState(nodeId, step);

    }
    
    getEdgeState(edgeId, step) {

        if(step.type === 2){
            return "unactive";
        }

        return this.dfsAdapter.getEdgeState(edgeId, step);

    }
}