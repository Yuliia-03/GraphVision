import '../../../styles/data_container/algorithm-data-panel.css'

export default function DFSDataVisualization({step}) {

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
                        <p>Stack </p><div className="node-list queue">
                            {step.inStack.map((node, i) => (
                                <span key={node}
                                    className={`node-chip ${i == step.inStack.length - 1 ? "front" : ""}`}>
                                    {node}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="block">
                        <p>Visited </p>
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
                    <h3>Result</h3>

                    {/* {typeof step.result === "string" && (
                        <p>{step.result}</p>
                    )}

                    {Array.isArray(step.result) && (
                        <p>{step.result.join(" → ")}</p>
                    )} */}
                    {step.result.type === "traversal" && (
                        <>
                            <>
                                <p>DFS:</p>
                                <p>{step.result.dfs}</p>
                            </>

                            <>
                                <p>All possible DFS:</p>
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
                </div>
            )}
        
        </div>
    );

}