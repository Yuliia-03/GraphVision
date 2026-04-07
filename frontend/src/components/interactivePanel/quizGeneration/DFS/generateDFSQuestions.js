import { dfsQuestionTemplates } from "../../questionTemplates/DFSQuestions";

export default function generateDFSQuestions(steps, moments) {

    const questions = [];

    const template = (id) =>
        dfsQuestionTemplates.find(q => q.id === id);

    const lastPicked = {
        before: null,
        after: null
    };

    const pick = (arr, phase) => {
        let candidates = arr;

        if (lastPicked[phase] !== null) {
            candidates = arr.filter(q => q !== lastPicked[phase]);
        }

        const choice = candidates[Math.floor(Math.random() * candidates.length)];
        lastPicked[phase] = choice;

        return choice;
    };

    const build = (stepIndex, id, data = {}, momentIndex = null) => {

        const t = template(id);
        if (!t) return;

        let text = t.text;
        let hint = t.hint;

        Object.entries(data).forEach(([k, v]) => {
            text = text.replaceAll(`{${k}}`, v);
            if (hint) {
                hint = hint.replaceAll(`{${k}}`, v);
            }
        });

        const stack = (momentIndex >= 0 && moments[momentIndex])
            ? moments[momentIndex].stackAfter
            : [];

        text = text.replaceAll(`{stack}`, stack);
        hint = hint?.replaceAll(`{stack}`, stack);

        questions.push({
            stepIndex,
            id,
            text,
            data,
            hint,
            momentIndex
        });
    };

    // same logic: find all "Pop" steps
    const popIndices = steps
        .map((s, i) => s.message?.startsWith("Pop") ? i : -1)
        .filter(i => i !== -1);

    popIndices.forEach((popIndex, k) => {

        const moment = moments[k];
        if (!moment) return;

        const node = moment.node;

        const prevNode = moments[k - 1]?.node;

        // BEFORE processing (like BFS)
        build(popIndex - 1, pick([1, 2, 4], "before"), {
            node,
            stack: moment.stackAfter,
            extra: moment.discovered?.[0] || "X"
        }, k);

        // AFTER processing (DFS-specific set)
        build(popIndex, pick([3, 5, 7], "after"), {
            node,
            stack: moment.stackAfter
        }, k);
    });

    // final traversal question
    const finalIndex = steps.findIndex(s => s.isFinal);

    if (finalIndex !== -1) {
        build(finalIndex, 6);
    }

    return questions;
}