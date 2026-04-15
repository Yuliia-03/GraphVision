import CytoscapeComponent from "react-cytoscapejs";
import { useGraph } from "../../../contexts/GraphContext";
import { getSandboxStyles } from "./SandboxStyle";

export default function GraphViewer({ onReady, externalCyRef }) {
    const { nodes, edges, graphConfig, cyRef, rules } = useGraph();

    const directed = graphConfig.directed;
    const weighted =graphConfig.weighted;

    return (
        <CytoscapeComponent
            cy={(cy) => {
                if (externalCyRef) {
                    externalCyRef.current = cy;
                } else {
                    cyRef.current = cy;
                }

                if (onReady) {
                    onReady(cy); 
                }
            }}
            elements={[...nodes, ...edges]}
            style={{ width: "100%", height: "100%" }}
            layout={{ name: "preset" }}
            minZoom={0.5}
            maxZoom={2}
            stylesheet={getSandboxStyles(directed, weighted)}
        />
    );
}