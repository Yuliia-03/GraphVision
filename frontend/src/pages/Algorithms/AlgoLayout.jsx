
import { GraphProvider } from "../../contexts/GraphContext";
import GraphSandbox from "../../components/graphPanel/Sandbox/Sandbox";
import { AlgorithmDefinition } from "../../algorithms/definitions";
import { useState } from "react";

export default function AlgoPage({ algorithm }) {
    
    const algoDef = AlgorithmDefinition[algorithm];
    const [mode, setMode] = useState("explore");
    // const [showExample, setShowExample] = useState(false);
    
    return (
        <GraphProvider algorithm={algorithm}>
            <div className="container-fluid mt-3" style={{ height: "90vh" }}>
                <div className="row h-100">
                    
                    <div className="col-md-5 border d-flex flex-column h-100">
                        <GraphSandbox />
                    </div>

                    <div className="col-md-6 border p-3 h-100 overflow-auto">

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

                            {/* <button
                                className="btn btn-sm btn-secondary ms-auto"
                                onClick={() => setShowExample(true)}
                            >
                                Example
                            </button> */}
                        </div>

                        {mode === "explore" && (
                            <>
                                {algoDef.AlgorithmControl && <algoDef.AlgorithmControl />}
                            </>
                        )}

                        {mode === "interact" && (
                            <algoDef.AlgorithmControl mode="interactive"
                            />
                        )}
                        
                    </div>
                </div>

                {/* {showExample && (
                    <ExamplePopup
                        algorithm={algorithm}
                        onClose={() => setShowExample(false)}
                    />
                )} */}
                
            </div>
        </GraphProvider>
        
    );
}
