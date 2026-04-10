import '../../../styles/data_container/mstDataPanel.css'
import { useGraph } from '../../../contexts/GraphContext';

export default function MSTDataVisualization({step}) {

    if (!step) return null;
    const { nodes } = useGraph();
    
    const idToLabel = Object.fromEntries(nodes.map(n => [n.data.id, n.data.label]));
    // const mapLabels = (arr) => arr.map(id => idToLabel[id] || id);
    // const getLabel = (id) => idToLabel[id] || id;
    const edgeIdsToLabels = (edges) => edges?.map(edge => {
        if (typeof edge === "string" && edge.includes("-")) {
            const [fromId, toId] = edge.split("-");
            const fromLabel = idToLabel[fromId] ?? fromId;
            const toLabel = idToLabel[toId] ?? toId;
            return `${fromLabel}-${toLabel}`;
        }
        return edge;
    });

    return (

        <div id="mst-data-panel" className="mst-data-panel">

            <div className="block "> 
                <p>Action: {step.message || ""}</p>
            </div>

            <div className="block inline">
                <p> Weight </p>
                <p className="weight">{step.weight}</p>
            </div>

            <div className="block inline">
                <p>MST Tree </p>
                <div className="node-list">
                    {edgeIdsToLabels(step.mstTree)?.map((edge, i) => (
                        <span key={i} className="edge-chip">
                            {edge}
                        </span>
                    ))}
                </div>
            </div>

            <div className="block inline">
                {step.visitedEdges && <p>Visited </p>}
                <div className="node-list">

                    {edgeIdsToLabels(step.visitedEdges)?.map((edge, i) => (
                        <span key={i} className="edge-chip">
                            {edge}
                        </span>

                    ))}
                    {step.inQueue && <p>Queue </p>}
                    {edgeIdsToLabels(step.inQueue)?.map((edge, i) => (
                        <>
                            <div key={i} className="edge-chip">
                                {edge}
                            </div>
                        </>
                    ))}
                </div>
            </div>
        
        </div>
    );

}