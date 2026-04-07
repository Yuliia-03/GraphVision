import '../../../styles/data_container/algorithm-data-panel.css'

export default function DAGDataVisualization({ step }) {

    if (!step) return null;

    return (
        <div id="data-panel" className="bfs-data-panel">

            <div className="block">
                <p>Action: {step.message || ""}</p>
                {
                    step.current && 
                    <p>Current: {step.current || ""}</p>
                }
                
            </div>

            {step.inStack && (
                <div className="block">
                    <p>Stack</p>
                    <div className="node-list queue">
                        {step.inStack.map((node, i) => (
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
                    <p>Topological Order</p>
                    <div className="node-list visited">
                        {step.topoOrder.map(node => (
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