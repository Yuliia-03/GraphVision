import { sccTemplates } from "../../questionTemplates/SCCQuestions";

export default function generateSCCQuestions(steps, moments) {

    const questions = [];

    // ========================
    // CONFIG
    // ========================
    const MAX_QUESTIONS = 22;
    const TARGET_RATIO = 0.25;
    const MIN_GAP = 4;

    let lastQuestionStep = -Infinity;

    const template = (id) =>
        sccTemplates.find(q => q.id === id);

    const lastPicked = {
        first: null,
        second: null
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

    // ========================
    // CONTROLLED BUILD
    // ========================
    const build = (stepIndex, id, data = {}, momentIndex = null, force = false) => {

        if (!force) {
            if (questions.length >= MAX_QUESTIONS) return;

            // spacing (avoid clustering)
            if (stepIndex - lastQuestionStep < MIN_GAP) return;

            // probabilistic filtering
            if (Math.random() > TARGET_RATIO) return;
        }

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

        questions.push({
            stepIndex,
            id,
            text,
            data,
            hint,
            momentIndex
        });

        lastQuestionStep = stepIndex;
    };

    // ========================
    // FIRST DFS
    // ========================
    const firstDFSIndices = steps
        .map((s, i) => s.phase === "firstDFS" ? i : -1)
        .filter(i => i !== -1);

    firstDFSIndices.forEach((stepIndex, k) => {

        const moment = moments[k];
        if (!moment) return;

        const node = moment.current || moment.node;
        if (!node) return;

        // BEFORE
        build(stepIndex - 1, pick([2, 3, 4], "first"), {
            node,
            visited: moment.visited?.join(", "),
            inStack: moment.inStack?.join(", "),
            finishOrder: moment.finishOrder?.join(", ")
        }, k);

        // AFTER (finish)
        if (steps[stepIndex]?.isFinal) {
            build(stepIndex, pick([1, 5], "first"), {
                node,
                finishOrder: moment.finishOrder?.join(", ")
            }, k);
        }
    });

    // ========================
    // TRANSPOSE
    // ========================
    const transposeIndex = steps.findIndex(s => s.phase === "transposition");

    if (transposeIndex !== -1) {
        build(transposeIndex, pick([6, 7], "first"));
    }

    // ========================
    // SECOND DFS
    // ========================
    const secondDFSIndices = steps
        .map((s, i) => s.phase === "secondDFS" ? i : -1)
        .filter(i => i !== -1);

    secondDFSIndices.forEach((stepIndex, k) => {

        const moment = moments[k];
        if (!moment) return;

        const node = moment.current || moment.node;
        if (!node) return;

        // BEFORE
        build(stepIndex - 1, pick([8, 10, 12], "second"), {
            node,
            visited: moment.visited?.join(", "),
            inStack: moment.inStack?.join(", ")
        }, k);

        // AFTER (component formed)
        if (steps[stepIndex]?.isFinal) {
            build(stepIndex, pick([9, 11], "second"), {
                node,
                component: moment.result,
                visited: moment.visited?.join(", ")
            }, k);
        }
    });

    // ========================
    // FINAL RESULT
    // ========================
    const resultIndex = steps.findIndex(s => s.phase === "result");

    if (resultIndex !== -1) {
        const finalMoment = moments[moments.length - 1];

        build(resultIndex, 13, {
            components: finalMoment?.components
                ?.map(c => c.join(", "))
                .join(" | ")
        });

        build(resultIndex, 14);
    }

    // ========================
    // FALLBACK (ensure enough questions)
    // ========================
    if (questions.length < 10) {

        const importantSteps = steps
            .map((s, i) => ({ s, i }))
            .filter(x =>
                x.s.isFinal ||
                x.s.phase === "transposition" ||
                x.s.phase === "result"
            );

        importantSteps.forEach(({ i }) => {
            if (questions.length >= MAX_QUESTIONS) return;

            build(i, 1, {}, null, true); // force add
        });
    }

    return questions;
}