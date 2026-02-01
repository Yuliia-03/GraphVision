import '../../styles/Control.css'
import { useGraph } from '../../contexts/GraphContext';

export default function BFSControls({
    task,
    setTask,
    startNode,
    setStartNode,
    targetNode,
    setTargetNode,
}) {
    const { nodes } = useGraph();
    return (
        <div>
            <label>Choose subtask:</label>
            <select value={task} onChange={(e) => setTask(e.target.value)} className='option'>
                <option value="">-- Select --</option>
                <option value="traversal">Basic Traversal</option>
                <option value="shortest">Shortest path from A to B</option>
                <option value="distances">All distances from A</option>
            </select>

            <label>Starting node:</label>
                <select
                value={startNode}
                onChange={(e) => setStartNode(e.target.value)}
                className='option'
            >
                <option value="">-- Select --</option>
                {nodes.map((node) => (
                <option key={node.data.id} value={String(node.data.id)}>
                    {node.data.label}
                </option>
                ))}
            </select>

            {
                task === "shortest" && (
                    <>
                        <label>Target node:</label>
                        <select
                            value={targetNode}
                            onChange={(e) => setTargetNode(e.target.value)}
                            className='option'
                        >
                            <option value="">-- Select --</option>
                            {nodes
                            .filter((node) => String(node.data.id) !== String(startNode))
                            .map((node) => (
                                <option key={node.data.id} value={String(node.data.id)}>
                                    {node.data.label}
                                </option>
                            ))}
                        </select>
                    
                    </>


                )
                
            }
        </div>
    );
}
