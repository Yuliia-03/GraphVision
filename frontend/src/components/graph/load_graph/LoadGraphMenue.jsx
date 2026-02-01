import { useState } from "react";
import '../../../styles/LoadGraphMenue.css'
import LoadMatrix from './LoadMatrix'
import LoadAdjacencyList from "./LoadAdjacencyList";
import LoadEdgeList from './LoadEdgeList';

export default function LoadGraph ({onClose, onLoadNodes, onLoadEdges,}) {

    const [mode, setMode] = useState("");
    const { rules, graphConfig, setNodes, setEdges  } = useGraph();

    return(
        <div className="popup">
            <div className="window">


                {!mode && (
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        <h3>Load Graph</h3>
                        <button disabled onClick={() => setMode("samples")}>Samples</button>
                        <button onClick={() => setMode("matrix")}>Adjacency Matrix</button>
                        <button onClick={() => setMode("list")}>Adjacency List</button>
                        <button onClick={() => setMode("edges")}>Edge List</button>
                        <button disabled>From Account</button>
                    </div>
                )}

                {mode === "matrix" && (
                    <div>
                        <button type="button" className="btn btn-link p-0 back-button" onClick={() => setMode(null)} aria-label="Back">
                            <i className="bi bi-arrow-left"></i>
                        </button>

                        <LoadMatrix
                            onLoadEdges={onLoadEdges}
                            onLoadNodes={onLoadNodes}
                            onClose={onClose}
                            setDirected={setDirected}
                            directed={directed}
                            weighted = {weighted}
                            setWeighted={setWeighted}
                        />
                    </div>
                )}

                {mode === "list" && (
                    <div>
                        <button type="button" className="btn btn-link p-0 back-button" onClick={() => setMode(null)} aria-label="Back">
                            <i className="bi bi-arrow-left"></i>
                        </button>

                        <LoadAdjacencyList
                            onLoadEdges={onLoadEdges}
                            onLoadNodes={onLoadNodes}
                            onClose={onClose}
                        />
                    </div>
                )}

                {mode === "edges" && (
                    <div>
                        <button type="button" className="btn btn-link p-0 back-button" onClick={() => setMode(null)} aria-label="Back">
                            <i className="bi bi-arrow-left"></i>
                        </button>

                        <LoadEdgeList
                            onLoadEdges={onLoadEdges}
                            onLoadNodes={onLoadNodes}
                            onClose={onClose}
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