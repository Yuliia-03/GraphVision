export function getSandboxStyles(directed, weighted) {

    const styles = [
        {
            selector: "node",
            style: {
                label: "data(label)",
                width: 60,
                height: 60,
                fontSize: 16,
                textValign: "center",
                textHalign: "center",
                textWrap: "wrap"
            }
        },
        {
            selector: ".sandbox-node",
            style: {
                backgroundColor: "#4a90e2"
            }
        },
        {
            selector: ".sandbox-node-selected",
            style: {
                backgroundColor: "orange"
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
            selector: "edge.edge-normal",
            style: {
                targetArrowShape: directed ? "triangle" : "none",
                sourceArrowShape: "none"
            }
        },
        {
            selector: "edge.edge-reversed",
            style: {
                targetArrowShape: "none",
                sourceArrowShape: directed ? "triangle" : "none"
            }
        }
    ];

    if (weighted) {
        styles.push({
            selector: "edge[weight]",
            style: {
                label: "data(weight)",
                fontSize: 14,
                textBackgroundColor: "#fff",
                textBackgroundOpacity: 0.8
            }
        });
    }

    return styles;
}