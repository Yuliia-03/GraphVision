import { useState } from "react";
import "../../../styles/questionsModal/QuestionSection.css";

export default function QuestionSection({question,onAnswer}){

    const [selected, setSelected] = useState();
    const [showHint, setShowHint] = useState(false);
    const [feedback, setFeedback] = useState(null);

    const isArray = (array) => Array.isArray(array);

    const handleSubmit = () => {
        const isCorrect = selected === question.answer;

        if (!isCorrect) {
            setFeedback("❌ Incorrect. Try again!");
            return;
        }

        setFeedback(null);
        onAnswer(true);
    };

    return(


        <div className="question-section">

            <h4>{question.text}</h4>

            <form>
                {question.options?.map((opt, i) => 
                    <label key={i}>
                        <input type="radio" name="option" onChange={() => setSelected(opt)}/>
                        {isArray(opt)
                            ? opt.length > 0
                                ? opt.join(', ')
                                : "(No options)"
                            : opt
                        }
                    </label>
                )}

            </form>

            <div className="quiz-actions">
                <span
                    className="hint-toggle"
                    onClick={() => setShowHint(prev => !prev)}
                >
                    💡 {showHint ? "Hide hint" : "Show hint"}
                </span>

                {showHint && (
                    <div className="hint-box">
                        {question.hint}
                    </div>
                )}

                {feedback && (
                    <div className="feedback error">
                        {feedback}
                    </div>
                )}

                <button onClick={handleSubmit}>
                    Continue
                </button>
            </div>

        </div>

    )
}