import { sccTemplates } from "../../questionTemplates/SCCQuestions";

function getSCCPhase(steps, m) {
    if (m.action === "reverse edges") return "transpose";
    return steps[m.stepIndex]?.phase || "firstDFS";
}

// template compatibility rules
function isTemplateValid(templateId, m) {
  const type = m.type;

  switch (templateId) {

        case 1:
        case 2:
            return type === "discover" && m.visited?.length > 1 ;
        case 3:
        case 6:
        return type === "discover";
        case 4:
        return type === "backtrack";
        case 7:
        return true;
        case 8:
        case 9:
        case 11:
            return m.phase === "secondDFS" && (!m.stackBefore || m.stackBefore.length === 0);
        case 16:
        return true;
        case 10:
        case 13:
        return true;
        case 15:
        return true;

        default:
        return true;
    }
}

// phase - template map
const sccQuestionMap = {
    firstDFS: [1, 2, 3, 4, 17],
    transpose: [7],
    secondDFS: [1, 3, 8, 11, 16],
    componentFound: [10, 13],
    finished: [15]
};

export default function generateSCCQuestions(steps, moments) {

    const questions = [];
    const LIMIT = Math.floor(steps.length / 4) + 1;

    let lastId = null;

    const validMoments = moments
        .map((m, i) => ({
        ...m,
        index: i,
        phase: getSCCPhase(steps, m)
        }))
        .filter(m => sccQuestionMap[m.phase]);

    if (!validMoments.length) return [];

    // group by phase
    const momentsByType = {};
    validMoments.forEach(m => {
        if (!momentsByType[m.phase]) momentsByType[m.phase] = [];
        momentsByType[m.phase].push(m);
    });

    const types = Object.keys(momentsByType);
    let typeIndex = 0;


    for (let i = 0; i < LIMIT; i++) {

        let attempts = 0;
        let m = null;

        while (attempts < types.length) {

            const type = types[typeIndex % types.length];
            const bucket = momentsByType[type];

            if (bucket?.length) {
                const rand = Math.floor(Math.random() * bucket.length);
                m = bucket.splice(rand, 1)[0];
                typeIndex++;
                break;
            }

            typeIndex++;
            attempts++;
        }

        if (!m) continue;

        // filter template ids by phase + rules
        let possibleIds = sccQuestionMap[m.phase] || [];

        possibleIds = possibleIds.filter(id => {

            if (!isTemplateValid(id, m)) return false;

            // limit backtrack questions freqency
            const backtrackIds = [4, 17];

            if (backtrackIds.includes(id) && m.type === "backtrack") {
                return Math.random() < 0.3;
            }

            return true;
        });

        if (possibleIds.length === 0) continue;

        let validIds = possibleIds.filter(id => id !== lastId);

        if (!validIds.length) validIds = possibleIds;

        const id = validIds[Math.floor(Math.random() * validIds.length)];
        const template = sccTemplates.find(t => t.id === id);

        if (!template) continue;

        const data = {
            node: m.node || m.current,
            recStack: m.stackBefore || [],
            visited: m.visited || m.visitedAfter,
            component: m.component,
            sccs: m.sccs,
            visitedBefore: m.visited?.slice(0,-1),
            recStackAfter: m.stackAfter || [],
            finOrder : m.finishOrder || []
        };

        let text = template.text;
        let hint = template.hint;

        Object.entries(data).forEach(([k, v]) => {
        if (Array.isArray(v)) v = v.join(", ");
        text = text.replaceAll(`{${k}}`, v ?? "");
        hint = hint?.replaceAll(`{${k}}`, v ?? "");
        });

        questions.push({
            stepIndex: m.stepIndex,
            id,
            text,
            hint,
            momentIndex: m.index,
            phase: m.phase
        });

        lastId = id;
    }

    return questions;
}