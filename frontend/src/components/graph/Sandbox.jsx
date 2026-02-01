import CytoscapeComponent from "react-cytoscapejs";
import { addEdge } from "./load_graph/graph_saving";
import { useGraph } from "../../contexts/GraphContext";
import SandboxToolbar from './SandboxToolbar'
import LoadGraph from './load_graph/LoadGraphMenue'
import { useRef, useEffect, useState } from "react";

export default function GraphSandbox() {

    const { nodes, edges, setNodes, setEdges, rules, graphConfig } = useGraph();

    const directed = graphConfig.directed;
    const weighted = rules.requiresWeighted;
  
    const [mode, setMode] = useState("add"); 

    const cyRef = useRef(null);
    const nodeCount = useRef(0);
    const selectedNode = useRef(null);

    const [showLoad, setShowLoad] = useState(false);

    const clearSelection = () => {
        if (selectedNode.current) {
            cyRef.current.getElementById(selectedNode.current).style("backgroundColor", "#4a90e2");
            selectedNode.current = null;
        }
    };

    useEffect(() => {
        if (!cyRef.current) return;
        clearSelection();
    }, [mode]);

    useEffect(() => {
        if (nodes.length === 0) {
            nodeCount.current = 0;
            return;
        }

        const maxId = Math.max(
            ...nodes.map(n => Number(n.data.id))
        );

        nodeCount.current = maxId + 1;
    }, [nodes]);


    useEffect(() => {
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
                { data: { id, label: id }, position: event.position }
            ]);
        };

        const onNodeTap = (event) => {
            
            const nodeId = event.target.id();
            
            if (event.originalEvent?.detail === 2) {
                onNodeRename(event, nodeId);
                clearSelection();
                return;
            }

            if (mode === "delete") {
                onNodeDelete(nodeId);
            }

            if (mode === "add") {
                onNodeCreateEdge(event, nodeId);
            }

        };

        const onEdgeTap = (event) => {
            clearSelection();

            if (mode === "delete") {
                const edgeId = event.target.id();
                setEdges((els) =>
                    els.filter((el) => el.data?.id !== edgeId)
                );
            }
            else if (mode === "add" && weighted) {

                const edgeId = event.target.id();
                const newWeight = prompt("Enter edge weight:", "1");
                if (!newWeight) return;
                setEdges((els) =>
                    els.map((el)=>
                        el.data.id === edgeId ?
                        { ...el, data: { ...el.data, weight: Number(newWeight) } }:
                        el
                    )
                );
            }
            else return;
        };

        const onNodeRename = (event, nodeId) => {
            
            if (mode !== "add") return;

            const newLabel = prompt(
                "Rename node:",
                event.target.data("label")
            );

            if (!newLabel || !newLabel.trim()) return;

            setNodes((els) =>
                els.map((el) =>
                    el.data.id === nodeId
                    ? { ...el, data: { ...el.data, label: newLabel } }
                    : el
                )
            );
            return;
        };

        const onNodeDelete = (nodeId) => {

            setNodes((els) =>
                els.filter(
                    (el) =>
                        el.data.id !== nodeId
                )
            );

            setEdges((els) =>
            els.filter(
                (el) => 
                    el.data.source !== nodeId &&
                    el.data.target !== nodeId
            ));
            return;
        };

        const onNodeCreateEdge = (event, nodeId) => {
            if (!selectedNode.current) {
                selectedNode.current = nodeId;
                event.target.style("backgroundColor", "orange");
            } else {
                const source = selectedNode.current;
                const target = nodeId;

                setEdges((els) =>
                    addEdge(
                        els,
                        {
                        data: {
                            source,
                            target,
                            ...(weighted ? { weight: 1 } : {})
                        }
                        },
                        directed, rules.allowSelfLoops
                    )
                );

                clearSelection();

                selectedNode.current = null;

            }
        };


        cy.on("tap", onCanvasTap);
        cy.on("tap", "node", onNodeTap);
        cy.on("tap", "edge", onEdgeTap);

        return () => cy.removeAllListeners();
    }, [mode, directed, weighted, nodes.length, setNodes, setEdges]);


    return (
        <div style={{ height: "100%" }}>

            <SandboxToolbar setMode = {setMode} onClear={() => {setNodes([]); setEdges([])}} onLoad={() => setShowLoad(true)}/>
    
            <CytoscapeComponent
                cy={(cy) => (cyRef.current = cy)}
                elements={[...nodes, ...edges]}
                style={{ width: "100%", height: "90%" }}
                layout={{ name: "preset" }}
                stylesheet={[
                    {
                        selector: "node",
                        style: {
                            label: "data(label)",
                            backgroundColor: "#4a90e2",
                            width: 60,
                            height: 60,
                            fontSize: 16,
                            textValign: "center",
                            textHalign: "center",
                            textWrap: "wrap",     
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
                        selector: "edge[weight]",
                        style: {
                            label: "data(weight)",
                            fontSize: 14,
                            textBackgroundColor: "#fff",
                            textBackgroundOpacity: 0.8
                        }
                    }
                ]}
            />

            {showLoad && (
                <LoadGraph onClose={() => setShowLoad(false)} />
            )}
        </div>
    );
}
 