import generateDAGQuestions from "./generateDAGQuestions"
import generateDAGAnswers from "./generateDAGAnswers"

export const DAGQuizConfig = (algo = "dag") => ({
    generateQuestions: (steps, moments) =>
        generateDAGQuestions(steps, moments, algo),

    generateAnswers: generateDAGAnswers
});