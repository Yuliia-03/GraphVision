export default function buildQuiz(steps, moments, generators, edges, params) {
    const config =
        typeof generators === "function"
            ? generators(params)
            : generators;

    const { generateQuestions, generateAnswers } = config;

    const questions = generateQuestions(steps, moments);
    return generateAnswers(questions, steps, moments, edges);
}