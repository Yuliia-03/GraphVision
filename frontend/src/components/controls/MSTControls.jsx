import '../../styles/Control.css'
export default function BFSControls({ params, setParams }) {

    const update = (patch) => setParams(p => ({ ...p, ...patch }));
    return (
        <div>
            <label>Choose subtask:</label>
            <select value={params.task || ""} onChange={(e) => update({ task: e.target.value })}  className='option'>
                <option value="">-- Select --</option>
                <option value="traversal">Prim's Algorithm</option>
                <option value="shortest">Kruskal's Algorithm</option>
            </select>
        </div>
    );
}
