

import {AlgorithmStates} from "./AlgorithmStates";

export default class AlgorithmVisualizer{

    constructor(cy, adaptor, algorithm) {

        this.algorithmStates = AlgorithmStates[algorithm];
        this.cy =  cy
        this.adaptor = adaptor


        this.setInitStyle()
        
    }

    setInitStyle() {

        this.cy.nodes().forEach(node => {
            node.classes([]);
            node.addClass(this.algorithmStates.nodes.unseen);
        });

    }


    renderStep(step) {

        this.cy.nodes().forEach(node => {
            Object.values(this.algorithmStates.nodes).forEach(cls => {

                //console.log("remove style")
                //console.log(node.id())
                node.removeClass(cls);
            });
        })
        this.cy.edges().forEach(edge => {
            Object.values(this.algorithmStates.edges).forEach(cls => {
                edge.removeClass(cls);
            });
        })

        this.cy.nodes().forEach(node => {

            const nodeId = node.id();
            // const state = this.adaptor.getNodeState(nodeId, step);
            
            // const className = this.algorithmStates.nodes[state];
            // if (className) {
            //     //console.log(node.id(), className)
            //     node.addClass(className);
            // }

            const states = this.adaptor.getNodeState(nodeId, step);

            states.forEach(state => {
                const className = this.algorithmStates.nodes[state];
                if (className) {
                    node.addClass(className);
                }
            });

        })

        this.cy.edges().forEach(edge => {

            const edgeId = edge.id();
            const state = this.adaptor.getEdgeState(edgeId, step);

            
            const className = this.algorithmStates.edges[state];
            if (className) {
                edge.addClass(className);
            }

        })

    }
}