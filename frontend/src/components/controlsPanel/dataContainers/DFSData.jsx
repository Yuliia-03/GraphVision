import '../../../styles/data_container/algorithmDataPanel.css'
import { useGraph } from '../../../contexts/GraphContext';

export default function DFSDataVisualization({step}) {

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
                        <p>Stack </p><div className="node-list queue">
                            {mapLabels(step.inStack).map((node, i) => (
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
                    <h3>Result</h3>

                    {step.result.type === "traversal" && (
                        <>
                            <>
                                <p>DFS:</p>
                                <p>{mapLabels(step.result.dfs).join("->")}</p>
                            </>

                            <>
                                
                                <div className="note mt-3">
                                    <p>
                                        <strong>Note:</strong> DFS traversal depends on the order in which neighbors are processed.
                                        In this implementation, nodes are marked as visited when they are added to the stack,
                                        so each node appears only once and stack order strictly determines traversal.
                                    </p>
                                </div>
                            </>
                        </>
                    )}

                    {step.result.type === "path" && (
                        step.result.path ? (
                            <>
                                <p>DFS:</p>
                                <p>{mapLabels(step.result.path).join(" -> ")}</p>
                            </>

                        ) : (
                            <>
                                <p>No path found!</p>
                            </>
                        )
                    )}
                </div>
            )}

        
        </div>
    );

}