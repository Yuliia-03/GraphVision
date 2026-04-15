import { useEffect, useState } from "react";
import '../../../styles/LoadGraph/LoadAdjacencyList.css'


export default function NeighborsInput({ i, neighbours, labels, onCommit, weighted }) {
    const [text, setText] = useState(
        neighbours.map(n => weighted ? `${labels[n.node]}:${n.weight}` : labels[n.node]).join(", ")
    );

    useEffect(() => {
        setText(neighbours.map(n => weighted ? `${labels[n.node]}:${n.weight}` : labels[n.node]).join(", "));
    }, [neighbours, labels, weighted]);


    return (
        <input
            className="adj-node-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={() => onCommit(i, text)}
            style={{ width: 150 }}
        />
    );
}
