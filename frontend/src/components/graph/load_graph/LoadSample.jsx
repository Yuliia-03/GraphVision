import { Samples } from "../../../sample_graphs/sample_graphs";

import { useGraph } from "../../../contexts/GraphContext";

export default function LoadSample({onClose}) {

    const {setNodes, setEdges} = useGraph();

    const loadSampleGraph = (name) => {
        const graph = Samples[name];
        if (!graph) return;

        setNodes(graph.nodes);
        setEdges(graph.edges);
        onClose();
    };

    return(
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {Object.keys(Samples).map((name) => (
            <button
                key={name}
                onClick={() => loadSampleGraph(name)}
                style={{ padding: "8px 12px", cursor: "pointer" }}
            >
            Load {name}
            </button>
        ))}
    </div>
    
    );
}