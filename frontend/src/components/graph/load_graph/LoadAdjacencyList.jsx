import { useState } from "react";
import '../../../styles/LoadMatrix.css'
import { useGraph } from "../../../contexts/GraphContext";

import NeighborsInput from '../load_graph/NeighborsInput.jsx'

export default function LoadAdjacencyList({onClose}) {

    const [size, setSize] = useState(3);
    const { rules, graphConfig, setNodes, setEdges, setGraphConfig  } = useGraph();

    const directed = graphConfig.directed;
    const weighted = rules.requiresWeighted;

    const setDirected = (value) => setGraphConfig((c) => ({ ...c, directed: value }));

    const [adjList, setAdjList] = useState(Array.from({ length: size }, () =>[]));
    const [labels, setLabels] = useState(Array.from({ length: size }, (_, i) => i));


    const handleNeighborsChange = (i, value) => {


        const vals = value
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s.length > 0);

        const newNeighbors = vals
            .map((v) => {
                const [nodeStr, weightStr] = v.split(":").map(s => s.trim());
                const nodeIndex = labels.indexOf(Number(nodeStr));
                if (nodeIndex === -1) return null;

                return {
                    node: nodeIndex,
                    weight: weighted ? Number(weightStr) || 1 : undefined
                };
            })
            .filter((x) => x !== null);

        const copy = adjList.map((row) => [...row]);
        copy[i] = newNeighbors;

        setAdjList(copy);

        return newNeighbors.map(n => weighted ? `${labels[n.node]}:${n.weight}` : labels[n.node]).join(", ");
    
    };



    const loadGraph = () => {
        const nodes = [];

        for (let i = 0; i < size; i++) {
        nodes.push({
            data: { id: i, label: i },
            position: { x: 100 + i * 60, y: 200 }
            });
        }
        setNodes(nodes);

        const edges = [];
        for (let i = 0; i < size; i++) {
            for (const { node: target, weight } of adjList[i]) {
   
                    const exists = edges.some(
                        (edge) =>
                        edge.data?.source === i && edge.data?.target === labels[target] ||
                        (!directed && edge.data?.source === labels[target] && edge.data?.target === i)
                    );
                    if (!exists) {
                        edges.push({
                            data: {
                            id: `${labels[i]}-${labels[target]}`,
                            source: labels[i],
                            target: labels[target],
                            ...(weighted ? { weight } : {})
                            }
                        });
                    }
            
            }
        }

        setEdges(edges);
        onClose();
    };



    return(
        <div>
            <h3>Adjacency List</h3>

            <label>
                Size:
                <input type="number" min={1} value={size}
                    onChange={(e) => {
                        const n = Number(e.target.value);
                        setSize(n);
                        setAdjList(Array.from({ length: n }, () => []));
                        setLabels(Array.from({ length: n }, (_, i) => i));
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
            <table border="1">
                <thead>
                    <tr>
                    <th>Node</th>
                    <th></th>
                    <th>Neighbors (comma-separated)</th>
                    </tr>
                </thead>

                <tbody>
                    {adjList.map((neighbours, i) => (
                    <tr key={i}>
                        <td>
                        <input
                            value={labels[i]}
                            onChange={(e) => {
                                const copy = [...labels];
                                copy[i] = e.target.value;
                                setLabels(copy);
                            }}
                            style={{ width: 40 }}
                        />
                        </td>

                        <td><p>{"->"}</p></td>

                        <td>

                            <NeighborsInput
                            i = {i}
                            neighbours = {neighbours}
                            labels={labels}
                            onCommit={handleNeighborsChange}
                            weighted={weighted}
                            />
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>


            <button onClick={loadGraph}>Load Graph</button>

        </div>
    );
}