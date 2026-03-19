
import { GraphProvider } from "../contexts/GraphContext";
import GraphSandbox from "../components/graph/Sandbox";
import { AlgorithmDefinition } from "../algorithms/definitions";
import ExamplePopup from "../components/examples/ExamplePopup";
import { useState } from "react";
import { createInteractiveControls } from "../components/controls/InteractiveControl";
export default function AlgoPage({ algorithm }) {
    
    const algoDef = AlgorithmDefinition[algorithm];
    const [mode, setMode] = useState("explore");
    const [showExample, setShowExample] = useState(false);

    return (
        <GraphProvider algorithm={algorithm}>
            <div className="container-fluid mt-3">
                <div className="row bfs-layout">
                    
                    <div className="col-md-5 border graph-col">
                        <GraphSandbox />
                    </div>

                    <div className="col-md-6 border p-3">

                        <div className="d-flex mb-3">
                            <button
                                className={`btn btn-sm me-2 ${mode==="explore" ? "btn-primary":"btn-outline-primary"}`}
                                onClick={() => setMode("explore")}
                            >
                                Explore
                            </button>

                            <button
                                className={`btn btn-sm me-2 ${mode==="interact" ? "btn-primary":"btn-outline-primary"}`}
                                onClick={() => setMode("interact")}
                            >
                                Interactive
                            </button>

                            <button
                                className="btn btn-sm btn-secondary ms-auto"
                                onClick={() => setShowExample(true)}
                            >
                                Example
                            </button>
                        </div>

                        {mode === "explore" && (
                            <>
                                {algoDef.AlgorithmControl && <algoDef.AlgorithmControl />}
                            </>
                        )}

                        {mode === "interact" && (
                            createInteractiveControls(algoDef.AlgorithmControl)
                        )}
                        
                    </div>
                </div>

                {showExample && (
                    <ExamplePopup
                        algorithm={algorithm}
                        onClose={() => setShowExample(false)}
                    />
                )}
                
            </div>
        </GraphProvider>
        
    );
}
