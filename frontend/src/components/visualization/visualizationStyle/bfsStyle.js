export const bfsStyle = (directed = false) => [
    {
        selector: "node",
        style: {
            label: "data(label)",
            'background-color': "#ffffff",
            'border-width': 2,
            'border-color': '#626262',
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
        selector: ".bfs-node-current",
        style: {
            label: "data(label)",
            'background-color': '#ff0000',
            width: 60,
            height: 60,
            fontSize: 16,
            textValign: "center",
            textHalign: "center",
            textWrap: "wrap",     
        }

    },
    {
        selector: ".bfs-node-unseen",
        style: {
            'background-color': "#ffffff",
            'border-width': 2,
            'border-color': '#626262'
        }
    },
    {
        selector: ".bfs-node-visited",
        style: {
            'background-color': '#919191',  
        }
    },
    {
        selector: ".bfs-node-inQueue",
        style: {
            'background-color': '#ff9100',
        }
    },{
        selector: ".bfs-node-inStack",
        style: {
            'background-color': '#7f17cf',
        }
    },


    {
        selector: ".bfs-node-neighbours",
        style: {
            'border-width': 4,
            'border-color': '#ff0000',
            'border-style': 'solid'
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