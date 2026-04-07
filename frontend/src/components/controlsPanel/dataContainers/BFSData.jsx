import '../../../styles/data_container/algorithmDataPanel.css'

export default function BFSDataVisualization({step}) {

    if (!step) return null;

    return (

        <div id="data-panel" className="bfs-data-panel">

            {!step.isFinal && ( 
                <>
                    <div className="block"> 
                        <p>Action: {step.message || ""}</p>

                        <p>Current: {step.current || ""}</p>
                    </div>

                    <div className="block">
                        <p>Queue</p>
                        <div className="node-list queue">
                            {step.inQueue.map((node, i) => (
                                <span key={node}
                                    className={`node-chip ${i === 0 ? "front" : ""}`}>
                                    {node}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="block">
                        <p>Visited</p>
                        <div className="node-list visited">
                            {step.visited.map(node => (
                                <span key={node} className="node-chip visited">
                                    {node}
                                </span>
                            ))}
                        </div>
                    </div>

                </>
            )}

            {step.isFinal && (
                <div className="block result">
                    <h3>Result: {step.message}</h3>

                    {step.result.type === "traversal" && (
                        <>
                            <>
                                <p>BFS:</p>
                                <p>{step.result.bfs}</p>
                            </>

                            <>
                                <p>All possible BFS:</p>
                                <ul>
                                    {step.result.allTraversals.map((path, i) => (
                                        <li key={i}>
                                        {path.join(" -> ")}
                                        </li>
                                    ))}
                                </ul>

                            </>
                        </>
                    )}

                    {step.result.type === "shortest" && (
                        <>
                            <p>BFS:</p>
                            <p>{step.result.path.join(" -> ")}</p>
                        </>
                    )}
                    {step.result.type === "distances" && (
                        <>
                        <p>Shortest paths from source</p>
                        <ul>
                            {Object.entries(step.result.paths).map(([node, path]) => (
                            <li key={node}>
                                <strong>{node}:</strong> {path.join(" → ")}
                            </li>
                            ))}
                        </ul>
                        </>
                     )}
                </div>
            )}
        
        </div>
    );

}