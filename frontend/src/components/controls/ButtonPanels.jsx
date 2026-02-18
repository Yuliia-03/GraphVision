import '../../styles/ButtonPanel.css'
import { useGraph } from '../../contexts/GraphContext';
import AlgorithmVisualizer from '../visualization/AlgorithmVisualizer';
import { AlgorithmDefinition } from '../../algorithms/definitions';
import { useEffect, useState, useRef } from "react";

export function ButtonPanel({params= {}}){

    const { nodes, edges, graphConfig, cyRef, algorithm } = useGraph();
    const algoDef = AlgorithmDefinition[algorithm];

    const [steps, setSteps] = useState([]);
    const [stepIndex, setStepIndex] = useState(0);
    const visualizer = useRef(null);

    useEffect(() => {
        if (!steps.length) return;

        if (!visualizer.current) {
            visualizer.current = new AlgorithmVisualizer(
                cyRef.current,
                new algoDef.AdapterClass(),
                algoDef.id
            );
        }

        visualizer.current.renderStep(steps[stepIndex]);

    }, [stepIndex, steps]);

    const run = () => {


        if (!algoDef) {
            throw new Error(`Algorithm "${algorithm}" not registered`);
        }

        const algo = new algoDef.AlgorithmClass(nodes, edges, graphConfig); 
        const steps = algo.run(params);
        console.log(steps)
        cyRef.current.style(algoDef.style(graphConfig.directed)).update();

        visualizer.current = null;
        setSteps(steps);
        setStepIndex(0);

    }

    const next = () => {
        setStepIndex(i => Math.min(i + 1, steps.length - 1));
    }
    const prev = () => {
        setStepIndex(i => Math.max(i - 1, 0));
    }

    return(
        <div className="control-panel">
            <div className="controls">
                <button className="primary" onClick={() => {run()}} disabled={!algoDef.canRun(params)}
                    title={!algoDef.canRun(params) ? "Select required parameters to run this algorithm" : ""}> 
                    ▶ Run
                </button>

                <button disabled>
                    ⏸ Pause
                </button>

                <button onClick={prev} disabled={stepIndex === 0}>◀ Prev</button>
                <button onClick={next} disabled={stepIndex === steps.length - 1}>Next ▶</button>
                {steps.length > 0 && (<div className="step-indicator">Step {stepIndex + 1} / {steps.length}</div>)}
            </div>

            { steps.length > 0  && <algoDef.DataPanel step={steps[stepIndex]}/>}
        
        </div>
    );
}