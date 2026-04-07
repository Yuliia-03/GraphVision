
import GraphConfig from "../GraphConfigurations/GraphConfig";
import '../../../styles/SandboxToolbar.css'
import { isLoggedIn } from "../../../services/api";

export default function SandboxToolbar({mode, setMode, onClear, onLoad, onSave = () => {}}) {

    const loggedIn = isLoggedIn();

    return (
        <div className="controls">
            <button className = {mode == "add"? "primary": ""} onClick={() => setMode("add")}>Add</button>
            <button className = {mode == "delete"? "primary": ""} onClick={() => setMode("delete")}>Delete</button>
            {isLoggedIn() && <button onClick={onSave}>Save</button>}
            <button onClick={onLoad}>Load graph</button>
            <button onClick={onClear}>Clear</button>

            <GraphConfig />
        </div>
    );
}

