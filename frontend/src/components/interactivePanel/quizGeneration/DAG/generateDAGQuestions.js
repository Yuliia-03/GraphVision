import { dagTemplates, topoTemplates } from "../../questionTemplates/DAGQuestions";

export const dagQuestionMap = {

    nodeVisited: [],
    exploringNeighbours: [ 1, 2, 3, 10],
    backtrack: [4, 5, 6],
    cycleDetected: [8],
    topoCompleted: [9]
};

export default function generateDAGQuestions(steps, moments, algo = "dag") {

    const questions = [];
    const LIMIT = Math.floor(steps.length / 3) +1;

    let lastId = null;

    const validMoments = moments
        .map((m, i) => ({ ...m, index: i }))
        .filter(m => (dagQuestionMap[m.type] || []).length > 0);

    if (validMoments.length === 0) return [];

    const momentsByType = {};
    validMoments.forEach(m => {
        if (!momentsByType[m.type]) {
            momentsByType[m.type] = [];
        }
        momentsByType[m.type].push(m);
    });

    const types = Object.keys(momentsByType);
    let typeIndex = 0;


    for (let i = 0; i < LIMIT; i++) {

        let attempts = 0;
        let m = null;

        // round-robin selection
        while (attempts < types.length) {
            const type = types[typeIndex % types.length];
            const bucket = momentsByType[type];

            if (bucket && bucket.length > 0) {
                const randIndex = Math.floor(Math.random() * bucket.length);
                m = bucket.splice(randIndex, 1)[0];
                typeIndex++;
                break;
            }

            typeIndex++;
            attempts++;
        }

        if (!m) continue;

        const possibleIds = dagQuestionMap[m.type];
        if (!possibleIds || possibleIds.length === 0) continue;


        let validIds = possibleIds.filter(id => {

            // avoid repeating same question
            if (id === lastId) return false;

            // avoid topo questions too early
            if ([6].includes(id) && (!m.topoOrder || m.topoOrder.length === 0)) {
                return false;
            }

            // final topo only at end
            if (id === 9 && m.type !== "topoCompleted") {
                return false;
            }

            // stack questions require at least 1 node
            if ([2, 5, 7].includes(id) && (!m.recStack || m.recStack.length === 0)) {
                return false;
            }

            return true;
        });

        if (validIds.length === 0) {
            validIds = possibleIds;
        }

        let template;
        const id = validIds[Math.floor(Math.random() * validIds.length)];
        if (algo == "dag"){
            template = dagTemplates.find(t => t.id === id);
        } else {
            template = dagTemplates.find(t => t.id === id) ?? topoTemplates.find(t => t.id === id);
        }
         

        if (!template) continue;

        let text = template.text;
        let hint = template.hint;

        const data = {
            node: m.currentNode,
            recStack: m.recStack,
            topoOrder: m.topoOrder,
            visited: m.visited,
            cycle: m.cycle
        };

        Object.entries(data).forEach(([k, v]) => {

            if (Array.isArray(v)) {
                v = v.length ? v.join(", ") : "∅";
            }

            text = text.replaceAll(`{${k}}`, v ?? "");
            hint = hint?.replaceAll(`{${k}}`, v ?? "");
        });

        questions.push({
            stepIndex: m.index,
            id,
            text,
            hint,
            data,
            momentIndex: m.index
        });

        lastId = id;
    }

    return questions;
}