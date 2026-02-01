
import { useGraph } from "../../contexts/GraphContext";
import { addEdge } from './load_graph/graph_saving'
import GraphConfig from "./GraphConfig";

export default function SandboxToolbar({setMode, onClear, onLoad}) {

    const { rules, graphConfig, setGraphConfig, setEdges } = useGraph();

    // const handleDirectedChange = (checked) => {

    //     if(!rules.allowsUndirected && !checked) {
    //         alert(`${rules.name} is possible only on directed graphs`)
    //         return;
    //     }

    //     setGraphConfig((cfg) => ({
    //         ...cfg,
    //         directed: checked
    //     }))
    //     if (!nextDirected) {
                        
    //         setEdges((edges) =>
    //             edges.reduce(
    //                 (acc, edge) => addEdge(acc, edge, false, rules.allowSelfLoops),
    //                 []
    //             )
    //         );
    //     }

    // }

    return (
        <div style={{ padding: 8, borderBottom: "1px solid #ccc" }}>
            <button onClick={() => setMode("add")}>Add</button>
            <button onClick={() => setMode("delete")}>Delete</button>
            <button onClick={() => setMode("none")}>Select</button>
            <button onClick={onLoad}>Load graph</button>
            <button onClick={onClear}>Clear</button>

            {/* {rules.allowsDirected && 
            <label style={{ marginLeft: 10 }}>
                <input type="checkbox" checked={graphConfig.directed} onChange={(e) => handleDirectedChange(e.target.checked)}/>
                Directed
            </label>
            }
            { rules.requiresWeighted && 
            <label style={{ marginLeft: 10 }}>
                <input type="checkbox" checked={true} onClick={() => alert(`${rules.name} is possible only on weighted graphs`)} readOnly/>
                Weighted
            </label>} */}

            <GraphConfig />
        </div>
    );
}

