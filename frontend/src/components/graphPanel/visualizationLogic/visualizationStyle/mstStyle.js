export const mstStyle = (directed = false) => [
    {
        selector: "node",
        style: {
            label: "data(label)",
            'background-color': "#ababab",
            width: 60,
            height: 60,
            fontSize: 16,
            textValign: "center",
            textHalign: "center",
            textWrap: "wrap",     
        }

    },

    {
        selector: ".mst-node-visited",
        style: {
            label: "data(label)",
            'background-color': '#4a90e2',
            width: 60,
            height: 60,
            fontSize: 16,
            textValign: "center",
            textHalign: "center",
            textWrap: "wrap",     
        }

    },

    {
        selector: ".mst-node-unseen",
        style: {
            label: "data(label)",
            'background-color': '#919191',
            width: 60,
            height: 60,
            fontSize: 16,
            textValign: "center",
            textHalign: "center",
            textWrap: "wrap",     
        }
    },

    {
        selector: ".mst-node-current",
        style: {
            label: "data(label)",
            'background-color': '#919191',
            width: 60,
            height: 60,
            fontSize: 16,
            textValign: "center",
            textHalign: "center",
            textWrap: "wrap",     
        }
    },
    {
        selector: "edge",
        style: {
            width: 2,
            'line-color': '#ccc',
            label: "data(weight)",
            fontSize: 14,
            textBackgroundColor: "#fff",
            textBackgroundOpacity: 0.8,
            targetArrowShape: directed ? "triangle" : "none",
            'target-arrow-color': directed ? '#ccc' : undefined,
            curveStyle: "bezier"
        }
    },
    {
        selector: ".mst-initial-edge",
        style: {
        width: 2,
        'line-color': '#aaaaaa',
        targetArrowShape: directed ? "triangle" : "none",
        'target-arrow-color': directed ? '#aaaaaa' : undefined,
        curveStyle: "bezier"
        }
    },
    {
        selector: ".mst-edge",
        style: {
        width: 2,
        'line-color': '#000000',
        targetArrowShape: directed ? "triangle" : "none",
        'target-arrow-color': directed ? '#000000' : undefined,
        curveStyle: "bezier"
        }
    },
    {
        selector: ".mst-current-edge",
        style: {
        width: 2,
        'line-color': '#dc0000',
        targetArrowShape: directed ? "triangle" : "none",
        'target-arrow-color': directed ? '#dc0000' : undefined,
        curveStyle: "bezier"
        }
    },
    {
        selector: ".prims-queue",
        style: {
        width: 2,
        'line-color': '#ff0000',
        targetArrowShape: directed ? "triangle" : "none",
        'target-arrow-color': directed ? '#ff0000' : undefined,
        curveStyle: "bezier"
        }
    },
    {
        selector: ".prims-cycle",
        style: {
        width: 2,
        'line-color': '#d8d8d8',
        targetArrowShape: directed ? "triangle" : "none",
        'target-arrow-color': directed ? '#d8d8d8' : undefined,
        curveStyle: "bezier"
        }
    },
    {
        selector: ".mst-unpicked-edge",
        style: {
        width: 2,
        'line-color': '#ffffff',
        targetArrowShape: directed ? "triangle" : "none",
        'target-arrow-color': directed ? '#ffffff' : undefined,
        curveStyle: "bezier"
        }
    },

]