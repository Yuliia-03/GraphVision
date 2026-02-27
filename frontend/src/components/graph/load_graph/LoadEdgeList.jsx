import { useState } from "react";
import '../../../styles/LoadEdgeList.css'
import { useGraph } from "../../../contexts/GraphContext.jsx";

import GraphConfig from "../GraphConfig";

export default function LoadEdgeList({onClose}) {

    const { rules, graphConfig, setNodes, setEdges  } = useGraph();
    const directed = graphConfig.directed;
    
    const weighted = rules.requiresWeighted;
    const [edgeList, setEdgeList] = useState(Array.from({ length: 1 }, () =>[]));
    const [edgesN, setEdgesN] = useState(1);


    const loadGraph = () => {
        const nodeLabels = new Set();

        console.log(edgeList)

        const nodes = [];
        const edges = [];

        for (let i = 0; i < edgesN; i++) {
            const el = edgeList[i]
   
            const exists = edges.some(
                (edge) =>
                edge.data.source === el.source && edge.data.target === el.target ||
                (!directed && edge.data.source === el.target && edge.data.target === el.source)
            );
            if (!exists) {
                edges.push({
                    data: {
                    id: `${el.source}-${el.target}`,
                    source: el.source,
                    target: el.target
                    }
                });
            }
            
            nodeLabels.add(el.source);
            nodeLabels.add(el.target);

            
            
        }

        const labelsArray = Array.from(nodeLabels);
        for (let i = 0; i < labelsArray.length; i++) {
            nodes.push({
            data: { id: labelsArray[i], label: labelsArray[i] },
            position: { x: 100 + i * 60, y: 200 }
            });
        }

        const nodesWithClass = nodes.map(node => ({
            ...node,
            classes: "sandbox-node"
        }));
        setNodes(nodesWithClass);
        setEdges(edges);
        onClose();
    };

    return(
        <div className="edge-list-panel">
            <div className="edge-list-header">
                <h3>Edge List</h3>

                <div className="edge-count">

                    <label>Edges:</label>
                    <input  className="edge-input" type="number" min={1} value={edgesN}
                        onChange={(e) => {
                            const n = Number(e.target.value);
                            setEdgesN(n);
                            setEdgeList((prev) => {
                                const newList = prev.slice(0, n);
                                while (newList.length < n) {
                                    newList.push({ source: '', target: '', weight: '' });
                                }
                                return newList;
                            });
                        }}
                    />
                
                </div>

            </div>

            
            <GraphConfig />

            {/* <p>{'s = {'}</p> */}
            <div className="edge-brace">{'s = {'}</div>

            <table className="edge-table">

                <thead>
                    <tr>
                        <th></th>
                        <th>Source</th>
                        <th>Target</th>
                        {weighted && <th>Weight</th>}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {edgeList.map((edge, i) =>

                        (
                            <tr key={i}>
                                    
                                    <td className="edge-brace">
                                        <p>{"("}</p>
                                    </td>
                                    <td>
                                    <input
                                        className="edge-input"
                                        style={{width:40}}
                                        value={edge.source || ""}
                                        onChange={(e) => {
                                            const newEdgeList = [...edgeList]
                                            newEdgeList[i].source = e.target.value
                                            setEdgeList(newEdgeList)
                                        }}
                                    />
                                    </td>
                                    <td>
                                    <input
                                        className="edge-input"
                                        style={{width:40}}
                                        value={edge.target || ""}
                                        onChange={(e) => {
                                            const newEdgeList = [...edgeList]
                                            newEdgeList[i].target = e.target.value
                                            setEdgeList(newEdgeList)
                                        }}
                                    />
                                    </td>
                                    {
                                        weighted && 
                                        <td>
                                            <input
                                                className="edge-input"
                                                type="number" 
                                                value={edge.weight || 0}
                                                onChange={(e) => {
                                                    const newEdgeList = [...edgeList]
                                                    newEdgeList[i].weight = Number(e.target.value)
                                                    setEdgeList(newEdgeList)
                                                }}
                                            />


                                        </td>
                                    }
                                    <td className="edge-brace">)</td>
                                
                            </tr>
                        )


                    )}
                    

                    

                </tbody>

            </table>
            <div className="edge-brace">{'}'}</div>

            <div className="edge-actions">
                <button onClick={loadGraph}>Load Graph</button>
            </div>

        </div>
    );
}