import '../../styles/Control.css'

export default function SCC_Controls({ params, setParams }) {

    const update = (patch) => setParams(p => ({ ...p, ...patch }));
    return (
        <div>
            <label>Choose subtask:</label>
            <select value={params.task || ""} onChange={(e) => update({ task: e.target.value })} className='option'>
                <option value="">-- Select --</option>
                <option value="traversal">Tarjan's Algorithm</option>
                <option value="shortest">Kosaraju's Algorithm</option>
            </select>

        </div>
    );
}
