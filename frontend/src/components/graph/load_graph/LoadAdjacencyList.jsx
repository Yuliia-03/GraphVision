import { useState } from "react";
import '../../../styles/LoadMatrix.css'

import NeighborsInput from '../load_graph/NeighborsInput.jsx'

export default function LoadAdjacencyList({onLoadNodes, onLoadEdges, onClose}) {

    const [size, setSize] = useState(3);
    const [directed, setDirected] = useState(false);
    const [adjList, setAdjList] = useState(Array.from({ length: size }, () =>[]));
    const [labels, setLabels] = useState(Array.from({ length: size }, (_, i) => i));


    const handleNeighborsChange = (i, value) => {


        const vals = value
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s.length > 0);

        const newNeighbors = vals
            .map((v) => labels.indexOf(Number(v)))
            .filter((x) => labels.includes(x));
        

        // if (newNeighbors.length === 0 && vals.length > 0) {
        //     return; 
        // }

        // const cleanedValue = newNeighbors.join(",");


        const copy = adjList.map((row) => [...row]);
        copy[i] = newNeighbors;

        setAdjList(copy);

        return newNeighbors.join(",");
    
    };



    const loadGraph = () => {
        const nodes = [];

        for (let i = 0; i < size; i++) {
        nodes.push({
            data: { id: i, label: i },
            position: { x: 100 + i * 60, y: 200 }
            });
        }
        onLoadNodes(nodes);

        const edges = [];
        for (let i = 0; i < size; i++) {
            for (const el of adjList[i]) {
   
                    const exists = edges.some(
                        (edge) =>
                        edge.data?.source === i && edge.data?.target === el ||
                        (!directed && edge.data?.source === el && edge.data?.target === i)
                    );
                    if (!exists) {
                        edges.push({
                            data: {
                            id: `${i}-${el}`,
                            source: labels[i],
                            target: el
                            }
                        });
                    }
            
            }
        }

        onLoadEdges(edges);
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