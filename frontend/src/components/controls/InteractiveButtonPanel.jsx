import '../../styles/ButtonPanel.css'
import { useState, useEffect, useRef } from "react"
import { useGraph } from "../../contexts/GraphContext"
import { AlgorithmDefinition } from "../../algorithms/definitions"
import AlgorithmVisualizer from "../visualization/AlgorithmVisualizer"
import QuizModal from "../interactive/QuizModal"
import buildQuiz from '../interactive/buildQuiz'

export default function InteractiveButtonPanel({params={}}){

    const { nodes, edges, graphConfig, cyRef, algorithm } = useGraph()
    const algoDef = AlgorithmDefinition[algorithm]

    const [steps, setSteps] = useState([]);
    const [stepIndex, setStepIndex] = useState(0);
    const visualizer = useRef(null);

    const [questions,setQuestions] = useState([])
    const [activeQuestion,setActiveQuestion] = useState(null)

    const [playing, setPlaying] = useState(false);
    const canExecute = algoDef && algoDef.canRun(params) && cyRef.current && nodes.length > 0;


    useEffect(()=>{

        if(!steps.length) return

        if(!visualizer.current){

            visualizer.current = new AlgorithmVisualizer(
                cyRef.current,
                new algoDef.AdapterClass(),
                algoDef.id
            )

        }

        visualizer.current.renderStep(steps[stepIndex])

    },[stepIndex,steps])

    useEffect(() => {
        if (!playing) return;
        if (stepIndex >= steps.length - 1) {
            setPlaying(false);
            return;
        }

        const id = setTimeout(() => {
            // setStepIndex(i => i + 1);
            const nextStep = stepIndex + 1
            const q = questions.find(q => q.stepIndex === nextStep)

            if(q){
                setActiveQuestion(q)
            }else{
                setStepIndex(nextStep)
            }
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

        const algo = new algoDef.AlgorithmClass(nodes,edges,graphConfig)
        const steps = algo.run(params)
        console.log(steps)
        cyRef.current.style(algoDef.style(graphConfig.directed)).update();


        setSteps(steps)
        setStepIndex(0)

        const qs = buildQuiz(steps, algoDef.QuizzConfig, edges)
        console.log(qs)
        setQuestions(qs)

    }

    const reset = () => {
        setSteps([]);
        setQuestions([]);
        setStepIndex(0);
        visualizer.current = null;

        if (!cyRef.current) return;

        
        cyRef.current.nodes().forEach(node => {
            node.classes("sandbox-node");
        });
    };

    const next = () => {

        const nextStep = stepIndex + 1

        const q = questions.find(q => q.stepIndex === nextStep)

        if(q){
            setActiveQuestion(q)
        }else{
            setStepIndex(nextStep)
        }
    }

    const handleAnswer = (isCorrect) => {

        if (isCorrect || !activeQuestion.options) {
            console.log(isCorrect);
            setActiveQuestion(null)
            setStepIndex(i => i + 1)
            return;
        }
        console.log("Think againe!")

    }

    return(

        <div className="control-panel">
            <div className="controls">

            <button 
                className="primary"
                onClick={() => {if (steps.length === 0 || stepIndex === steps.length-1) {
                                console.log("run"); 
                                run(); 
                                } 
                            setPlaying(p => !p)
                        }}
                        disabled={!canExecute}
                >
                {playing ? "⏸ Pause" : "▶ Play"}
            </button>

            <button onClick={reset} disabled={steps.length === 0}>
                ⟲ Reset
            </button>

            <button
                onClick={next}
                disabled={!steps.length || stepIndex === steps.length-1}
            >
                Next ▶
            </button>

                {steps.length > 0 && (<div className="step-indicator">Step {stepIndex + 1} / {steps.length}</div>)}

            </div>
            { steps.length > 0  && <algoDef.DataPanel step={steps[stepIndex]}/>}
        

            {activeQuestion && (
                <QuizModal
                    question={activeQuestion}
                    onAnswer={handleAnswer}
                />
            )}

        </div>

    )
}