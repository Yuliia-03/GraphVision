import { useState } from "react";
import "../../../styles/LoadGraph/LoadGraphMenue.css";
import LoadMatrix from "./LoadMatrix";
import LoadAdjacencyList from "./LoadAdjacencyList";
import LoadEdgeList from "./LoadEdgeList";
import GraphLoading from "./LoadGraph";
import { getSamples, getSavedGraphs } from "../../../services/api";

import { isLoggedIn } from "../../../services/api";

export default function LoadGraph({ onClose }) {
    const [mode, setMode] = useState("");

        const loggedIn = isLoggedIn();

    return (
        <div className="graph-menue-popup">
           <div className="window">

    <div className="modal-header">
        <button
            className="back-button"
            onClick={() => setMode("")}
            style={{ visibility: mode ? "visible" : "hidden" }}
        >
            ←
        </button>

        <button className="close-x" onClick={onClose}>
            ✕
        </button>
    </div>

    <div className="modal-body">

        {!mode && (
            <div className="menu">
                <h3>Load Graph</h3>

                <button className="menu-button" onClick={() => setMode("samples")}>
                    Samples
                </button>

                <button className="menu-button" onClick={() => setMode("matrix")}>
                    Adjacency Matrix
                </button>

                <button className="menu-button" onClick={() => setMode("list")}>
                    Adjacency List
                </button>

                <button className="menu-button" onClick={() => setMode("edges")}>
                    Edge List
                </button>

                {loggedIn && <button className="menu-button" onClick={() => setMode("import")}>
                    From Account
                </button>
                }
            </div>
        )}

        {mode === "samples" && (
            <GraphLoading fetchGraphs={getSamples} onClose={onClose} />
        )}

        {mode === "matrix" && (
            <LoadMatrix onClose={onClose} />
        )}

        {mode === "list" && (
            <LoadAdjacencyList onClose={onClose} />
        )}

        {mode === "edges" && (
            <LoadEdgeList onClose={onClose} />
        )}

        {mode === "import" && (
            <GraphLoading fetchGraphs={getSavedGraphs} onClose={onClose} />
        )}

    </div>
</div>
        </div>
    );
}