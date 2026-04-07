import generateMSTQuestions from "./generateMSTQuestions"
import generateMSTAnswers from "./generateMSTAnswers"

export const kruskalMstQuizConfig = {
    generateQuestions: (steps, moments) => generateMSTQuestions(steps, moments, "kruskals"),
    generateAnswers: generateMSTAnswers
}

export const primsMstQuizConfig = {
    generateQuestions: (steps, moments) => generateMSTQuestions(steps, moments, "prims"),
    generateAnswers: generateMSTAnswers
}