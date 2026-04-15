import { useGraph } from "../../../contexts/GraphContext";
import { useEffect, useState } from "react";
import { formatGraphs } from "../../../utils/getGraphFormatter";
import "../../../styles/LoadGraph/LoadGraph.css"
export default function GraphLoading({ fetchGraphs, onClose }) {
    const { setNodes, setEdges, rules } = useGraph();

    const [graphs, setGraphs] = useState([]);
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
                weight: edge.data.weight
            },
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await fetchGraphs();
                setGraphs(formatGraphs(data));
            } catch (err) {
                setError(err.message || "Loading graphs failed");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [fetchGraphs]);

    const loadGraph = (graph) => {
        const edges = removeWeights(graph.edges, rules);
        const nodesWithClass = graph.nodes.map(node => ({
            ...node,
            classes: "sandbox-node"
        }));

        setNodes(nodesWithClass);
        setEdges(edges);

        onClose();
    };

    if (loading) return <p>Loading graphs...</p>;
    if (error) return <p>No graphs found</p>;

    return (
    <div className="graph-list-container">
        {graphs.map((graph) => (
            <button
                key={graph.name}
                onClick={() => loadGraph(graph)}
                className="graph-load-btn"
            >
                Load {graph.name}
            </button>
        ))}
    </div>
);
}
