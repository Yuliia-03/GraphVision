import { useState } from "react";
import "../../../styles/LoadEdgeList.css";
import { useGraph } from "../../../contexts/GraphContext.jsx";
import GraphConfig from "../GraphConfigurations/GraphConfig.jsx";

export default function LoadEdgeList({ onClose }) {
    const { rules, graphConfig, setNodes, setEdges } = useGraph();

    const directed = graphConfig.directed;
    const weighted = rules.requiresWeighted;

    const [edgeList, setEdgeList] = useState([
        { source: "", target: "", weight: "" }
    ]);

    const [edgesN, setEdgesN] = useState(1);

    const loadGraph = () => {
        const nodeLabels = new Set();
        const edges = [];

        for (let i = 0; i < edgesN; i++) {
            const el = edgeList[i];
            if (!el?.source || !el?.target) continue;

            const exists = edges.some(
                (edge) =>
                    (edge.data.source === el.source &&
                        edge.data.target === el.target) ||
                    (!directed &&
                        edge.data.source === el.target &&
                        edge.data.target === el.source)
            );

            if (!exists) {
                edges.push({
                    data: {
                        id: `${el.source}-${el.target}`,
                        source: el.source,
                        target: el.target,
                        ...(weighted ? { weight: el.weight } : {})
                    }
                });
            }

            nodeLabels.add(el.source);
            nodeLabels.add(el.target);
        }

        const nodes = Array.from(nodeLabels).map((id, i) => ({
            data: { id, label: id },
            position: { x: 120 + i * 80, y: 200 },
            classes: "sandbox-node"
        }));

        setNodes(nodes);
        setEdges(edges);
        onClose();
    };

    const updateEdge = (i, key, value) => {
        const copy = [...edgeList];
        copy[i] = { ...copy[i], [key]: value };
        setEdgeList(copy);
    };

    const updateEdgeCount = (n) => {
        setEdgesN(n);

        setEdgeList((prev) => {
            const next = prev.slice(0, n);
            while (next.length < n) {
                next.push({ source: "", target: "", weight: "" });
            }
            return next;
        });
    };

    return (
        <div className="edge-panel">
            {/* HEADER */}
            <div className="edge-header">
                <div>
                    <h3>Edge List</h3>
                    {/* <p className="subtext">Define graph connections</p> */}
                </div>

                <div className="edge-count">
                    <label className="size-input">Edges
                    <input
                        type="number"
                        min={1}
                        value={edgesN}
                        onChange={(e) => updateEdgeCount(Number(e.target.value))}
                    />
                    </label>
                </div>
            </div>

            <GraphConfig />

            {/* SCROLL AREA */}
            <div className="edge-scroll">
                <div className="edge-list">
                    {edgeList.map((edge, i) => (
                        <div className="edge-row" key={i}>
                            <span className="pill">(</span>

                            <input
                                placeholder="source"
                                value={edge.source}
                                onChange={(e) =>
                                    updateEdge(i, "source", e.target.value)
                                }
                            />

                            <span className="arrow">→</span>

                            <input
                                placeholder="target"
                                value={edge.target}
                                onChange={(e) =>
                                    updateEdge(i, "target", e.target.value)
                                }
                            />

                            {weighted && (
                                <input
                                    className="weight"
                                    placeholder="w"
                                    type="number"
                                    value={edge.weight}
                                    onChange={(e) =>
                                        updateEdge(
                                            i,
                                            "weight",
                                            Number(e.target.value)
                                        )
                                    }
                                />
                            )}

                            <span className="pill">)</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ACTIONS */}
            <div className="edge-actions">
                <button onClick={loadGraph}>Load Graph</button>
            </div>
        </div>
    );
}