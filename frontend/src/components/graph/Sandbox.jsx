import CytoscapeComponent from "react-cytoscapejs";
import SandboxToolbar from './SandboxToolbar'
import { useRef, useEffect, useState } from "react";

export default function GraphSandbox({ elements, setElements }) {
  
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
        if (!cyRef.current) return;
        const cy = cyRef.current;

        const onCanvasTap = (event) => {
            if (event.target !== cy) return;
            
            clearSelection();
            if (mode !== "add") return;
            const id = `N${nodeCount.current++}`;
            setElements((els) => [
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
            setElements((els) =>
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

                setElements((els) =>
                    els.map((el) =>
                        el.data?.id === nodeId
                        ? { ...el, data: { ...el.data, label: newLabel } }
                        : el
                    )
                );
                return;
        };

        const onNodeDelete = (nodeId) => {

            setElements((els) =>
                els.filter(
                    (el) =>
                        el.data?.id !== nodeId &&
                        el.data?.source !== nodeId &&
                        el.data?.target !== nodeId
                )
            );
            return;
        };

        const onNodeCreateEdge = (event, nodeId) => {
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
                            data: { id: `${source}-${target}`, source, target }
                        }
                    ]);
                }
            

                cyRef.current.getElementById(source).style("backgroundColor", "#4a90e2");

                selectedNode.current = null;

            }
        };


        cy.on("tap", onCanvasTap);
        cy.on("tap", "node", onNodeTap);
        cy.on("tap", "edge", onEdgeTap);

        return () => cy.removeAllListeners();
    }, [mode, setElements]);


    return (
        <div style={{ height: "100%" }}>

            <SandboxToolbar setMode = {setMode} onClear={() => setElements([])} onLoad={() => setShowLoad(true)}/>
    
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

            {/* {showLoad && (
                <LoadGraphModal onClose={() => setShowLoad(false)} onLoad={(els) => {setElements(els);setShowLoad(false);}}/>
            )} */}
        </div>
    );
}
