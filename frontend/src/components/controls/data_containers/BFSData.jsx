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

                    {typeof step.result === "string" && (
                        <p>{step.result}</p>
                    )}

                    {Array.isArray(step.result) && (
                        <p>{step.result.join(" → ")}</p>
                    )}

                    {typeof step.result === "object" && !Array.isArray(step.result) && (
                        <ul>
                            {Object.entries(step.result).map(([node, path]) => (
                                <li key={node}>
                                    {node}: {path.join(" → ")}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        
        </div>
    );

}