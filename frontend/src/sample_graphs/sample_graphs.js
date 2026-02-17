export const Samples = {

    DFS: {
        nodes: [
            { data: { id: "1", label: "1" }, position: { x: 100, y: 200 } },
            { data: { id: "2", label: "2" }, position: { x: 200, y: 100 } },
            { data: { id: "3", label: "3" }, position: { x: 200, y: 300 } },
            { data: { id: "4", label: "4" }, position: { x: 300, y: 200 } },
            { data: { id: "5", label: "5" }, position: { x: 400, y: 100 } },
            { data: { id: "6", label: "6" }, position: { x: 400, y: 300 } },
        ],
        edges: [
            { data: { id: "1-2", source: "1", target: "2", weight: 1 } },
            { data: { id: "1-3", source: "1", target: "3", weight: 1 } },
            { data: { id: "2-4", source: "2", target: "4", weight: 1 } },
            { data: { id: "4-3", source: "4", target: "3", weight: 1 } },
            { data: { id: "2-5", source: "2", target: "5", weight: 1 } },
            { data: { id: "3-6", source: "3", target: "6", weight: 1 } },
            { data: { id: "4-6", source: "4", target: "6", weight: 1 } },
            { data: { id: "6-5", source: "6", target: "5", weight: 1 } },
        ],

    },

    MST: {
        nodes: [
            { data: { id: "1", label: "1" }, position: { x: 40, y: 200 } },
            { data: { id: "2", label: "2" }, position: { x: 120, y: 100 } },
            { data: { id: "3", label: "3" }, position: { x: 120, y: 300 } },
            { data: { id: "4", label: "4" }, position: { x: 200, y: 200 } },//210
            { data: { id: "5", label: "5" }, position: { x: 310, y: 200 } },
            { data: { id: "6", label: "6" }, position: { x: 390, y: 100 } },
            { data: { id: "7", label: "7" }, position: { x: 390, y: 300 } },
            { data: { id: "8", label: "8" }, position: { x: 470, y: 200 } },
        ],
        edges: [
            { data: { id: "1-2", source: "1", target: "2", weight: 4 } },
            { data: { id: "1-3", source: "1", target: "3", weight: 3 } },
            { data: { id: "2-4", source: "2", target: "4", weight: 2 } },
            { data: { id: "3-4", source: "4", target: "3", weight: 4 } },
            { data: { id: "1-4", source: "1", target: "4", weight: 5 } },
            
            { data: { id: "4-5", source: "4", target: "5", weight: 1 } },

            { data: { id: "2-6", source: "2", target: "6", weight: 6 } },
            { data: { id: "3-7", source: "3", target: "7", weight: 8 } },
            { data: { id: "5-7", source: "5", target: "7", weight: 2 } },
            { data: { id: "6-8", source: "6", target: "8", weight: 3 } },
            { data: { id: "7-8", source: "7", target: "8", weight: 6 } },
            { data: { id: "5-8", source: "5", target: "8", weight: 2 } },
        ],
    },

    DAG: {
        nodes: [
            { data: { id: "1", label: "1" }, position: { x: 50, y: 200 } },
            { data: { id: "2", label: "2" }, position: { x: 150, y: 100 } },
            { data: { id: "3", label: "3" }, position: { x: 150, y: 300 } },
            { data: { id: "4", label: "4" }, position: { x: 250, y: 200 } },
            { data: { id: "5", label: "5" }, position: { x: 350, y: 100 } },
            { data: { id: "6", label: "6" }, position: { x: 350, y: 300 } },
            { data: { id: "7", label: "7" }, position: { x: 450, y: 200 } },
        ],
        edges: [
            { data: { id: "1-2", source: "1", target: "2", weight: 1 } },
            { data: { id: "1-3", source: "1", target: "3", weight: 1 } },
            { data: { id: "2-4", source: "2", target: "4", weight: 1 } },
            { data: { id: "4-5", source: "4", target: "5", weight: 1 } },
            
            { data: { id: "2-5", source: "5", target: "2", weight: 1 } },
            { data: { id: "3-6", source: "3", target: "6", weight: 1 } },
            { data: { id: "4-6", source: "4", target: "6", weight: 1 } },
            { data: { id: "6-7", source: "6", target: "7", weight: 1 } },
            { data: { id: "5-7", source: "5", target: "7", weight: 1 } },
        ],

    },
    
    Topological_sort: {
        nodes: [
            { data: { id: "1", label: "1" }, position: { x: 50, y: 200 } },
            { data: { id: "2", label: "2" }, position: { x: 150, y: 100 } },
            { data: { id: "3", label: "3" }, position: { x: 150, y: 300 } },
            { data: { id: "4", label: "4" }, position: { x: 250, y: 200 } },
            { data: { id: "5", label: "5" }, position: { x: 350, y: 100 } },
            { data: { id: "6", label: "6" }, position: { x: 350, y: 300 } },
            { data: { id: "7", label: "7" }, position: { x: 450, y: 200 } },
        ],
        edges: [
            { data: { id: "1-2", source: "1", target: "2", weight: 1 } },
            { data: { id: "1-3", source: "1", target: "3", weight: 1 } },
            { data: { id: "2-4", source: "2", target: "4", weight: 1 } },
            { data: { id: "4-5", source: "4", target: "5", weight: 1 } },
            
            { data: { id: "2-5", source: "2", target: "5", weight: 1 } },
            { data: { id: "3-6", source: "3", target: "6", weight: 1 } },
            { data: { id: "4-6", source: "4", target: "6", weight: 1 } },
            { data: { id: "6-7", source: "6", target: "7", weight: 1 } },
            { data: { id: "5-7", source: "5", target: "7", weight: 1 } },
        ],

    },

    SCC: {
        nodes: [
            { data: { id: "1", label: "1" }, position: { x: 40, y: 50 } },
            { data: { id: "2", label: "2" }, position: { x: 150, y: 100 } },
            { data: { id: "3", label: "3" }, position: { x: 40, y: 200 } },
            { data: { id: "4", label: "4" }, position: { x: 150, y: 280 } },
            { data: { id: "5", label: "5" }, position: { x: 360, y: 100 } },
            { data: { id: "6", label: "6" }, position: { x: 470, y: 100 } },
            { data: { id: "7", label: "7" }, position: { x: 360, y: 200 } },
            { data: { id: "8", label: "8" }, position: { x: 470, y: 200 } },

            { data: { id: "9", label: "9" }, position: { x: 300, y: 280 } },
            { data: { id: "10", label: "10" }, position: { x: 470, y: 370 } },
            { data: { id: "11", label: "11" }, position: { x: 40, y: 370 } },
        ],
        edges: [
            { data: { id: "2-3", source: "2", target: "3", weight: 4 } },
            { data: { id: "3-4", source: "3", target: "4", weight: 3 } },
            { data: { id: "2-4", source: "4", target: "2", weight: 2 } },

            { data: { id: "4-9", source: "4", target: "9", weight: 4 } },
            { data: { id: "9-4", source: "9", target: "4", weight: 5 } },
            
            { data: { id: "4-5", source: "5", target: "4", weight: 1 } },
            { data: { id: "2-5", source: "5", target: "2", weight: 1 } },

            { data: { id: "5-6", source: "5", target: "6", weight: 6 } },
            { data: { id: "6-5", source: "6", target: "5", weight: 8 } },
            { data: { id: "5-7", source: "7", target: "5", weight: 2 } },
            { data: { id: "6-8", source: "8", target: "6", weight: 3 } },

            { data: { id: "7-8", source: "7", target: "8", weight: 6 } },

            { data: { id: "7-10", source: "10", target: "7", weight: 2 } },
            { data: { id: "8-10", source: "8", target: "10", weight: 2 } },

            { data: { id: "9-10", source: "10", target: "9", weight: 2 } },
            { data: { id: "10-11", source: "10", target: "11", weight: 2 } },
            { data: { id: "3-11", source: "11", target: "3", weight: 2 } },
        ],
    },

    


}