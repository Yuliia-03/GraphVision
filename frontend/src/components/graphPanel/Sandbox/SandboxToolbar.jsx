import GraphConfig from "../GraphConfigurations/GraphConfig";
import "../../../styles/SandboxToolbar.css";
import { isLoggedIn } from "../../../services/api";

export default function SandboxToolbar({
    mode,
    setMode,
    onClear,
    onLoad,
    onSave = () => {}
}) {

    const loggedIn = isLoggedIn();

    return (
        <div className="tabs sandbox-toolbar">

            <div className="mode-tabs">
                <button
                    className={mode === "add" ? "active" : ""}
                    onClick={() => setMode("add")}
                >
                    Add
                </button>

                <button
                    className={mode === "delete" ? "active" : ""}
                    onClick={() => setMode("delete")}
                >
                    Delete
                </button>
            </div>

            {loggedIn && <button onClick={onSave}>Save</button>}
            <button onClick={onLoad}>Load</button>
            <button onClick={onClear}>Clear</button>

            <div className="spacer" />

            <div className="toolbar-group">
                <GraphConfig />
            </div>

        </div>
    );
}