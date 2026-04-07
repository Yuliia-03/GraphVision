import { mstQuestionTemplatesKruskal, mstQuestionTemplatesPrims } from "../../questionTemplates/MSTQuestions";

export default function generateMSTQuestions(steps, moments, algorithm = "prims") {
    const questions = [];
    const LIMIT = Math.floor(steps.length / 3);

    const templates = algorithm === "kruskals"
        ? mstQuestionTemplatesKruskal
        : mstQuestionTemplatesPrims;

    // ONLY Kruskal mapping fixed
    const momentToIds = algorithm === "kruskals" ? {
        edgeConsidered: [11],     // next edge
        edgeAdded: [13, 14],      // MST growth
        edgeSkipped: [12, 15],    // cycle reasoning
        mstCompleted: [16]
    } : {
        queueUpdated: [3, 1, 2],
        edgeSelected: [7, 8, 9, 5, 6],
        nodeVisited: [4],
        mstCompleted: [10]
    };

    const usedOnceIds = new Set(); // (used only by Prim’s 7/8/9)
    let lastId = null;

    // filter valid moments
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

        // ✅ pick moment (round-robin by type)
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

        // ID selection
        let validIds = possibleIds.filter(id => {
            if (id === lastId) return false;

            if (algorithm !== "kruskals" && [7, 8, 9].includes(id) && usedOnceIds.has(id)) {
                return false;
            }

            if (algorithm !== "kruskals" && id === 9) {
                // too early → skip
                if (!m.mstTree || m.mstTree.length < 2) return false;
            }

            return true;
        });

        // EXTRA Kruskal anti-spam logic
        if (algorithm === "kruskals") {

            // avoid repeating same idea in edgeAdded
            if (m.type === "edgeAdded") {
                if (lastId === 13) validIds = validIds.filter(id => id !== 13);
                if (lastId === 14) validIds = validIds.filter(id => id !== 14);
            }

            // avoid repeating same idea in edgeSkipped
            if (m.type === "edgeSkipped") {
                if (lastId === 12) validIds = validIds.filter(id => id !== 12);
                if (lastId === 15) validIds = validIds.filter(id => id !== 15);
            }
        }

        // fallback
        if (validIds.length === 0) {
            validIds = possibleIds;
        }

        const id = validIds[Math.floor(Math.random() * validIds.length)];
        const template = templates.find(t => t.id === id);
        if (!template) continue;

        let text = template.text;
        let hint = template.hint;

        const data = {
            node: m.node,
            edge: m.edge,
            queue: m.queue,
            n: m.nodesCount
        };

        // replace placeholders (no [object Object])
        Object.entries(data).forEach(([k, v]) => {
            if (k === "queue") return;

            if (Array.isArray(v)) v = v.join(",");
            text = text.replaceAll(`{${k}}`, v ?? "");
            hint = hint?.replaceAll(`{${k}}`, v ?? "");
        });

        // queue handling
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

        // Prim’s tracker (unchanged)
        if (algorithm !== "kruskals" && [7, 8, 9].includes(id)) {
            usedOnceIds.add(id);
        }

        lastId = id;
    }

    return questions;
}