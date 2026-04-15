function generateDFSQuizOptions(allTraversals) {
    const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

    const correctOption = shuffle(allTraversals).slice(0, 3);
    const distractors = [];

    while (distractors.length < 3) {

        const option = shuffle(allTraversals).slice(0, 3).map(seq => [...seq]);

        const randIndex = Math.floor(Math.random() * option.length);
        const newSeq = [...option[randIndex]];

        if (newSeq.length > 2) {
            const i = 1;
            const j = newSeq.length - 2;
            [newSeq[i], newSeq[j]] = [newSeq[j], newSeq[i]];
            option[randIndex] = newSeq;
        }

        distractors.push(option);
    }

    const options = shuffle([correctOption, ...distractors]);

    return {
        correctAnswer: correctOption,
        allOptions: options
    };
}

export default function generateDFSAnswers(questions, steps, moments, edges) {

    const shuffle = (arr) =>
        [...arr].sort(() => Math.random() - 0.5);

    const uniqueOptions = (options) => {
        const seen = new Set();
        return options.filter(opt => {
            const key = JSON.stringify(opt);
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    };

    return questions.map(q => {

        const step = steps[q.stepIndex];
        const moment = moments[q.momentIndex];

        let answer = null;
        let options = null;

        if (!moment && q.id !== 6) {
            return { ...q, answer: null, options: null };
        }

        const stackAfter = moment ? [...moment.stackAfter] : [];

        let distractor1, distractor2, distractor3;

        switch (q.id) {

            // 1. stack_after_processing
            case 1:
                answer = stackAfter;

                distractor1 = [...answer].reverse();
                distractor2 = answer.slice(1);
                distractor3 = [...moment.stackBefore];

                options = shuffle(uniqueOptions([
                    answer,
                    distractor1,
                    distractor2,
                    distractor3,
                    ...moment.allNeighbours.map(n => [n])
                ]));
                break;

            // 2. discover_nodes
            case 2:
                answer = moment.discovered;

                distractor1 = moment.visitedBefore;
                distractor2 = answer.slice(1);
                distractor3 = [...answer, moment.node];

                options = shuffle(uniqueOptions([
                    answer,
                    distractor1,
                    distractor2,
                    distractor3
                ]));
                break;

            // 3. next_action (DFS = TOP of stack)
            case 3:

                if (stackAfter.length > 0) {
                    const next = stackAfter[stackAfter.length - 1];
                    answer = `Pop ${next} from stack`;

                    const neighbors = edges
                        .filter(e => e.data.source === next)
                        .map(e => e.data.target);

                    distractor2 = neighbors.map(e => `Inspect edge ${next}-${e}`);

                } else {
                    answer = "DFS terminates";

                    const neighbors = edges
                        .filter(e => e.data.source === moment.node)
                        .map(e => e.data.target);

                    distractor2 = neighbors.map(e => `Inspect edge ${moment.node}-${e}`);
                }

                distractor1 = `Pop ${stackAfter[0] || moment.node} from stack`; // wrong (FIFO-like)
                distractor3 = moment.stackBefore.length > 0
                    ? `Pop ${moment.stackBefore[0]} from stack`
                    : "DFS terminates";

                const currentNode = `Pop ${moment.node} from stack`;

                options = shuffle(uniqueOptions([
                    answer,
                    distractor1,
                    ...distractor2,
                    distractor3,
                    currentNode
                ]));
                break;

            // 4. edges leading to new nodes
            case 4:
                answer = moment.edgesLeadingToNew;

                const edgesFromCurrent = edges
                    .filter(e => e.data.source === moment.node)
                    .map(e => e.data.id);

                distractor1 = edges
                    .filter(e => e.data.target === moment.node)
                    .map(e => e.data.id);

                distractor2 = edgesFromCurrent.filter(e => !answer.includes(e));
                distractor3 = edgesFromCurrent;

                options = shuffle(uniqueOptions([
                    answer,
                    distractor1,
                    distractor2,
                    distractor3,
                    ...answer.map(e => [e]),
                    []
                ]));
                break;

            //  5. visited_set
            case 5:
                answer = [...moment.visitedAfter];

                distractor1 = moment.visitedBefore;
                distractor2 = moment.discovered;
                distractor3 = moment.stackBefore;

                options = shuffle(uniqueOptions([
                    answer,
                    distractor1,
                    distractor2,
                    distractor3
                ]));
                break;

            case 7:
                if (moment.discovered.length === 0) {
                    answer = `Backtrack from ${moment.node}`;
                    options = [
                        answer,
                        `Stay at ${moment.node}`,
                        `Restart from source`,
                        `Visit all neighbours again`
                    ];
                } else {
                    answer = "Continue deeper in DFS";
                    options = [
                        answer,
                        "Backtrack immediately",
                        "Switch to BFS",
                        "Terminate DFS"
                    ];
                }
                break;
        }

        return {
            ...q,
            answer,
            options
        };
    });
}