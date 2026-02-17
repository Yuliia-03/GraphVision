import '../../../styles/data_container/bfs.css'

export default function BFSDataVisualization({step}) {

    if (!step) return null;

    return (

        <div className="bfs-data-panel">

            {!step.isFinal && ( 
                <>
                    <div className="block"> 
                        <p>Action: {step.message || ""}</p>

                        <p>Current: {step.current || ""}</p>
                    </div>

                    <div className="block">
                        <p>Queue </p>
                        <p>{step.inQueue}</p>
                    </div>
                    <div className="block">
                        <p>Visited </p>
                        <p>{step.visited}</p>
                    </div>
                </>
            )}

            {step.isFinal && (
                <div className="block result">
                    <h3>Result</h3>

                    {step.result.type === "traversal" && (
                        <>
                            <>
                                <p>BFS:</p>
                                <p>{step.result.bfs}</p>
                            </>

                            <>
                                <p>All possible BFS:</p>
                                <ul>
                                    {step.result.paths.map((path, i) => (
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