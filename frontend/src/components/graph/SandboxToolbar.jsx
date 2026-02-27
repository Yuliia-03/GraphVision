
import GraphConfig from "./GraphConfig";
import '../../styles/SandboxToolbar.css'
export default function SandboxToolbar({mode, setMode, onClear, onLoad}) {

    return (
        <div className="controls">
            <button className = {mode == "add"? "primary": ""} onClick={() => setMode("add")}>Add</button>
            <button className = {mode == "delete"? "primary": ""} onClick={() => setMode("delete")}>Delete</button>
            <button >Save</button>
            <button onClick={onLoad}>Load graph</button>
            <button onClick={onClear}>Clear</button>

            <GraphConfig />
        </div>
    );
}

