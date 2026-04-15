import { mstQuestionTemplatesKruskal, mstQuestionTemplatesPrims } from "../../questionTemplates/MSTQuestions";

export default function generateMSTQuestions(steps, moments, algorithm = "prims") {
    const questions = [];
    const LIMIT = Math.floor(steps.length / 3);

    const templates = algorithm === "kruskals"
        ? mstQuestionTemplatesKruskal
        : mstQuestionTemplatesPrims;

    const momentToIds = algorithm === "kruskals" ? {
        edgeConsidered: [11], 
        edgeAdded: [13, 14],    
        edgeSkipped: [12, 15], 
        mstCompleted: [16]
    } : {
        queueUpdated: [3, 1, 2],
        edgeSelected: [7, 8, 9, 5, 6],
        nodeVisited: [4],
        mstCompleted: [10]
    };

    const usedOnceIds = new Set(); 
    let lastId = null;

    const validMoments = moments
        .map((m, i) => ({ ...m, index: i }))
        .filter(m => (momentToIds[m.type] || []).length > 0);

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

        // pick moment (round-robin by type)
        let attempts = 0;
        let m = null;

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

        const possibleIds = momentToIds[m.type];
        if (!possibleIds || possibleIds.length === 0) continue;

        let validIds = possibleIds.filter(id => {
            if (id === lastId) return false;

            if (algorithm !== "kruskals" && [7, 8, 9].includes(id) && usedOnceIds.has(id)) {
                return false;
            }

            if (algorithm !== "kruskals" && id === 9) {
                if (!m.mstTree || m.mstTree.length < 2) return false;
            }

            return true;
        });
        if (algorithm === "kruskals") {

            if (m.type === "edgeAdded") {
                if (lastId === 13) validIds = validIds.filter(id => id !== 13);
                if (lastId === 14) validIds = validIds.filter(id => id !== 14);
            }

            if (m.type === "edgeSkipped") {
                if (lastId === 12) validIds = validIds.filter(id => id !== 12);
                if (lastId === 15) validIds = validIds.filter(id => id !== 15);
            }
        }

        if (validIds.length === 0) {
            validIds = possibleIds;
        }

        const id = validIds[Math.floor(Math.random() * validIds.length)];
        const template = templates.find(t => t.id === id);
        if (!template) continue;

        let text = template.text;
        let hint = template.hint;
        const totalNodes = moments[moments.length - 1]?.connectedNodes?.length || 0;


        const data = {
            node: m.node,
            edge: m.edge,
            queue: m.queue,
            n: totalNodes
        };

        
        Object.entries(data).forEach(([k, v]) => {
            if (k === "queue") return;

            if (Array.isArray(v)) v = v.join(", ");
            text = text.replaceAll(`{${k}}`, v ?? "");
            hint = hint?.replaceAll(`{${k}}`, v ?? "");
        });

        if (m.queue) {
            const queueIds = [...m.queue].map(e => e.id || `${e.from}-${e.to}`);
            const queueStr = queueIds.join(",");

            const connectedNodes = [...m.connectedNodes].slice(0, m.connectedNodes.length-1);

            if (!connectedNodes) {
                text = text.split(".")[1]
            }

            text = text.replaceAll("{connectedNodes}", connectedNodes)
            text = text.replaceAll("{queue}", queueStr);
            hint = hint?.replaceAll("{queue}", queueStr);
        }

        questions.push({
            stepIndex: m.index,
            id,
            text,
            hint,
            data,
            momentIndex: m.index
        });

        if (algorithm !== "kruskals" && [7, 8, 9].includes(id)) {
            usedOnceIds.add(id);
        }

        lastId = id;
    }

    return questions;
}