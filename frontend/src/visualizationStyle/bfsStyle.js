export const bfsStyle = (directed = false) => [
    {
        selector: "node",
        style: {
            label: "data(label)",
            'background-color': "#ea0000",
            width: 60,
            height: 60,
            fontSize: 16,
            textValign: "center",
            textHalign: "center",
            textWrap: "wrap",     
        }

    },

    {
        selector: ".bfs-node-current",
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
        selector: ".bfs-node-visited",
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
        selector: ".bfs-node-neighbours",
        style: {
            label: "data(label)",
            'border-width': 4,
            'border-color': '#ff7a7a',
            'border-style': 'solid',
            width: 60,
            height: 60,
            fontSize: 16,
            textValign: "center",
            textHalign: "center",
            textWrap: "wrap",     
        }
    },

    {
        selector: ".bfs-node-inQueue",
        style: {
            label: "data(label)",
            'background-color': '#f5a623',
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
            targetArrowShape: directed ? "triangle" : "none",
            curveStyle: "bezier"
        }
    },


        {
        selector: "edge",
        style: {
        width: 2,
        'line-color': '#ccc',
        targetArrowShape: directed ? "triangle" : "none",
        'target-arrow-color': directed ? '#ccc' : undefined,
        curveStyle: "bezier"
        }
    },
    {
        selector: ".bfs-edge",
        style: {
        width: 2,
        'line-color': '#999',
        targetArrowShape: directed ? "triangle" : "none",
        'target-arrow-color': directed ? '#999' : undefined,
        curveStyle: "bezier"
        }
    },
    {
        selector: ".bfs-tree-edge",
        style: {
        width: 2,
        'line-color': '#dc0000',
        targetArrowShape: directed ? "triangle" : "none",
        'target-arrow-color': directed ? '#dc0000' : undefined,
        curveStyle: "bezier"
        }
    }

]