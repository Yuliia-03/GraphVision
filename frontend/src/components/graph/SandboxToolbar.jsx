
import GraphConfig from "./GraphConfig";

export default function SandboxToolbar({setMode, onClear, onLoad}) {

    return (
        <div style={{ padding: 8, borderBottom: "1px solid #ccc" }}>
            <button onClick={() => setMode("add")}>Add</button>
            <button onClick={() => setMode("delete")}>Delete</button>
            <button onClick={() => setMode("none")}>Select</button>
            <button onClick={onLoad}>Load graph</button>
            <button onClick={onClear}>Clear</button>

            <GraphConfig />
        </div>
    );
}

