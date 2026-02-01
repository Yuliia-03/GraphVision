import { useState } from "react";
import '../../../styles/LoadMatrix.css'
import { useGraph } from "../../../contexts/GraphContext.jsx";

export default function LoadAdjacencyList({onClose}) {

    const { rules, graphConfig, setNodes, setEdges, setGraphConfig  } = useGraph();
    const directed = graphConfig.directed;
    const setDirected = (value) => setGraphConfig((c) => ({ ...c, directed: value }));
    
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
        setNodes(nodes);
        setEdges(edges);
        onClose();
    };

    return(
        <div>
            <h3>Edge List</h3>

            <label>
                Edges:
                <input type="number" min={1} value={edgesN}
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
            </label>

            <label>
                <input
                type="checkbox"
                checked={directed}
                onChange={(e) => setDirected(e.target.checked)}
                />
                Directed
            </label>

            {weighted && 
                <label>
                    
                    <input
                    type="checkbox"
                    checked={true} onClick={() => alert("MST is possible only on weighted graphs")} readOnly
                    />
                    Weighted
                </label>
            }

            <p>{'s = {'}</p>

            <table>

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
                                    
                                    <td>
                                        <p>{"("}</p>
                                    </td>
                                    <td>
                                    <input
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
                                        style={{width:40}}
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
                                    <td><p>{")"}</p></td>
                                
                            </tr>
                        )


                    )}
                    

                    

                </tbody>

            </table>
            <p>{'}'}</p>

            <button onClick={loadGraph}>Load Graph</button>

        </div>
    );
}