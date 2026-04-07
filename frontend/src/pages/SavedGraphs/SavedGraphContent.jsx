import { useEffect, useState } from "react";
import { getSavedGraphs, getSavedGraphById, editGraph, deleteGraph, saveGraph } from "../../services/api";
import GraphSandbox from "../../components/graphPanel/Sandbox/Sandbox";
import { useGraph } from "../../contexts/GraphContext";
import { formatEdgesForAPI, formatNodesForAPI } from "../../utils/saveGraphFormatter";
import { formatGraphs } from "../../utils/getGraphFormatter";
import "../../styles/SavedGraphs.css";

export default function SavedGraphContent() {
    const [graphs, setGraphs] = useState([]);
    const [selectedGraph, setSelectedGraph] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const { nodes, edges, setNodes, setEdges, graphConfig, setGraphConfig} = useGraph();
       
    useEffect(() => {
        getSavedGraphs()
            .then(setGraphs)
            .catch(err => console.error("Failed to fetch graphs:", err));
    }, []);

    const openGraph = async (graphId) => {
        setIsEditing(false);
        
        try {

            const fullGraph = await getSavedGraphById(graphId);
            const formatted = formatGraphs([fullGraph])[0];
            setNodes(formatted.nodes);
            setEdges(formatted.edges);
            setSelectedGraph({
                id: formatted.id,
                name: formatted.name,
                description: formatted.description
            });
            setGraphConfig(cfg => ({ ...cfg, weighted: formatted.weighted, directed:  formatted.directed}));

        } catch (err) {
            console.error("Failed to load graph:", err);
            alert("Failed to load graph.");
        } 
    };

    const handleDelete = async (graphId) => {
        if (!window.confirm("Are you sure you want to delete this graph?")) return;

        try {
            await deleteGraph(graphId);
            setGraphs(prev => prev.filter(g => g.id !== graphId));

            if (selectedGraph?.id === graphId) {
                setSelectedGraph(null);
            }

        } catch (err) {
            console.error("Delete failed:", err);
            alert("Failed to delete graph");
        }
    };

    const handleCreate = async () => {
        setSelectedGraph({
            id: null,
            name: "Untitled Graph",
            description: ""
        });

        setNodes([]);
        setEdges([]);
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const graphData = {
                name: selectedGraph.name,
                description: selectedGraph.description,
                nodes: formatNodesForAPI(nodes),
                edges: formatEdgesForAPI(edges),
                directed: graphConfig.directed,
                weighted: graphConfig.weighted
            };
            console.log("SENDING:", graphData);

            let result;

            if (selectedGraph.id) {
                result = await editGraph(selectedGraph.id, graphData);

                const formatted = formatGraphs([result])[0];

                setGraphs(prev =>
                    prev.map(g => (g.id === formatted.id ? formatted : g))
                );
            } else {
                await saveGraph({
                    name: graphData.name,
                    description: graphData.description,
                    nodes: graphData.nodes,
                    edges: graphData.edges,
                    directed: graphConfig.directed,
                    weighted: graphConfig.weighted
                });

                const allGraphs = await getSavedGraphs();
                const newGraph = allGraphs[allGraphs.length - 1];

                const formatted = formatGraphs([newGraph])[0];

                setGraphs(prev => [...prev, formatted]);
                setSelectedGraph({
                    id: formatted.id,
                    name: formatted.name,
                    description: formatted.description
                });
            }

            setIsEditing(false);
        } catch (err) {
            console.error("Update failed:", err);
        }
    };

    const closeModal = () => {
        setSelectedGraph(null);
        setIsEditing(false)
    };

    return (
        <div className="saved-page">

            <div className="page-header">
                <h2>Your Graphs</h2>
                <button className="create-btn" onClick={handleCreate}>
                    + New Graph
                </button>
            </div>

            <div className="saved-graphs-grid">
                {graphs.map(graph => (
                    <div
                        key={graph.id}
                        className="saved-graph-card"
                        onClick={() => openGraph(graph.id)}
                    >
                        <h4>{graph.name}</h4>
                        <p>{graph.description || "No description"}</p>

                        <button
                            className="delete-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(graph.id);
                            }}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            {selectedGraph && (
                <div className="graph-modal">
                    <div className="graph-modal-content">

                        <div className="graph-modal-header">

                            {isEditing ? (
                                <input
                                    className="graph-title-input"
                                    value={selectedGraph.name}
                                    onChange={(e) =>
                                        setSelectedGraph(prev => ({
                                            ...prev,
                                            name: e.target.value
                                        }))
                                    }
                                />
                            ) : (
                                <h3>{selectedGraph.name}</h3>
                            )}

                            <div className="actions">
                                {!isEditing ? (
                                    <button onClick={() => setIsEditing(true)}>
                                        Edit
                                    </button>
                                ) : (
                                    <>
                                        <button onClick={handleSave}>Save</button>
                                        <button onClick={() => setIsEditing(false)}>
                                            Cancel
                                        </button>
                                    </>
                                )}

                                <button onClick={closeModal}>✕</button>
                            </div>
                        </div>

                        <div className="graph-viewer-container">
                            <GraphSandbox
                                editable={isEditing}
                                showToolbar={isEditing}
                            />
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}