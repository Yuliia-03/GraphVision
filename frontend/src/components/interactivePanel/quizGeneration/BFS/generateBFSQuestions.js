import { questionTemplates } from "../../questionTemplates/BFSQuestions"

export default function generateBFSQuestions(steps, moments) {

    const questions = []

    const template = (id) =>
        questionTemplates.find(q => q.id === id)

    const lastPicked = {
        before: null,
        after: null
    }

    const pick = (arr, phase) => {
        let candidates = arr

        if (lastPicked[phase] !== null) {
            candidates = arr.filter(q => q !== lastPicked[phase])
        }

        const choice = candidates[Math.floor(Math.random() * candidates.length)]
        lastPicked[phase] = choice

        return choice
    }

    const build = (stepIndex, id, data = {}, momentIndex = null) => {

        const t = template(id)
        if (!t) return

        let text = t.text
        let hint = t.hint

        Object.entries(data).forEach(([k, v]) => {
            text = text.replaceAll(`{${k}}`, v)
            if (hint) {
                hint = hint.replaceAll(`{${k}}`, v)
            }
        })

        const queue = (momentIndex >= 0 && moments[momentIndex]) 
            ? moments[momentIndex].queueAfter 
            : [];
        text = text.replaceAll(`{queue}`, queue)
        hint = hint?.replaceAll(`{queue}`, queue)

        questions.push({
            stepIndex,
            id,
            text,
            data,
            hint,
            momentIndex
        })
    }

    const popIndices = steps
        .map((s, i) => s.message?.startsWith("Pop") ? i : -1)
        .filter(i => i !== -1)

    popIndices.forEach((popIndex, k) => {

        const moment = moments[k]
        if (!moment) return

        const node = moment.node

        // decide: before OR after
        const askBefore = Math.random() < 0.5

        if (askBefore) {
            build(popIndex - 1, pick([1, 2, 4], "before"), {
                    node,
                    queue: moment.queueAfter,
                    extra: moment.discovered?.[0] || "X"
                }, k);
        } else {
            build(popIndex, pick([3, 5], "after"),{ 
                node,
                }, k );
        }
    })

    const finalIndex = steps.findIndex(s => s.isFinal)

    if (finalIndex !== -1) {
        build(finalIndex, 6)
    }

    return questions
}