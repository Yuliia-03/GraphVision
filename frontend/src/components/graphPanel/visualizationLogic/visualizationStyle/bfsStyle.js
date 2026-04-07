function generateComponentColors(n) {
    const colors = [];
    for (let i = 0; i < n; i++) {
        // Generate distinct hue using HSL
        const hue = (i * 360 / n) % 360;
        colors.push(`hsl(${hue}, 70%, 50%)`);
    }
    return colors;
}

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
    },{
        selector: ".bfs-node-final",
        style: {
            'background-color': '#007e2e',
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
        selector: ".top-final",
        style: {
            label: "data(label)",
            'background-color': '#09860d',
            width: 60,
            height: 60,
            fontSize: 16,
            textValign: "center",
            textHalign: "center",
            textWrap: "wrap",     
        }
    },
    {
        selector: ".scc-component-0",
        style: { 'background-color': '#792020' }
    },
    {
        selector: ".scc-component-1",
        style: { 'background-color': '#fff25d' }
    },
    {
        selector: ".scc-component-2",
        style: { 'background-color': '#001aff' }
    },
    {
        selector: ".scc-component-3",
        style: { 'background-color': '#409300' }
    },
    {
        selector: ".scc-component-4",
        style: { 'background-color': '#ff00e1' }
    },
    {
        selector: ".scc-component-5",
        style: { 'background-color': '#ff9d00' }
    },
    {
        selector: ".scc-component-6",
        style: { 'background-color': '#00aeff' }
    },
    {
        selector: ".scc-component-7",
        style: { 'background-color': '#00ff99' }
    },
    {
        selector: ".scc-component-8",
        style: { 'background-color': '#cf1456' }
    },
    {
        selector: ".scc-component-9",
        style: { 'background-color': '#92008b' }
    },
    {
        selector: ".scc-component-10",
        style: { 'background-color': '#0b1458' }
    },
    {
        selector: ".scc-component-11",
        style: { 'background-color': '#2c8361' }
    },
    {
        selector: ".scc-component-12",
        style: { 'background-color': '#602f26' }
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
    },
    {
        selector: ".bfs-tree-edge-final",
        style: {
        width: 2,
        'line-color': '#000000',
        targetArrowShape: directed ? "triangle" : "none",
        'target-arrow-color': directed ? '#000000' : undefined,
        curveStyle: "bezier"
        }
    }
    ,
    {
        selector: ".bfs-tree-ignored",
        style: {
        width: 2,
        'line-color': '#abaaaa',
        targetArrowShape: directed ? "triangle" : "none",
        'target-arrow-color': directed ? '#abaaaa' : undefined,
        curveStyle: "bezier"
        }
    },
    // componentColors.forEach((color, index) => {
    //     styles.push({
    //         selector: `.scc-component-${index}`,
    //         style: { 'background-color': color }
    //     });
    // })


]