
import GraphConfig from "../GraphConfigurations/GraphConfig";
import '../../../styles/SandboxToolbar.css'
import { isLoggedIn } from "../../../services/api";

export default function SandboxToolbar({mode, setMode, onClear, onLoad, onSave = () => {}}) {

    const loggedIn = isLoggedIn();

    return (
       <div className="controls">
    
    {/* LEFT: actions */}
    <button className={mode === "add" ? "primary" : ""} onClick={() => setMode("add")}>
        Add
    </button>

    <button className={mode === "delete" ? "primary" : ""} onClick={() => setMode("delete")}>
        Delete
    </button>

    {loggedIn && <button onClick={onSave}>Save</button>}
    <button onClick={onLoad}>Load</button>
    <button onClick={onClear}>Clear</button>

    {/* PUSH RIGHT */}
    <div className="spacer" />

    {/* RIGHT: config */}
    <div className="toolbar-group">
        <GraphConfig />
    </div>

</div>
    );
}

