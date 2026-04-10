import '../../../styles/data_container/algorithmDataPanel.css'
import { useGraph } from '../../../contexts/GraphContext';

export default function DAGDataVisualization({ step }) {

    if (!step) return null;
    const { nodes } = useGraph();
    
    const idToLabel = Object.fromEntries(nodes.map(n => [n.data.id, n.data.label]));
    const mapLabels = (arr) => arr.map(id => idToLabel[id] || id);
    const getLabel = (id) => idToLabel[id] || id;
    

    return (
        <div id="data-panel" className="bfs-data-panel">

            <div className="block">
                <p>Action: {step.message || ""}</p>
                {
                    step.current && 
                    <p>Current: {getLabel(step.current) || ""}</p>
                }
            </div>

            {step.inStack && (
                <div className="block">
                    <p>Stack</p>
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

            {step.topoOrder && (
                <div className="block">
                    <p>Visited</p>
                    <div className="node-list visited">
                        {mapLabels(step.topoOrder).map(node => (
                            <span key={node} className="node-chip visited">
                                {node}
                            </span>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
}