export default function generateMSTAnswers(questions, steps, moments, edges) {

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

        let answer = null;
        let options = [];

        switch (q.id) {

            // queue-related
            case 1: {
                const queue = m.queue || [];

                const correct = queue.map(e => e.id || `${e.from}-${e.to}`);
                answer = correct;

                const optionsSet = [];
                optionsSet.push(answer);

                if (correct.length > 1) {
                    const missingOne = correct.slice(1, correct.length);
                    optionsSet.push(missingOne);
                }
                optionsSet.push([])
                optionsSet.push(moments[q.momentIndex+1].edge)

                options = shuffle(unique(optionsSet));
                break;
            }
            // queue-related
            case 2:
                const queue = m.queue || [];
                const prevQueue = moments[q.momentIndex - 1]?.queue || [];

                const currentIds = queue.map(e => e.id || `${e.from}-${e.to}`);
                const prevIds = new Set(
                    prevQueue.map(e => e.id || `${e.from}-${e.to}`)
                );

                answer = currentIds.filter(id => !prevIds.has(id));


                const optionsSet = [];
                optionsSet.push(answer);

                const nodeId = m.node;
                const nodeEdges = (edges || [])
                    .filter(e => e.data.source == nodeId || e.data.target == nodeId)
                    .map(e => e.data.id || `${e.data.source}-${e.data.source}`);
                
                if (q.momentIndex>1){
                    optionsSet.push(nodeEdges);
                }
                const addedEdges = nodeEdges.filter(e=> prevIds.has(e))
                optionsSet.push(addedEdges);

                optionsSet.push(moments[q.momentIndex - 1]?.edge)

                options = shuffle(unique(optionsSet));

                break;
            
            // next edge selected
            case 3: {
                const nextMoment = moments[q.momentIndex + 1];

                answer = nextMoment?.edge;

                const queue = m.queue || [];
                const distractors = queue
                    .map(e => e.id || `${e.from}-${e.to}`)
                    .filter(e => e !== answer)
                    .slice(0,2);
                
                if (queue.length > 3){
                    distractors.push(queue[queue.length-1].id)
                }
                options = shuffle([
                    answer,
                    ...distractors
                ]);

                break;
            }

            // connected nodes
            case 4: {
                answer = m.connectedNodes || [];

                const getRandomSubset = (arr) => {
                    const shuffled = shuffle(arr);
                    const size = Math.floor(Math.random() * arr.length);
                    return shuffled.slice(0, size);
                };

                const distractor1 = getRandomSubset(answer);
                const distractor2 = getRandomSubset(answer);
                const distractor3 = m.edge.split("-")

                options = shuffle(unique([
                    answer,
                    distractor1,
                    distractor2,
                    distractor3,
                    []
                ]));
                break;
            }

            // mst edges
            case 5: {
                answer = m.mstTree || [];

                const randomIndex = (arr) => Math.floor(Math.random() * arr.length);

                const mstNodes = new Set(
                    answer.flatMap(e => e.split("-"))
                );

                const cycleEdgeObj = (m.queue || []).find(e => {
                    const from = e.from;
                    const to = e.to;
                    return mstNodes.has(from) && mstNodes.has(to);
                });

                const cycleEdge = cycleEdgeObj
                    ? (cycleEdgeObj.id || `${cycleEdgeObj.from}-${cycleEdgeObj.to}`)
                    : null;

                let cycleOption = [...answer];
                if (cycleEdge && !answer.includes(cycleEdge)) {
                    const idx = randomIndex(cycleOption);
                    cycleOption.splice(idx, 1, cycleEdge);
                }
                let swappedOne = [...answer];

                const queueEdgeObj = m.queue?.[0];
                const queueEdge = queueEdgeObj
                    ? (queueEdgeObj.id || `${queueEdgeObj.from}-${queueEdgeObj.to}`)
                    : null;

                if (swappedOne.length > 0 && queueEdge && !answer.includes(queueEdge)) {
                    const removeIdx = randomIndex(swappedOne);
                    swappedOne.splice(removeIdx, 1, queueEdge);
                }

                options = shuffle(unique([
                    answer,
                    cycleOption,
                    swappedOne,
                    m.queue?.map(e=> e.id),
                    []
                ]));

                break;
            }
            case 6: {
                answer = m.weight;

                options = shuffle(unique([
                    moments[q.momentIndex - 1]?.weight,
                    answer +m.queue[0]?.weight,0,
                    answer + moments[q.momentIndex - 1]?.queue[0]?.weight,
                    answer
                ]));
                break;
            }

            // cycle detection
            case 7: {
                answer = "Skip the edge";

                options = [
                    "Skip the edge",
                    "Add the edge",
                    "Restart algorithm"
                ];
                break;
            }

            // why edge chosen
            case 8: {
                answer = "It has the smallest weight connecting to the MST";

                options = [
                    answer,
                    "It was added randomly",
                    "It connects two visited nodes"
                ];
                break;
            }

            // hypothetical
            case 9: {
                answer = "It could be chosen earlier and change the MST";

                options = [
                    answer,
                    "It would be ignored",
                    "It would remove nodes"
                ];
                break;
            }

            // MST complete
            case 10: {
                answer = "All nodes are connected with no cycles";

                options = unique([
                    answer,
                    "There are still edges to process",
                    "Graph is disconnected"
                ]);
                break;
            }

            

            // MST kruskal - next edge
            case 11: {
                answer = m.queue[0]?.id ? m.queue[0]?.id : "MST is complete. No more edges needed"

                options = unique([
                    answer,
                    m.queue[m.queue.length - 1].id,
                    m.queue[1]?.id || [],
                    m.queue[2]?.id || []
                ]);
                break;
            }

            case 13: {
                answer = m.connectedNodes
                const distractor1=answer.length? answer[0]:answer
                options = unique([
                    answer,
                    distractor1,
                    moments[q.momentIndex - 1]?.connectedNodes,
                    [],
                    m.edge.split("-")
                ]);
                break;
            }

            case 14: {
                
                answer = m.weight
                options = unique([
                    answer,
                    moments[q.momentIndex - 1]?.weight || 0,
                    0,
                    edges.filter(e => e.data.id == m.edge).map(e=> e.data.weight)[0] || 0
                ]);
                break;
            }

            case 15: {

                answer = "It would create a cycle because its endpoints are already connected";

                options = unique([
                    answer,
                    "Because it has a higher weight than other edges",
                    "Because one of the nodes is not in the MST yet",
                    "Because it does not connect any new node"
                ]);

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