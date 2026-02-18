import '../../styles/SelectTask.css'
export function SelectTask({ value, onChange, options }) {

    return (
        <div className="select-group">
            <label >Choose subtask:</label>
            <select
                value={value || ""}
                onChange={e => onChange(e.target.value)}
                className="select"
            >
                <option value="">-- Select --</option>
                {options.map(opt => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
                ))}
            </select>
        </div>
    );
}
