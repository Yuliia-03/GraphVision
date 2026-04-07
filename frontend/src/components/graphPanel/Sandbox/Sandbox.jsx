import { useState, useRef, useEffect } from "react";
import { addEdge } from "../GraphConfigurations/graphConfigurations";
import { useGraph } from "../../../contexts/GraphContext";
import SandboxToolbar from "./SandboxToolbar";
import LoadGraph from "../LoadGraph/LoadGraphMenue";
import SaveGraph from "../SaveGraph/SaveGraph";
import GraphViewer from "./GraphViewer";

export default function GraphSandbox({ showToolbar = true }) {
    const { nodes, edges, setNodes, setEdges, rules, graphConfig, setGraphConfig, cyRef } = useGraph();
    const directed = graphConfig.directed;
    const weighted = rules.name === "default" ? graphConfig.weighted : rules.requiresWeighted;

    const setDirected = (value) => setGraphConfig((c) => ({ ...c, directed: value }));

    const setWeighted= (value) => setGraphConfig((c) => ({ ...c, weighted: rules.name === "default" ? value : rules.requiresWeighted }));

    const nodeCount = useRef(0);
    const selectedNode = useRef(null);

    const [mode, setMode] = useState("add");
    const [showLoad, setShowLoad] = useState(false);
    const [save, setSaveGraph] = useState(false);

    const [editingNode, setEditingNode] = useState(null); // {id, x, y, value}
    const [editingEdge, setEditingEdge] = useState(null); // {id, x, y, value}

    const clearSelection = () => {
        if (selectedNode.current) {
            cyRef.current.getElementById(selectedNode.current)?.removeClass("sandbox-node-selected");
            selectedNode.current = null;
        }
    };

    useEffect(() => {
        if (!nodes.length) {
            nodeCount.current = 0;
            return;
        }

        const maxId = Math.max(
            ...nodes.map(n => Number(n.data.id) || 0)
        );

        nodeCount.current = maxId + 1;
    }, [nodes]);

    useEffect(() => {

        setDirected(directed);
        setWeighted(weighted)
        if (!cyRef.current) return;
        const cy = cyRef.current;

        const onCanvasTap = (event) => {
            if (event.target !== cy) return;

            clearSelection();
            if (nodes.length >= 30) {
                alert("You can use max of 30 nodes");
                return;
            }

            if (mode !== "add") return;

            const id = nodeCount.current++;
            setNodes((els) => [
                ...els,
                { data: { id, label: id }, position: event.position, classes: "sandbox-node" }
            ]);
        };

        const onNodeTap = (event) => {
            const nodeId = event.target.id();

            if (event.originalEvent?.detail === 2 && mode === "add") {
                const pos = event.target.renderedPosition();
                setEditingNode({
                    id: nodeId,
                    x: pos.x,
                    y: pos.y,
                    value: event.target.data("label")
                });
                clearSelection();
                return;
            }

            if (mode === "delete") {
                onNodeDelete(nodeId);
                return;
            }

            if (mode === "add") {
                if (!selectedNode.current) {
                    selectedNode.current = nodeId;
                    event.target.addClass("sandbox-node-selected");
                } else {
                    const source = selectedNode.current;
                    const target = nodeId;

                    setEdges((els) =>
                        addEdge(
                            els,
                            { data: { source, target, weight: 1  } },
                            directed,
                            rules.allowSelfLoops
                        )
                    );

                    clearSelection();
                    selectedNode.current = null;
                }
            }
        };

        const onEdgeTap = (event) => {
            const edgeId = event.target.id();

            if (mode === "delete") {
                setEdges((els) => els.filter((el) => el.data?.id !== edgeId));
                return;
            }

            if (event.originalEvent?.detail === 2 && mode === "add" && weighted) {
                const pos = event.target.renderedBoundingBox();
                setEditingEdge({
                    id: edgeId,
                    x: pos.x1 + (pos.w / 2),
                    y: pos.y1 + (pos.h / 2),
                    value: event.target.data("weight") ?? 1
                });
            }
        };

        cy.on("tap", onCanvasTap);
        cy.on("tap", "node", onNodeTap);
        cy.on("tap", "edge", onEdgeTap);

        return () => cy.removeAllListeners();
    }, [mode, directed, weighted, nodes.length, setNodes, setEdges]);

    const onNodeDelete = (nodeId) => {
        setNodes((els) => els.filter((el) => el.data.id !== nodeId));
        setEdges((els) => els.filter((el) => el.data.source !== nodeId && el.data.target !== nodeId));
    };

    const handleNodeChange = (e) => setEditingNode((prev) => ({ ...prev, value: e.target.value }));
    const handleNodeSubmit = () => {
        if (!editingNode) return;
        const newLabel = editingNode.value.trim();
        if (!newLabel) return setEditingNode(null);

        setNodes((els) =>
            els.map((el) =>
                el.data.id === editingNode.id
                    ? { ...el, data: { ...el.data, label: newLabel } }
                    : el
            )
        );
        setEditingNode(null);
    };

    const handleEdgeChange = (e) => setEditingEdge((prev) => ({ ...prev, value: e.target.value }));
    const handleEdgeSubmit = () => {
        if (!editingEdge) return;
        const val = Number(editingEdge.value);
        if (isNaN(val)) return setEditingEdge(null);

        setEdges((els) =>
            els.map((el) =>
                el.data.id === editingEdge.id
                    ? { ...el, data: { ...el.data, weight: val } }
                    : el
            )
        );
        setEditingEdge(null);
    };

    return (
        <div style={{ height: "100%", position: "relative" }}>
            {showToolbar && (
                <SandboxToolbar
                    mode={mode}
                    setMode={setMode}
                    onClear={() => {
                        setNodes([]);
                        setEdges([]);
                    }}
                    onLoad={() => setShowLoad(true)}
                    onSave={() => setSaveGraph(true)}
                />
            )}

            <GraphViewer />

            {editingNode && (
                <input
                    autoFocus
                    value={editingNode.value}
                    onChange={handleNodeChange}
                    onBlur={handleNodeSubmit}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleNodeSubmit();
                        if (e.key === "Escape") setEditingNode(null);
                    }}
                    style={{
                        position: "absolute",
                        top: editingNode.y,
                        left: editingNode.x,
                        transform: "translate(-50%, -50%)",
                        zIndex: 10,
                        padding: 4,
                        fontSize: 14,
                        borderRadius: 4,
                        border: "1px solid #ccc",
                        outline: "none"
                    }}
                />
            )}

            {editingEdge && (
                <input
                    autoFocus
                    value={editingEdge.value}
                    onChange={handleEdgeChange}
                    onBlur={handleEdgeSubmit}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleEdgeSubmit();
                        if (e.key === "Escape") setEditingEdge(null);
                    }}
                    style={{
                        position: "absolute",
                        top: editingEdge.y,
                        left: editingEdge.x,
                        transform: "translate(-50%, -50%)",
                        zIndex: 10,
                        width: 40,
                        padding: 2,
                        fontSize: 12,
                        borderRadius: 4,
                        border: "1px solid #ccc",
                        outline: "none"
                    }}
                />
            )}

            {showLoad && <LoadGraph onClose={() => setShowLoad(false)} />}
            {save && <SaveGraph onClose={() => setSaveGraph(false)} />}
        </div>
    );
}