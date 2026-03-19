export default function buildQuiz(steps, generators, edges){

    const { generateQuestions, generateAnswers } = generators
    const questions = generateQuestions(steps)
    
    // return questions

    const questionsWithAnswers =
        generateAnswers(questions, steps, edges)

    return questionsWithAnswers
}