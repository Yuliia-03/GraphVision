import GraphViewer from "../../graphPanel/Sandbox/GraphViewer";
import QuestionSection from "./QuestionSection";
import "../../../styles/questionsModal/Quiz.css"
import { useRef, useEffect } from "react";
import { useGraph } from "../../../contexts/GraphContext";

export default function QuizModal({ question, step, onAnswer, onClose  }) {

    const modalCyRef = useRef(null);
    
        const {graphConfig } = useGraph();

    useEffect(() => {
        if (!modalCyRef.current || !step) return;

        const cy = modalCyRef.current;

        cy.edges().forEach(edge => {
            if (step.transposed) {
                edge.style({
                    "source-arrow-shape": "triangle",
                    "target-arrow-shape": "none"
                });
            } else if (graphConfig.directed){
                edge.style({
                    "source-arrow-shape": "none",
                    "target-arrow-shape": "triangle"
                });
            }
        });

    }, [step]);

    return (
        <div className="quiz-popup">
            <div className="quiz-window">
                <button className="quiz-close-btn" onClick={onClose}>
                    ×
                </button>
                <div className="quiz-layout">
                    <div className="left">
                        <GraphViewer externalCyRef={modalCyRef} />
                    </div>
                    <div className="right">
                        <QuestionSection  question={question} onAnswer={onAnswer}  />
                    </div>
                </div>
            </div>
        </div>
    );
}