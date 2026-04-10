import '../../../styles/data_container/algorithmDataPanel.css'
import { useGraph } from '../../../contexts/GraphContext';


export default function BFSDataVisualization({step}) {

    if (!step) return null;
    const { nodes } = useGraph();

    const idToLabel = Object.fromEntries(nodes.map(n => [n.data.id, n.data.label]));
    const mapLabels = (arr) => arr.map(id => idToLabel[id] || id);
    const getLabel = (id) => idToLabel[id] || id;

    return (

        <div id="data-panel" className="bfs-data-panel">

            {!step.isFinal && ( 
                <>
                    <div className="block"> 
                        <p>Action: {step.message || ""}</p>

                        <p>Current: {getLabel(step.current) || ""}</p>
                    </div>

                    <div className="block">
                        <p>Queue</p>
                        <div className="node-list queue">
                            {mapLabels(step.inQueue).map((node, i) => (
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
                            {mapLabels(step.visited).map(node => (
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
                                <p>{mapLabels(step.result.bfs).join(" -> ")}</p>
                            </>

                            <>
                                <p>All possible BFS:</p>
                                <ul>
                                    {step.result.allTraversals.map((path, i) => (
                                        <li key={i}>
                                        {mapLabels(path).join(" -> ")}
                                        </li>
                                    ))}
                                </ul>

                            </>
                        </>
                    )}

                    {step.result.type === "shortest" && (
                        step.result.path ? (
                            <>
                                <p>BFS:</p>
                                <p>{mapLabels(step.result.path).join(" -> ")}</p>
                            </>

                        ) : (
                            <>
                                <p>No path found!</p>
                            </>
                        )
                    )}
                    {step.result.type === "distances" && (
                        <>
                        <p>Shortest paths from source</p>
                        <ul>
                            {Object.entries(step.result.paths).map(([node, path]) => (
                            <li key={node}>
                                <strong>{getLabel(node)}:</strong> {mapLabels(path).join(" → ")}
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