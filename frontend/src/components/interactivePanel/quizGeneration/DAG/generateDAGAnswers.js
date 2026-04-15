export default function generateDAGAnswers(questions, steps, moments, edges) {

    const shuffle = (arr) =>
        [...arr].sort(() => Math.random() - 0.5);

    const unique = (arr) => {
        const seen = new Set();
        return arr.filter(x => {
            const k = JSON.stringify(x);
            if (seen.has(k)) return false;
            seen.add(k);
            return true;
        });
    };

    return questions.map(q => {

        const m = moments[q.momentIndex];
        const next = moments[q.momentIndex + 1];
        const prev = moments[q.momentIndex - 1];

        let answer = null;
        let options = [];

        switch (q.id) {

            case 1: {
                answer = next && next.type != "backtrack" ? next.currentNode : `No further nodes to explore from ${m.currentNode}`;
                answer = next.type != "cycleDetected"? answer : "Cycle detected, no further nodes to explore"

                const distractors = [
                    ...(m.recStack || []),
                    ...(m.visited || [])
                ].filter(n => n !== answer);


                options = shuffle(unique([
                    answer,
                    distractors[0],
                    distractors[1],
                    `No further nodes to explore from ${m.currentNode}`,
                    "Cycle detected, no further nodes to explore",
                    ...edges.filter(e=> e.data.source == m.currentNode).map(e=> e.data.target),
                ]));

                break;
            }

            case 2: {
                answer = next?.recStack || [];
                const neighbours = edges.filter(e=> e.data.source == m.currentNode).map(e=> e.data.target)
                console.log(neighbours)
                options = shuffle(unique([
                    answer,
                    m.recStack,               
                    [...new Set((m.recStack || []).slice(1))], 
                    [...neighbours],
                    []                           
                ]));

                break;
            }
            case 3: {
                answer = next?.visited || [];
                answer = next.type != "cycleDetected"? answer : "Cycle detected, no further nodes to explore"


                const neighbours = edges.filter(e=> e.data.source == m.currentNode).map(e=> e.data.target)
                console.log(neighbours)
                options = shuffle(unique([
                    answer,
                    [...new Set(m.visited)],
                    [...new Set((m.visited || []).slice(0, -1))],
                    [...new Set(m.visited.concat(neighbours))],
                    []
                ]));

                break;
            }
            case 10: {
                const neighbours = m.neighbours || [];
                const visitedSet = new Set(m.visited || []);

                answer = neighbours.filter(n => !visitedSet.has(n));
                answer = next.type != "cycleDetected"? answer : "Cycle detected, no further nodes to explore"
                const distractor1 = answer ? edges.filter(e => e.data.source == answer[0]).map(e=> e.data.target) : []

                options = shuffle(unique([
                    answer,
                    [...new Set(neighbours ?? [])],
                    [],
                    [...new Set(m.visited ?? [])],
                    [...new Set(m.visited.slice(0, -1)?? [])],
                    [...new Set(m.visited.slice(0, -2)?? [])],
                    [...new Set(distractor1 ?? [])],
                    [...new Set(answer, distractor1?? [])]
                ]));

                break;
            }

            case 4: {
                answer = `Backtrack: pop node ${m.currentNode} from the recursion stack`;
                if (next) {
                    if (next.currentNode) {
                    answer += ` and continue with node ${next.currentNode}`
                    } else {
                        answer += ` and terminate, since the stack is empty`
                    }
                }

                options = [
                    answer,

                    `Add ${m.currentNode} to the recursive stack`,
                    `Remove node ${m.currentNode} from the set of visited nodes`,
                    "Restart DFS from another node, that is not visited yet"
                ];

                break;
            }

            case 5: {
                answer = m.recStack || [];

                options = shuffle(unique([
                    answer,
                    next?.recStack,
                    (m.recStack || []).slice(0, -1),
                    (next?.recStack || []).slice(0, -1),
                    [],
                    [m.currentNode]
                ]));

                break;
            }
            case 6: {
                answer = m.topoOrder || [];

                options = shuffle(unique([
                    answer,
                    [...m.currentNode, ...answer.slice(0, -1)],
                    [...new Set(next?.topoOrder || [])],
                    [...new Set((m.topoOrder || []).concat([m.currentNode]))],
                    answer.slice(0, -1),
                    []
                ]));

                break;
            }

            
            case 7: {
                answer = "A cycle exists (back edge detected)";

                options = [
                    answer,
                    "Graph is still acyclic",
                    "Node will be skipped",
                    "DFS will restart"
                ];

                break;
            }

            
            case 8: {
                const distractors = [
                    "Report a cycle and terminate the traversal",
                    "Continue DFS with other neighbours",
                    "Remove the node from the recursion stack and continue",
                    "Mark the node as visited again"
                ];
                answer = distractors[0]
                options = [
                    distractors[0],
                    distractors[1],
                    distractors[2],
                    distractors[3]
                ];

                break;
            }
            case 9: {
                const topo = m.topoOrder || [];
                answer = [...topo].reverse();

                options = shuffle(unique([
                    answer,
                    topo,
                    topo.slice(1),
                    []
                ]));

                break;
            }

            default:
                answer = "Unknown";
                options = ["Unknown"];
        }

        return {
            ...q,
            answer,
            options: shuffle(options)
        };
    });
}