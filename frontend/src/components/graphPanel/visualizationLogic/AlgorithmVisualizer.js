

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

            const states = this.adaptor.getNodeState(nodeId, step);

            states.forEach(state => {
                const className = this.algorithmStates.nodes[state];
                if (className) {
                    node.addClass(className);
                }
            });

        })
        
        this.cy.edges().forEach(edge => {

            if (step.transposed) {
                edge.style({
                    "source-arrow-shape": "triangle",
                    "target-arrow-shape": "none"
                });
            } 
            else if (step.message == "SCC result" || step.phase== "firstDFS"){
                edge.style({
                    "source-arrow-shape": "none",
                    "target-arrow-shape": "triangle"
                });
            }
        });


        this.cy.edges().forEach(edge => {

            const source = edge.source().id();
            const target = edge.target().id();

            let edgeId = `${source}-${target}`;

            if (step.transposed) {
                edgeId = `${target}-${source}`;
            }


            const state = this.adaptor.getEdgeState(edgeId, step);

            
            const className = this.algorithmStates.edges[state];
            if (className) {
                edge.addClass(className);
            }

        })

    }
}