import CytoscapeComponent from "react-cytoscapejs";
import { useGraph } from "../../contexts/GraphContext";
import { getSandboxStyles } from "./SandboxStyle";
import { useEffect } from "react";

export default function GraphViewer() {
    const { nodes, edges, graphConfig, cyRef, rules } = useGraph();

    useEffect(() => {
        if (cyRef.current) {
            cyRef.current.resize();
            cyRef.current.fit();
        }
    }, []);

    const directed = graphConfig.directed;
    const weighted = rules.requiresWeighted;

    console.log(nodes)
    return (
        <CytoscapeComponent
            cy={(cy) => (cyRef.current = cy)}
            elements={[...nodes, ...edges]}
            style={{ width: "100%", height: "100%" }}
            layout={{ name: "preset" }}
            minZoom={0.5}
            maxZoom={2}
            stylesheet={getSandboxStyles(directed, weighted)}
        />
    );
}