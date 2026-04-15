import '../../../styles/data_container/algorithmDataPanel.css'
import { useGraph } from '../../../contexts/GraphContext';

export default function SCC_DataVisualization({ step }) {

    if (!step) return null;

    const { nodes } = useGraph();
    const idToLabel = Object.fromEntries(nodes.map(n => [n.data.id, n.data.label]));
    const mapLabels = (arr) => arr.map(id => idToLabel[id] || id);
    const getLabel = (id) => idToLabel[id] || id;
    
    

    return (
        <div id="data-panel" className="bfs-data-panel">

            <div className="block">
                <p>Action: {step.message || ""}</p>
                { step.current && <p>Current: {getLabel(step.current) || ""}</p>}
            </div>

            {/* Stack */}
            {step.inStack && (
                <div className="block">
                    {step.phase === "firstDFS" ? <p>Stack</p> : <p>New component</p> }
                    <div className="node-list queue">
                        {mapLabels(step.inStack).map((node, i) => (
                            <span
                                key={node}
                                className={`node-chip ${i === step.inStack.length - 1 ? "front" : ""}`}
                            >
                                {node}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Visited */}
            {step.visited && (
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
            )}

            {/* First DFS: Finish times */}
            {step.phase === "firstDFS" && step.finishOrder && (
                <div className="block">
                    <p>Finish time</p>
                    <div className="node-list visited">
                        {mapLabels(step.finishOrder).map(node => (
                            <span key={node} className="node-chip visited">
                                {node}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {step.phase === "secondDFS" && step.remainingOrder && (
                <div className="block">
                    <p>Remaining order</p>
                    <div className="node-list visited">
                        {mapLabels(step.remainingOrder).map(node => (
                            <span key={node} className="node-chip visited">
                                {node}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Second DFS / Result: Components */}
            {(step.phase === "secondDFS" || step.phase === "result") && step.components && (
                <div className="block">
                    <p>Components</p>
                    {step.components.map((component, idx) => (
                        <div key={idx} className="node-list visited">
                            {mapLabels(component).map(node => (
                                <span key={node} className="node-chip visited">
                                    {node}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}