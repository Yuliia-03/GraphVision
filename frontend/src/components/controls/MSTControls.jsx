import '../../styles/Control.css'
export default function BFSControls({
  task,
  setTask
}) {
  return (
    <div>
        <label>Choose subtask:</label>
        <select value={task} onChange={(e) => setTask(e.target.value)} className='option'>
            <option value="">-- Select --</option>
            <option value="traversal">Prim's Algorithm</option>
            <option value="shortest">Kruskal's Algorithm</option>
        </select>
    </div>
  );
}
