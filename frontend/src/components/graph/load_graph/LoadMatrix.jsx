import { useState } from "react";
import '../../../styles/LoadMatrix.css'
export default function LoadMatrix({onLoad}) {

    const [size, setSize] = useState(3);
    const [directed, setDirected] = useState(false);
    const [matrix, setMatrix] = useState(Array.from({ length: 3 }, () => Array(3).fill(0)));


    
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
                    }}
                />
            </label>

        </div>
    );
}