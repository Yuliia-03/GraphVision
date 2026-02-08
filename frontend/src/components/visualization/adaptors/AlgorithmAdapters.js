
export const nodeRules = {

    isCurrent: (stateName = "current") => ({
        state: stateName,
        matches: (nodeId, step) => nodeId === step.current,
    }),

    inList: (listName, stateName) => ({
        state: stateName,
        matches: (nodeId, step) => {
            return step[listName] && (step[listName].includes(String(nodeId)))},
    })

}

export const edgeRules = {

    activeEdge: ( stateName = "edges") => ({
        state: stateName,
        matches: (edgeId, step) => {
            return step["edges"] && step["edges"].includes(String(edgeId))
        }
    }),

}