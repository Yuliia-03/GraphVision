import '../../styles/Control.css'
import { useGraph } from '../../contexts/GraphContext';

import { ButtonPanel } from './ButtonPanels';
import DFSAlgorithm from '../../algorithms/DFS';
export default function DFSControls({ params, setParams }) {

    const { nodes } = useGraph();
    const update = (patch) => setParams(p => ({ ...p, ...patch }));

    return (
    <div>
        <label>Choose subtask:</label>
        <select value={params.task || ""} onChange={(e) => update({ task: e.target.value })} className='option'>
            <option value="">-- Select --</option>
            <option value="traversal">Basic Traversal</option>
            <option value="path">Check path from A to B</option>
            <option value="cycle_undirected">Cycle detection (Undirected)</option>
        </select>

        <label>Starting node:</label>
            <select
                value={params.startNode || ""}
                onChange={(e) => update({ startNode: e.target.value })}
                className='option'
            >
            <option value="">-- Select --</option>
            {nodes.map((node) => (
            <option key={node.data.id} value={String(node.data.id)}>
                {node.data.label}
            </option>
            ))}
        </select>

        {
            params.task === "path" && (
                <>
                    <label>Target node:</label>
                    <select
                        value={params.targetNode || ""}
                        onChange={(e) => update({ targetNode: e.target.value })}
                        className='option'
                    >
                        <option value="">-- Select --</option>
                        {nodes
                        .filter((node) => String(node.data.id) !== String(params.startNode))
                        .map((node) => (
                            <option key={node.data.id} value={String(node.data.id)}>
                                {node.data.label}
                            </option>
                        ))}
                    </select>
                
                </>


            )
            
        }
        <ButtonPanel params={params} algorithm={DFSAlgorithm} />        
    </div>
  );
}
