import { useState } from "react";
import '../../../styles/LoadMatrix.css'

export default function LoadMatrix({onLoadNodes, onLoadEdges, onClose}) {

    const [size, setSize] = useState(3);
    const [directed, setDirected] = useState(false);
    const [matrix, setMatrix] = useState(Array.from({ length: 3 }, () => Array(3).fill(0)));
    const [labels, setLabels] = useState(Array.from({ length: size }, (_, i) => i));


    const updateCell = (i, j, val) => {
        const copy = matrix.map((row) => [...row]);
        copy[i][j] = val ? 1 : 0;

        if (!directed) copy[j][i] = copy[i][j];

        setMatrix(copy);
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
            for (let j = 0; j < size; j++) {
                if (matrix[i][j] === 1) {
                    const exists = edges.some(
                        (el) =>
                        el.data?.source === i && el.data?.target === j ||
                        (!directed && el.data?.source === j && el.data?.target === i)
                    );
                    if (!exists) {
                        edges.push({
                            data: {
                            id: `${i}-${j}`,
                            source: i,
                            target: j
                            }
                        });
                    }
                }
            }
        }

        onLoadEdges(edges);
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
                        setLabels(Array.from({ length: n }, (_, i) => `N${i}`));
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
                            copy[i] = e.target.value;
                            setLabels(copy);
                            }}
                            style={{ width: 40 }}
                        />
                        </th>

                        {row.map((val, j) => (
                        <td key={j}>
                            <input
                            type="checkbox"
                            checked={val === 1}
                            onChange={(e) =>
                                updateCell(i, j, e.target.checked)
                            }
                            />
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