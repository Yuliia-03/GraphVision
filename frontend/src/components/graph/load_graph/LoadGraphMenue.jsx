import { useState } from "react";
import '../../../styles/LoadGraphMenue.css'
import LoadMatrix from './LoadMatrix'

export default function LoadGraph ({onClose, onLoad, setDirected, directed}) {

    const [mode, setMode] = useState("");
    const [text, setText] = useState("");


    return(
        <div className="popup">
            <div className="window">


                {!mode && (
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        <h3>Load Graph</h3>
                        <button disabled onClick={() => setMode("samples")}>Samples</button>
                        <button onClick={() => setMode("matrix")}>Adjacency Matrix</button>
                        <button disabled onClick={() => setMode("list")}>Adjacency List</button>
                        <button disabled onClick={() => setMode("edges")}>Edge List</button>
                        <button disabled>From Account</button>
                    </div>
                )}

                {mode === "matrix" && (
                    <div>
                        <button type="button" className="btn btn-link p-0 back-button" onClick={() => setMode(null)} aria-label="Back">
                            <i className="bi bi-arrow-left"></i>
                        </button>

                        <LoadMatrix
                            onLoad={onLoad}
                        />
                    </div>
                )}

                <button
                    type="button"
                    className="btn-close close-x"
                    aria-label="Close"
                    onClick={onClose}
                />

            </div>
        </div>
    );


};