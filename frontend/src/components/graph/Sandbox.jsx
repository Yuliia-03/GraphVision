import CytoscapeComponent from "react-cytoscapejs";
import { useRef, useEffect, useState } from "react";

export default function GraphSandbox({ elements, setElements }) {
  
    const [mode, setMode] = useState("add"); 

    const cyRef = useRef(null);
    const nodeCount = useRef(0);
    const selectedNode = useRef(null);

    useEffect(() => {
        if (!cyRef.current) return;
        const cy = cyRef.current;

        const onCanvasTap = (event) => {
            if (mode !== "add") return;
            if (event.target === cy) {
            const id = `N${nodeCount.current++}`;
            setElements((els) => [
                ...els,
                { data: { id, label: id }, position: event.position }
            ]);
            }
        };

        const onNodeTap = (event) => {
            const nodeId = event.target.id();

            if (mode === "delete") {
                setElements((els) =>
                    els.filter(
                    (el) =>
                        el.data?.id !== nodeId &&
                        el.data?.source !== nodeId &&
                        el.data?.target !== nodeId
                    )
                );
                return;
            }

            if (mode === "add") {
                if (!selectedNode.current) {
                    selectedNode.current = nodeId;
                    event.target.style("backgroundColor", "orange");
                } else {
                    const source = selectedNode.current;
                    const target = nodeId;

                    if (source !== target) {
                        setElements((els) => [
                            ...els,
                            {
                                data: {
                                    id: `${source}-${target}`,
                                    source,
                                    target
                                }
                            }
                        ]);
                    }

                    cy.getElementById(source).style("backgroundColor", "#4a90e2");
                    selectedNode.current = null;
                }
            }
        };

        const onEdgeTap = (event) => {
            if (mode !== "delete") return;

            const edgeId = event.target.id();
            setElements((els) =>
                els.filter((el) => el.data?.id !== edgeId)
            );
        };

        const onNodeRename = (event) => {
            if (mode !== "add") return;

            const node = event.target;
            const newLabel = prompt("Rename node:", node.data("label"));

            if (!newLabel || !newLabel.trim()) return;

            setElements((els) =>
                els.map((el) =>
                    el.data?.id === node.id()
                    ? { ...el, data: { ...el.data, label: newLabel } }
                    : el
                )
            );
        };

        cy.on("tap", onCanvasTap);
        cy.on("tap", "node", onNodeTap);
        cy.on("tap", "edge", onEdgeTap);
        cy.on("dbltap", "node", onNodeRename);

        return () => cy.removeAllListeners();
    }, [mode, setElements]);

    return (
        <div style={{ height: "100%" }}>

            <div style={{ marginBottom: 8 }}>
                <button onClick={() => setMode("add")}>Add</button>
                <button onClick={() => setMode("delete")}>Delete</button>
                <button onClick={() => setMode("none")}>Select</button>
                <span style={{ marginLeft: 10 }}>Mode: {mode}</span>
            </div>
    
            <CytoscapeComponent
                cy={(cy) => (cyRef.current = cy)}
                elements={elements}
                style={{ width: "100%", height: "90%" }}
                layout={{ name: "preset" }}
                stylesheet={[
                    {
                        selector: "node",
                        style: {
                            label: "data(label)",
                            backgroundColor: "#4a90e2",
                            width: 40,
                            height: 40
                        }
                    },
                    {
                        selector: "edge",
                        style: {
                            width: 2,
                            targetArrowShape: "triangle",
                            curveStyle: "bezier"
                        }
                    }
                ]}
            />
        </div>
    );
}
