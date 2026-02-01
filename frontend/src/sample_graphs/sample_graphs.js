export const Samples = {

    S1: {
        nodes: [
            { data: { id: "1", label: "1" }, position: { x: 50, y: 50 } },
            { data: { id: "2", label: "2" }, position: { x: 150, y: 50 } },
            { data: { id: "3", label: "3" }, position: { x: 100, y: 150 } },
        ],
        edges: [
            { data: { id: "1-2", source: "1", target: "2", weight: 1 } },
            { data: { id: "2-3", source: "2", target: "3", weight: 2 } },
            { data: { id: "1-3", source: "3", target: "1", weight: 3 } },
        ],

    },

    DAG1: {
        nodes: [
            { data: { id: "A", label: "A" }, position: { x: 50, y: 50 } },
            { data: { id: "B", label: "B" }, position: { x: 150, y: 50 } },
            { data: { id: "C", label: "C" }, position: { x: 100, y: 150 } },
        ],
        edges: [
            { data: { id: "A-B", source: "A", target: "B" } },
            { data: { id: "A-C", source: "A", target: "C" } },
            { data: { id: "B-C", source: "B", target: "C" } },
        ],
    },


}