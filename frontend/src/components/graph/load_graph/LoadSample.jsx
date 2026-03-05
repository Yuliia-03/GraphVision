//import { Samples } from "../../../sample_graphs/sample_graphs";
import { useGraph } from "../../../contexts/GraphContext";
import { useEffect, useState } from "react";
import {getSamples} from "../../../services/api"
import { formatGraphs } from "../../../utils/graphFormatter";

export default function LoadSample({onClose}) {

    const {setNodes, setEdges, rules, cyRef} = useGraph();

    const [samples, setSamples] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    useEffect(() => {
        const fetchSamples = async () => {
            setLoading(true);

            try {
                const data = await getSamples();

                setSamples(formatGraphs(data));

            } catch (err) {
                setError(err.message || "Loading samples failed");
            } finally {
                setLoading(false);
            }
        };

        fetchSamples();
    }, []);

    
    const loadSampleGraph = (graph) => {

        const edges = removeWeights(graph.edges, rules);
        const nodesWithClass = graph.nodes.map(node => ({
            ...node,
            classes: "sandbox-node"
        }));


        setNodes(nodesWithClass);
        setEdges(edges);


        onClose();
    };

    if (loading) return <p>Loading samples...</p>;
    if (error) return <p>{error}</p>;

    return(
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {samples.map((graph) => (
            <button
                key={graph.name}
                onClick={() => loadSampleGraph(graph)}
                style={{ padding: "8px 12px", cursor: "pointer" }}
            >
            Load {graph.name}
            </button>
        ))}
    </div>
    
    );
}