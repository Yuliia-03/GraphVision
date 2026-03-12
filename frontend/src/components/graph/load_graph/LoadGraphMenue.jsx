import { useState } from "react";
import '../../../styles/LoadGraphMenue.css'
import LoadMatrix from './LoadMatrix'
import LoadAdjacencyList from "./LoadAdjacencyList";
import LoadEdgeList from './LoadEdgeList';
import GraphLoading from './LoadGraph'
import {getSamples} from "../../../services/api"

import {getSavedGraphs} from "../../../services/api"

export default function LoadGraph ({onClose}) {

    const [mode, setMode] = useState("");

    return(
        <div className="popup">
            <div className="window">


                {!mode && (
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        <h3>Load Graph</h3>
                        <button onClick={() => setMode("samples")}>Samples</button>
                        <button onClick={() => setMode("matrix")}>Adjacency Matrix</button>
                        <button onClick={() => setMode("list")}>Adjacency List</button>
                        <button onClick={() => setMode("edges")}>Edge List</button>
                        <button onClick={() => setMode("import")}>From Account</button>
                    </div>
                )}

                {mode === "samples" && (
                    <div>
                        <button type="button" className="btn btn-link p-0 back-button" onClick={() => setMode(null)} aria-label="Back">
                            <i className="bi bi-arrow-left"></i>
                        </button>

                        {/* <LoadSample
                            onClose={onClose}
                        /> */}
                        <GraphLoading fetchGraphs={getSamples} onClose={onClose} />
                    </div>
                )}

                {mode === "matrix" && (
                    <div>
                        <button type="button" className="btn btn-link p-0 back-button" onClick={() => setMode(null)} aria-label="Back">
                            <i className="bi bi-arrow-left"></i>
                        </button>

                        <LoadMatrix
                            onClose={onClose}
                        />
                    </div>
                )}

                {mode === "list" && (
                    <div>
                        <button type="button" className="btn btn-link p-0 back-button" onClick={() => setMode(null)} aria-label="Back">
                            <i className="bi bi-arrow-left"></i>
                        </button>

                        <LoadAdjacencyList
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
                            onClose={onClose}
                        />
                    </div>
                )}

                {mode === "import" && (
                    <div>
                        <button type="button" className="btn btn-link p-0 back-button" onClick={() => setMode(null)} aria-label="Back">
                            <i className="bi bi-arrow-left"></i>
                        </button>

                        {/* <LoadFromAccount
                            onClose={onClose}
                        /> */}
                        <GraphLoading fetchGraphs={getSavedGraphs} onClose={onClose} />
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