import GraphViewer from "../../graphPanel/Sandbox/GraphViewer";
import QuestionSection from "./QuestionSection";
import "../../../styles/questionsModal/Quiz.css"

export default function QuizModal({ question, onAnswer, onClose  }) {
    return (
        <div className="quiz-popup">
            <div className="quiz-window">
                <button className="quiz-close-btn" onClick={onClose}>
                    ×
                </button>
                <div className="quiz-layout">
                    <div className="left">
                        <GraphViewer />
                    </div>
                    <div className="right">
                        <QuestionSection  question={question} onAnswer={onAnswer}  />
                    </div>
                </div>
            </div>
        </div>
    );
}