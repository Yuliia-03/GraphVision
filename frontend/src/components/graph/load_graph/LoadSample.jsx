import { Samples } from "../../../sample_graphs/sample_graphs";
import { useGraph } from "../../../contexts/GraphContext";

export default function LoadSample({onClose}) {

    const {setNodes, setEdges, rules, cyRef} = useGraph();


    const removeWeights = (edges, rules) => {
        if (rules.requiresWeighted) return edges;

        return edges.map((edge) => ({
            ...edge,
            data: {
            id: edge.data.id,
            source: edge.data.source,
            target: edge.data.target,
            },
        }));
    };


    const loadSampleGraph = (name) => {
        const graph = Samples[name];
        if (!graph) return;

        const edges = removeWeights(graph.edges, rules);
        const nodesWithClass = graph.nodes.map(node => ({
            ...node,
            classes: "sandbox-node"
        }));


        setNodes(nodesWithClass);
        setEdges(edges);


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