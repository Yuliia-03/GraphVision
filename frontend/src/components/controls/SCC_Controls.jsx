import '../../styles/Control.css'

export default function SCC_Controls({
  nodes,
  task,
  setTask,
  startNode,
  setStartNode,
  targetNode,
  setTargetNode,
}) {
  return (
    <div>
        <label>Choose subtask:</label>
        <select value={task} onChange={(e) => setTask(e.target.value)} className='option'>
            <option value="">-- Select --</option>
            <option value="traversal">Tarjan's Algorithm</option>
            <option value="shortest">Kosaraju's Algorithm</option>
        </select>

    </div>
  );
}
