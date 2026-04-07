import '../../styles/ButtonPanel.css'
import { useGraph } from '../../contexts/GraphContext';
import AlgorithmVisualizer from '../graphPanel/visualizationLogic/AlgorithmVisualizer';
import { AlgorithmDefinition } from '../../algorithms/definitions';
import { useEffect, useState, useRef } from "react";
import { exportAlgorithmPDF } from '../../pdf/SetPDF';
import QuizModal from "../interactivePanel/quizPanel/QuizModal"

import buildQuiz from '../interactivePanel/buildQuiz'

export function ButtonPanel({params= {}, mode = "explore"}){

    const { nodes, edges, graphConfig, cyRef, algorithm, setNodes } = useGraph();
    const algoDef = AlgorithmDefinition[algorithm];

    const [steps, setSteps] = useState([]);
    const [stepIndex, setStepIndex] = useState(0);
    const visualizer = useRef(null);

    const [playing, setPlaying] = useState(false);
    const canExecute = algoDef && algoDef.canRun(params) && cyRef.current && nodes.length > 0;

    //interactive 
    const isInteractive = mode === "interactive"
    const [questions, setQuestions] = useState([])
    const [activeQuestion, setActiveQuestion] = useState(null)


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
        if (stepIndex >= steps.length) {
            setPlaying(false);
            reset();
            return;
        }

        const id = setTimeout(() => {
            
            if (isInteractive) {
                const q = questions.find(q => q.stepIndex === stepIndex)
                if(q){
                    setActiveQuestion(q)
                    return;
                } 
            }
            setStepIndex(prev => {
                if (prev >= steps.length - 1) {
                    setPlaying(false);
                    return prev; // stay on last valid step
                }
                return prev + 1;
            });
        }, 800);

        return () => clearTimeout(id);

    }, [playing, stepIndex, steps, questions]);

    useEffect(() => {
        setSteps([]);
        setStepIndex(0);
        visualizer.current = null;


        if (!cyRef.current) return;

        cyRef.current.nodes().forEach(node => {
            node.classes("sandbox-node");
        });

    }, [edges, graphConfig, algorithm, params.task]);

    const run = () => {

        if (!algoDef) {
            throw new Error(`Algorithm "${algorithm}" not registered`);
        }

        const algo = new algoDef.AlgorithmClass(nodes, edges, graphConfig); 
        const {steps, moments} = algo.run(params);
        console.log(steps)

        console.log("moments")
        console.log(moments)
        cyRef.current.style(algoDef.style(graphConfig.directed)).update();

        //visualizer.current = null;
        setSteps(steps);
        setStepIndex(0);

        if (isInteractive) {
            const qs = buildQuiz(steps, moments, algoDef.QuizzConfig, edges, params)
            console.log(qs)
            setQuestions(qs)
        }

    }

    const reset = () => {
        setActiveQuestion(null);
        setSteps([]);
        setStepIndex(0);
        setPlaying(false);
        if (isInteractive){
            setQuestions([]);
        }
        visualizer.current = null;

        if (!cyRef.current) return;

        
        cyRef.current.nodes().forEach(node => {
            node.classes("sandbox-node");
        });
        cyRef.current.edges().forEach(node => {
            node.classes("edge");
        });
    };

    const next = () => {
        const nextStep = stepIndex + 1;

        if (isInteractive) {
            const q = questions.find(q => q.stepIndex === nextStep);

            if(q) {
                setActiveQuestion(q);
                return;
            }
        }
        //setStepIndex(i => Math.min(i + 1, steps.length - 1));
        setStepIndex(nextStep);
    }
    const prev = () => {
        setStepIndex(i => Math.max(i - 1, 0));
    }

    const handleAnswer = (isCorrect) => {

        if (isCorrect || !activeQuestion.options) {
            console.log(isCorrect);
            setActiveQuestion(null)
            setStepIndex(i => {
                const next = i + 1
                return Math.min(next, steps.length - 1)
            })

            return;
        }
        console.log("Think againe!")

    }

    return(
        <div className="control-panel">
            <div className="controls">
                
                <button
                    className="primary"
                    onClick={() => {
                        if (steps.length === 0 || stepIndex === steps.length-1) {
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

                {
                    !isInteractive &&
                    <button onClick={prev} disabled={stepIndex === 0}>◀ Prev</button>
                }
                <button onClick={next} disabled={stepIndex === steps.length - 1 || steps.length == 0}>Next ▶</button>
                {/* <button onClick={()=>exportAlgorithmPDF(cyRef, algoDef, steps)} disabled={steps.length == 0}>PDF</button> */}
                {
                    !isInteractive &&
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
                }
                {steps.length > 0 && (<div className="step-indicator">Step {stepIndex + 1} / {steps.length}</div>)}
            </div>

            { steps.length > 0  && <algoDef.DataPanel step={steps[stepIndex]}/>}
            {activeQuestion && (
                <QuizModal
                    question={activeQuestion}
                    onAnswer={handleAnswer}
                    onClose={() => {
                        setActiveQuestion(null)
                        setStepIndex(i => {
                            const next = i + 1
                            return Math.min(next, steps.length - 1)
                        })
                    }}
                />
            )}
        
        </div>
    );
}