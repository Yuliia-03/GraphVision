

export default function SandboxToolbar({setMode, onClear, onLoad, setDirected, directed, weighted }) {
  return (
    <div style={{ padding: 8, borderBottom: "1px solid #ccc" }}>
        <button onClick={() => setMode("add")}>Add</button>
        <button onClick={() => setMode("delete")}>Delete</button>
        <button onClick={() => setMode("none")}>Select</button>
        <button onClick={onLoad}>Load graph</button>
        <button onClick={onClear}>Clear</button>

        <label style={{ marginLeft: 10 }}>
        <input type="checkbox" checked={directed} onChange={(e) => setDirected(e.target.checked)}/>
            Directed
        </label>
        { weighted && 
          <label style={{ marginLeft: 10 }}>
            <input type="checkbox" checked={true} onClick={() => alert("MST is possible only on weighted graphs")} readOnly/>
            Weighted
          </label>}
    </div>
  );
}

