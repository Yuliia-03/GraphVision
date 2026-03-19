import GraphViewer from "../../components/graph/GraphViewer";
import QuestionSection from "./QuestionSection";
import "../../styles/questionsModal/Quiz.css"

export default function QuizModal({ question, onAnswer }) {
    return (
        <div className="quiz-popup">
            <div className="quiz-window">
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