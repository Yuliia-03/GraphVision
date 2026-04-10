export default function generateSCCAnswers(questions, steps, moments, edges) {

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

        // allow conceptual questions without moment
        if (!moment && ![6, 7, 14, 15].includes(q.id)) {
            return { ...q, answer: null, options: null };
        }

        let distractor1, distractor2, distractor3;

        switch (q.id) {

            // ========================
            // FIRST DFS
            // ========================

            // 1. finish_order_update
            case 1:
                answer = [...(moment.finishOrder || []), moment.current || moment.node];

                distractor1 = moment.finishOrder || [];
                distractor2 = [...answer].reverse();
                distractor3 = [...(moment.visited || [])];

                options = shuffle(uniqueOptions([
                    answer,
                    distractor1,
                    distractor2,
                    distractor3
                ]));
                break;

            // 2. first_dfs_next
            case 2:
                const neighbours = edges
                    .filter(e => e.data.source === moment.current)
                    .map(e => e.data.target);

                const unvisited = neighbours.filter(n => !moment.visited.includes(n));

                if (unvisited.length > 0) {
                    answer = unvisited[0];
                } else {
                    answer = "Backtrack";
                }

                distractor1 = neighbours[0] || "Backtrack";
                distractor2 = moment.visited[0];
                distractor3 = "Terminate";

                options = shuffle(uniqueOptions([
                    answer,
                    distractor1,
                    distractor2,
                    distractor3
                ]));
                break;

            // 3. stack_behavior_first
            case 3:
                answer = moment.inStack || [];

                distractor1 = [...answer].reverse();
                distractor2 = [];
                distractor3 = moment.visited;

                options = shuffle(uniqueOptions([
                    answer,
                    distractor1,
                    distractor2,
                    distractor3
                ]));
                break;

            // 4. visited_first_dfs
            case 4:
                answer = moment.visited;

                distractor1 = [];
                distractor2 = moment.inStack;
                distractor3 = moment.finishOrder;

                options = shuffle(uniqueOptions([
                    answer,
                    distractor1,
                    distractor2,
                    distractor3
                ]));
                break;

            // 5. finish_order_reason
            case 5:
                answer = "All neighbours explored";
                options = [
                    answer,
                    "Node was just discovered",
                    "Stack is empty",
                    "Graph is transposed"
                ];
                break;

            // ========================
            // TRANSPOSE
            // ========================

            case 6:
                answer = "All edges are reversed";
                options = [
                    answer,
                    "Nodes are removed",
                    "Edges are duplicated",
                    "Graph becomes undirected"
                ];
                break;

            case 7:
                answer = "To correctly find SCCs";
                options = [
                    answer,
                    "To speed up DFS",
                    "To remove cycles",
                    "To sort nodes"
                ];
                break;

            // ========================
            // SECOND DFS
            // ========================

            // 8. second_dfs_start
            case 8:
                answer = "Highest finish time node";

                distractor1 = "Lowest finish time node";
                distractor2 = "Random node";
                distractor3 = "First discovered node";

                options = [
                    answer,
                    distractor1,
                    distractor2,
                    distractor3
                ];
                break;

            // 9. component_growth
            case 9:
                const neighbours2 = edges
                    .filter(e => e.data.source === moment.current)
                    .map(e => e.data.target);

                const unvisited2 = neighbours2.filter(n => !moment.visited.includes(n));

                answer = unvisited2;

                distractor1 = neighbours2;
                distractor2 = moment.visited;
                distractor3 = [];

                options = shuffle(uniqueOptions([
                    answer,
                    distractor1,
                    distractor2,
                    distractor3
                ]));
                break;

            // 10. stack behavior second
            case 10:
                answer = moment.inStack;

                distractor1 = [...answer].reverse();
                distractor2 = [];
                distractor3 = moment.visited;

                options = shuffle(uniqueOptions([
                    answer,
                    distractor1,
                    distractor2,
                    distractor3
                ]));
                break;

            // 11. component completion
            case 11:
                answer = moment.result?.split("->") || [];

                distractor1 = [...answer].reverse();
                distractor2 = moment.visited;
                distractor3 = [];

                options = shuffle(uniqueOptions([
                    answer,
                    distractor1,
                    distractor2,
                    distractor3
                ]));
                break;

            // 12. visited_second_dfs
            case 12:
                answer = moment.visited;

                distractor1 = [];
                distractor2 = moment.inStack;
                distractor3 = moment.result?.split("->") || [];

                options = shuffle(uniqueOptions([
                    answer,
                    distractor1,
                    distractor2,
                    distractor3
                ]));
                break;

            // ========================
            // FINAL
            // ========================

            case 13:
                answer = "Yes";
                options = [
                    answer,
                    "No",
                    "Only partially",
                    "Depends on graph size"
                ];
                break;

            case 14:
                answer = "Decreasing finish time";
                options = [
                    answer,
                    "Increasing finish time",
                    "Random order",
                    "BFS order"
                ];
                break;

            case 15:
                answer = "It may merge SCCs";
                options = [
                    answer,
                    "No change",
                    "Split SCCs",
                    "Remove nodes"
                ];
                break;
        }

        return {
            ...q,
            answer,
            options
        };
    });
}