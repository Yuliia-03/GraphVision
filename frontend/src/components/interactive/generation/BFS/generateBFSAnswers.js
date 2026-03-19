export default function generateBFSAnswers(questions, steps, edges) {

    function shuffle(arr){
        return [...arr].sort(() => Math.random() - 0.5)
    }

    function uniqueOptions(options){
        const seen = new Set()

        return options.filter(opt => {
            const key = JSON.stringify(opt)
            if(seen.has(key)) return false
            seen.add(key)
            return true
        })
    }

    const before_next_pop_index = (currentIndex) => {
        let end_of_exp = currentIndex;
        while (
            end_of_exp ===1 ||(
            !steps[end_of_exp].message?.startsWith("Pop")
            && !steps[end_of_exp].isFinal
            )) {
            end_of_exp += 1;
        }
        return end_of_exp-1;
    }

    return questions.map(q => {

        const step = steps[q.stepIndex]

        let answer = null
        let options = null
        let answerIndex = 0;

        let distractor1, distractor2, distractor3 = null;

        switch(q.id){

            case 1: // queue_after_processing

                answerIndex = before_next_pop_index(q.stepIndex);
                answer = steps[answerIndex].inQueue || []
                
                distractor1 = q.stepIndex!==1 && answer.length > 1 ? [...answer].reverse() : step.visited
                distractor2 =  answer.length > 1 ? answer.slice(0, answer.length-1) : step.visited.slice(0, answer.length-2)
                distractor3 = [...answer, step.current]
                
                options = shuffle([
                    answer,
                    distractor1,
                    distractor2,
                    distractor3
                ])
                break

            case 2: // discover_nodes
                answerIndex = before_next_pop_index(q.stepIndex);
                const current_step = steps[answerIndex]
                answer = current_step.neighbours.filter(n => current_step.inQueue.includes(n)) || []

                distractor1 = step.visited
                distractor2 =  answer.length > 1 ? answer.slice(0, answer.length-1) : step.visited.slice(0, answer.length-2)
                distractor3 = answer.length > 1 ? answer.slice(1, answer.length) : [...answer, step.current]
                
                options = shuffle([
                    answer,
                    distractor1,
                    distractor2,
                    distractor3
                ])
                break

            case 3: // next_action 
                if(step.inQueue?.length)
                    answer = step.message
                else
                    answer = "BFS terminates"

                distractor1 = step.inQueue?.length ? `Pop ${step.inQueue[step.inQueue.length-1]} from queue. Inspect neighbours of ${step.inQueue[step.inQueue.length-1]}` : `Pop ${step.visited[0]} from queue. Inspect neighbours of ${step.visited[0]}`
                distractor2 = steps[q.stepIndex+1].message
                distractor3 = steps[q.stepIndex+2].message
                
                options = shuffle([
                    answer,
                    distractor1,
                    distractor2,
                    distractor3
                ])
                break

            case 4: // edges_leading_new
                answerIndex = before_next_pop_index(q.stepIndex);
                const all_edges = steps[answerIndex].edges || []
                answer = all_edges?.filter(edge => {

                    const [from, to] = edge.split("-")
                    const neighbour = from == q.data.node ? to : from
                    return !steps[q.stepIndex].visited.includes(neighbour)

                })
                console.log(all_edges, answer)

                const same = JSON.stringify(all_edges) === JSON.stringify(answer)
                console.log(same)
                distractor1 = same ? [] : all_edges
                distractor2 = edges?.filter(n=> n.data.target===q.data.node).map(n=>n.data.id)
                distractor3 = [...distractor2,...answer]
                
                options = uniqueOptions([
                    answer,
                    distractor1,
                    distractor2,
                    distractor3
                ])

                options = shuffle(options)

                break

            case 5: // visited_set
                answerIndex = before_next_pop_index(q.stepIndex);
                answer = steps[answerIndex].visited || []

                distractor1 = steps[q.stepIndex].inQueue
                distractor2 = step.visited.slice(0, answer.length-1) || []
                distractor3 = steps[answerIndex].inQueue
                
                options = shuffle([
                    answer,
                    distractor1,
                    distractor2,
                    distractor3
                ])
                break

            case 6: // valid_traversal
                answer = step.result?.order || []
                break

            case 7: // structural_change
                answer = "Depends on discovery depth"
                break
        }

        return {
            ...q,
            answer,
            options
        }
    })
}