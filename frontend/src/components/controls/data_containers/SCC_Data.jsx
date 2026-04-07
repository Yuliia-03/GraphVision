import '../../../styles/data_container/algorithm-data-panel.css'

export default function SCC_DataVisualization({ step }) {

    if (!step) return null;

    return (
        <div id="data-panel" className="bfs-data-panel">

            {/* Action & Current Node */}
            <div className="block">
                <p>Action: {step.message || ""}</p>
                <p>Current: {step.current || ""}</p>
            </div>

            {/* Stack */}
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

            {/* Visited */}
            {step.visited && (
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
            )}

            {/* First DFS: Finish times */}
            {step.phase === "firstDFS" && step.finishOrder && (
                <div className="block">
                    <p>Finish time</p>
                    <div className="node-list visited">
                        {step.finishOrder.map(node => (
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
                            {component.map(node => (
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