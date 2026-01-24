import CytoscapeComponent from "react-cytoscapejs";
import SandboxToolbar from './SandboxToolbar'
import LoadGraphMenue from './load_graph/LoadGraphMenue'
import { useRef, useEffect, useState } from "react";

export default function GraphSandbox({ nodes=[], setNodes, edges=[], setEdges }) {

  
    const [mode, setMode] = useState("add"); 
    const [directed, setDirected] = useState(false);

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

        if (directed) return;


        setEdges((els) => {

            const seen = new Set();
            const result = [];

            for (const el of els) {

                const a = el.data.source;
                const b = el.data.target;

                const key = [a, b].sort().join("--");

                if (!seen.has(key)) {
                    seen.add(key);
                    result.push(el);
                }
            }


            return result;

        }); 
    }, [directed, setEdges]);

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
            if (mode !== "delete") return;

            const edgeId = event.target.id();
            setEdges((els) =>
                els.filter((el) => el.data?.id !== edgeId)
            );
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

                const newEdge = { data: { id: `${source}-${target}-${Date.now()}`, source, target }};
                setEdges((els) => {
        
                    const exists = els.some(
                        (el) =>
                            el.data.source === source && el.data.target === target ||
                            (!directed && el.data.source === target && el.data.target === source)
                    );

                    if (exists) return els;

                    return [...els, newEdge];
                });
                clearSelection();

                selectedNode.current = null;

            }
        };


        cy.on("tap", onCanvasTap);
        cy.on("tap", "node", onNodeTap);
        cy.on("tap", "edge", onEdgeTap);

        return () => cy.removeAllListeners();
    }, [mode, directed, nodes.length]);


    return (
        <div style={{ height: "100%" }}>

            <SandboxToolbar setMode = {setMode} onClear={() => {setNodes([]); setEdges([])}} onLoad={() => setShowLoad(true)} setDirected={setDirected} directed={directed}/>
    
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
                    }
                ]}
            />

            {showLoad && (
                <LoadGraphMenue onClose={() => setShowLoad(false)} onLoadEdges={setEdges} onLoadNodes={setNodes} setDirected={setDirected}
        directed={directed}/>
            )}
        </div>
    );
}
 