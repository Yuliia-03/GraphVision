import { useState } from "react";
import '../../../styles/LoadMatrix.css'
import { addEdge } from "../load_graph/graph_saving";
import { useGraph } from "../../../contexts/GraphContext";

import GraphConfig from "../GraphConfig";

export default function LoadMatrix({onClose,}) {

    const { rules, graphConfig, setNodes, setEdges, setGraphConfig  } = useGraph();

    const directed = graphConfig.directed;
    const weighted = rules.requiresWeighted;
    const setDirected = (value) => setGraphConfig((c) => ({ ...c, directed: value }));
    const [size, setSize] = useState(3);
    const [matrix, setMatrix] = useState(Array.from({ length: 3 }, () => Array(3).fill(0)));
    const [labels, setLabels] = useState(Array.from({ length: 3 }, (_, i) => i));


    const updateCell = (i, j, val) => {
        const copy = matrix.map((row) => [...row]);

        copy[i][j] = weighted ? val : val ? 1 : 0;

        if (!directed) {
            copy[j][i] = copy[i][j];
        }

        setMatrix(copy);
    };


    const loadGraph = () => {
        const nodes = [];

        for (let i = 0; i < size; i++) {
            nodes.push({
                data: { id: labels[i], label: labels[i] },
                position: { x: 100 + i * 60, y: 200 }
            });
        }

        setNodes(nodes);

        let edges = [];

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {

                if (matrix[i][j] !== 0) {
                    edges = addEdge(
                        edges,
                        {
                            data: {
                                source: labels[i],
                                target: labels[j],
                                ...(weighted ? { weight: matrix[i][j] } : {})
                            }
                        },
                        directed, rules.allowSelfLoops
                    );
                }
            }
        }

        setEdges(edges);
        onClose();
    };


    
    return(
        <div>
            <h3>Adjacency Matrix</h3>

            <label>
                Size:
                <input type="number" min={1} value={size}
                    onChange={(e) => {
                        const n = Number(e.target.value);
                        setSize(n);
                        setMatrix(Array.from({ length: n }, () => Array(n).fill(0)));
                        setLabels(Array.from({ length: n }, (_, i) => i));
                    }}
                />
            </label>

            <GraphConfig />

            <table border="1">
                <thead>
                    <tr>
                    <th></th>
                    {labels.map((label, j) => (
                        <th key={j}>
                        <input
                            value={label}
                            onChange={(e) => {
                            const copy = [...labels];
                            copy[j] = e.target.value;
                            setLabels(copy);
                            }}
                            style={{ width: 40 }}
                        />
                        </th>
                    ))}
                    </tr>
                </thead>

                <tbody>
                    {matrix.map((row, i) => (
                    <tr key={i}>
                        <th>
                        <input
                            value={labels[i]}
                            onChange={(e) => {
                            const copy = [...labels];
                            copy[i] = Number(e.target.value);
                            setLabels(copy);
                            }}
                            style={{ width: 40 }}
                        />
                        </th>

                        {row.map((val, j) => (
                        <td key={j}>
                            {weighted ? (
                                <input
                                    type="number"
                                    min="0"
                                    value={val}
                                    onChange={(e) =>
                                        updateCell(i, j, Number(e.target.value))
                                    }
                                    style={{ width: 50 }}
                                    readOnly={!rules.allowSelfLoops && i === j}
                                    />
                            ) : (
                                <input
                                    type="checkbox"
                                    checked={val !== 0}
                                    onChange={(e) =>
                                        updateCell(i, j, e.target.checked ? 1 : 0)
                                    }
                                    disabled={!rules.allowSelfLoops && i === j}
                                />
                            )}

                        </td>
                        ))}
                    </tr>
                    ))}
                </tbody>
            </table>


            <button onClick={loadGraph}>Load Graph</button>

        </div>
    );
}