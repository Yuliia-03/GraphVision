
export const Rules = {

    isCurrent: (stateName = "current") => ({
        state: stateName,
        matches: (nodeId, step) => nodeId === step.current,
    }),

    inList: (listName, stateName) => ({
        state: stateName,
        matches: (nodeId, step) => Array.isArray(step[listName] && step[listName].includes(nodeId)),
    })

}