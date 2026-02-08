import '../../styles/Control.css'
import { useGraph } from '../../contexts/GraphContext';
import AlgorithmVisualizer from '../visualization/AlgorithmVisualizer';
import {bfsStyle} from "../../visualizationStyle/bfsStyle"

import { useEffect, useState } from "react";

export function ButtonPanel({params, algorithm, adapter}){
    const { nodes, edges, graphConfig, cyRef } = useGraph();

    const [steps, setSteps] = useState([]);
    const [stepIndex, setStepIndex] = useState(0);

    useEffect(() => {
        if (!steps.length) return;

        const visualizer = new AlgorithmVisualizer(
            cyRef.current,
            new adapter(),
            "BFS"
        );

        visualizer.renderStep(steps[stepIndex]);
    }, [stepIndex, steps]);

    const run = () => {
        const algo = new algorithm(nodes, edges, graphConfig); 
        const steps = algo.run(params);
        console.log(steps)
        cyRef.current.style(bfsStyle(graphConfig.directed)).update();

        setSteps(steps);
        setStepIndex(0);

        // const visualizer = new AlgorithmVisualizer(
        //     cyRef.current,
        //     new adapter(),
        //     "BFS"
        // );
        // visualizer.renderStep(steps[9]);

        // console.log("Steps:", steps);
    }

    const next = () => {
        setStepIndex(i => Math.min(i + 1, steps.length - 1));
    }
    const prev = () => {
        setStepIndex(i => Math.max(i - 1, 0));
    }

    return(
        <>
        
            <button onClick={() => {run()}}>
                Run
            </button>

            <button>Pause</button>
            <button onClick={() => next()}>Next Step</button>
            <button onClick={() => prev()}>Previous Step</button>

        
        </>
    );
}