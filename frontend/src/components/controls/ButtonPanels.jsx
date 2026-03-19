import '../../styles/ButtonPanel.css'
import { useGraph } from '../../contexts/GraphContext';
import AlgorithmVisualizer from '../visualization/AlgorithmVisualizer';
import { AlgorithmDefinition } from '../../algorithms/definitions';
import { useEffect, useState, useRef } from "react";
import { exportAlgorithmPDF } from '../../pdf/SetPDF';

export function ButtonPanel({params= {}}){

    const { nodes, edges, graphConfig, cyRef, algorithm, setNodes } = useGraph();
    const algoDef = AlgorithmDefinition[algorithm];

    const [steps, setSteps] = useState([]);
    const [stepIndex, setStepIndex] = useState(0);
    const visualizer = useRef(null);

    const [playing, setPlaying] = useState(false);

    const canExecute = algoDef && algoDef.canRun(params) && cyRef.current && nodes.length > 0;

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

    useEffect(() => {
        if (!playing) return;
        if (stepIndex >= steps.length - 1) {
            setPlaying(false);
            return;
        }

        const id = setTimeout(() => {
            setStepIndex(i => i + 1);
        }, 800);

        return () => clearTimeout(id);

    }, [playing, stepIndex, steps]);

    useEffect(() => {
        setSteps([]);
        setStepIndex(0);
        visualizer.current = null;


        if (!cyRef.current) return;

        cyRef.current.nodes().forEach(node => {
            node.classes("sandbox-node");
        });
        cyRef.current.edges().forEach(node => {
            node.classes("edge");
        });
        // console.log("call")

    }, [edges, graphConfig, algorithm, params.task]);

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

    const reset = () => {
        setSteps([]);
        setStepIndex(0);
        visualizer.current = null;

        if (!cyRef.current) return;

        
        cyRef.current.nodes().forEach(node => {
            node.classes("sandbox-node");
        });
    };

    const next = () => {
        setStepIndex(i => Math.min(i + 1, steps.length - 1));
    }
    const prev = () => {
        setStepIndex(i => Math.max(i - 1, 0));
    }

    return(
        <div className="control-panel">
            <div className="controls">
                
                <button
                    className="primary"
                    onClick={() => {
                        if (steps.length === 0 || stepIndex === steps.length-1) {
                            console.log("run"); 
                            run(); 
                        } 
                        //console.log(!steps);
                        setPlaying(p => !p)
                    }}
                    disabled={!canExecute}
                >
                    {playing ? "⏸ Pause" : "▶ Play"}
                </button>

                <button onClick={reset} disabled={steps.length === 0}>
                    ⟲ Reset
                </button>

                <button onClick={prev} disabled={stepIndex === 0}>◀ Prev</button>
                <button onClick={next} disabled={stepIndex === steps.length - 1 || steps.length == 0}>Next ▶</button>
                {/* <button onClick={()=>exportAlgorithmPDF(cyRef, algoDef, steps)} disabled={steps.length == 0}>PDF</button> */}
                <button
                    onClick={() =>
                        exportAlgorithmPDF(
                        algoDef,
                        nodes,
                        edges,
                        graphConfig,
                        steps
                        )
                    }
                    disabled={steps.length === 0}>
                        PDF
                </button>
                {steps.length > 0 && (<div className="step-indicator">Step {stepIndex + 1} / {steps.length}</div>)}
            </div>

            { steps.length > 0  && <algoDef.DataPanel step={steps[stepIndex]}/>}
        
        </div>
    );
}