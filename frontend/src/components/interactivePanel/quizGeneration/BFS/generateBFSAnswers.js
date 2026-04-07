
function generateBFSQuizOptions(allTraversals) {
    const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

    const correctOption = shuffle(allTraversals).slice(0, 3);
    const distractors = [];

    while (distractors.length < 3) {
        // Pick 2–3 sequences from valid ones
        const option = shuffle(allTraversals).slice(0, 3).map(seq => [...seq]);

        // Introduce an invalid sequence randomly
        const randIndex = Math.floor(Math.random() * option.length);
        const lastNode = option[randIndex][option[randIndex].length - 1];
        
        // Swap two nodes to break BFS validity
        const newSeq = [...option[randIndex]];
        if (newSeq.length > 1) {
            [newSeq[0], newSeq[newSeq.length - 1]] = [newSeq[newSeq.length - 1], newSeq[0]];
            option[randIndex] = newSeq;
        }

        distractors.push(option);
    }

    
    const options = shuffle([correctOption, ...distractors]);

    return {correctAnswer: correctOption,
            allOptions: options
    }
}



export default function generateBFSAnswers(questions, steps, moments, edges) {

    const shuffle = (arr) =>
        [...arr].sort(() => Math.random() - 0.5)

    const uniqueOptions = (options) => {
        const seen = new Set()
        return options.filter(opt => {
            const key = JSON.stringify(opt)
            if (seen.has(key)) return false
            seen.add(key)
            return true
        })
    }

    return questions.map(q => {

        const step = steps[q.stepIndex]
        const moment = moments[q.momentIndex]

        let answer = null
        let options = null

        if (!moment && q.id !== 6) {
            return { ...q, answer: null, options: null }
        }

        const queueAfter = moment
            ? [...moment.queueAfter]
            : []

        let distractor1, distractor2, distractor3

        switch(q.id){

            case 1: // queue_after_processing
                answer = queueAfter

                distractor1 = [...answer].reverse()
                distractor2 = answer.slice(0, -1)
                distractor3 = [...moment.queueBefore]
                const newNodes = moment.allNeighbours.map(e=>[e])

                options = shuffle(uniqueOptions([
                    answer,
                    distractor1,
                    distractor2,
                    distractor3,
                    ...newNodes
                ]))
                break

            case 2:
                answer = moment.discovered;

                distractor1 = moment.visitedBefore; 
                distractor2 = [...answer].slice(1); 
                distractor3 = [...answer, moment.node]; 

                options = shuffle(uniqueOptions([answer, distractor1, distractor2, distractor3]));
                break;

            case 3: // next_action
                
                if (moment.queueAfter.length > 0) {
                    answer = `Pop ${moment.queueAfter[0]} from queue`;
                    
                    const neighbors = edges
                        .filter(e => e.data.source === moment.queueAfter[0])
                        .map(e => e.data.target);
                    
                    distractor2 = neighbors.map(e => `Inspect edge ${moment.queueAfter[0]}-${e}`);
                
                } else {
                    answer = "BFS terminates";

                    const neighbors = edges
                        .filter(e => e.data.source === moment.node)
                        .map(e => e.data.target);
                    
                    distractor2 = neighbors.map(e => `Inspect edge ${moment.node}-${e}`);
                
                }

                distractor1 = `Pop ${moment.queueAfter[moment.queueAfter.length-1] || moment.node} from queue`;
                distractor3 = moment.queueBefore.length > 1 ? `Pop ${moment.queueBefore[1]} from queue` : "BFS terminates";
                const currentNode = `Pop ${moment.node} from queue`;
                options = shuffle(uniqueOptions([answer, distractor1, ...distractor2, distractor3, currentNode]));
                break;

            case 4: // edges that lead to a new nodes
                answer = moment.edgesLeadingToNew;

                const edgesFromCurrent = edges.filter(e => e.data.source === moment.node).map(e => e.data.id);
                
                distractor1 = edges.filter(e => e.data.target === moment.node).map(e => e.data.id);
                distractor2 = edgesFromCurrent.filter(e => !answer.includes(e));
                distractor3 = edgesFromCurrent;

                const splitAnswer = answer.map(e => [e]);
                const splitTo = distractor1.length > 1 ? distractor1.map(e => [e]) : [];
                const splitFrom = edgesFromCurrent.length > 1 ? edgesFromCurrent.map(e => [e]) : [];
                
                options = shuffle(uniqueOptions([
                    answer,
                    distractor1,
                    distractor2,
                    distractor3,
                    ...splitAnswer,
                    ...splitTo,
                    ...splitFrom,
                    [],
                ]));
                break;
            case 5: // visited_set

                answer = [...moment.visitedAfter];

                distractor1 = moment.visitedBefore;
                distractor2 = moment.discovered;
                distractor3 = moment.queueBefore;

                options = shuffle(uniqueOptions([answer, distractor1, distractor2, distractor3]));
                break;
            case 6: // valid_traversal
                
                const allValidTraversals = step.result?.allTraversals || [];

                const {correctAnswer, allOptions} = generateBFSQuizOptions(allValidTraversals);
                answer = correctAnswer
                options = shuffle(uniqueOptions([allOptions]));
                break;

            case 7: 
                answer = "Depends on BFS level structure"
                options = null
                break
        }

        return {
            ...q,
            answer,
            options
        }
    })
}
