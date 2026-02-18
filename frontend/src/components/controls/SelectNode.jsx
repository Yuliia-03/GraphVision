import '../../styles/SelectTask.css'
import { useGraph } from '../../contexts/GraphContext';

export function SelectNode({ label, value, onChange, exclude }) {
    const { nodes } = useGraph();

    return (
        <div className="select-group">
            <label>{label}:</label>
            <select
                value={value || ""}
                onChange={e => onChange(e.target.value)}
                className="select"
            >
                <option value="">-- Select --</option>
                {nodes
                .filter(n => String(n.data.id) !== String(exclude))
                .map(n => (
                    <option key={n.data.id} value={String(n.data.id)}>
                    {n.data.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
