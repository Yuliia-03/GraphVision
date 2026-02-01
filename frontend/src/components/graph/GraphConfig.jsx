import { useGraph } from "../../contexts/GraphContext";
import { addEdge } from './load_graph/graph_saving'

export default function GraphConfig({}) {


    const { rules, graphConfig, setGraphConfig, setEdges } = useGraph();
    const handleDirectedChange = (checked) => {

        if(!rules.allowsDirected && checked) {
            alert(`${rules.name} is possible only on undirected graphs`)
            return;
        }

        if(!rules.allowsUndirected && !checked) {
            alert(`${rules.name} is possible only on directed graphs`)
            return;
        }

        setGraphConfig((cfg) => ({
            ...cfg,
            directed: checked
        }))
        if (!checked) {
                        
            setEdges((edges) =>
                edges.reduce(
                    (acc, edge) => addEdge(acc, edge, false, rules.allowSelfLoops),
                    []
                )
            );
        }

    }

    return (
        <div>
            <label style={{ marginLeft: 10 }}>
                <input type="checkbox" checked={graphConfig.directed} onChange={(e) => handleDirectedChange(e.target.checked)}/>
                Directed
            </label>
        
            <label style={{ marginLeft: 10 }}>
                <input type="checkbox" checked={rules.requiresWeighted} 
                onClick={() => {
                    if (rules.requiresWeighted) {alert(`${rules.name} is possible only on weighted graphs`)}
                    else {alert(`${rules.name} is possible only on unweighted graphs`)}
                } }
                readOnly/>
                Weighted
            </label>
        </div>
    );
}