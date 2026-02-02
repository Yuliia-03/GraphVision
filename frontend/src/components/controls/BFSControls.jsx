import '../../styles/Control.css'
import { useGraph } from '../../contexts/GraphContext';
import  {SelectTask}  from "./SelectTask";
import {SelectNode} from './SelectNode';

export default function BFSControls({ params, setParams }) {
    
    const { nodes } = useGraph();
    const update = (patch) => setParams(p => ({ ...p, ...patch }));
    
    return (
        <div>
            <SelectTask
                value={params.task}
                onChange={task => update({ task })}
                options={[
                { value: "traversal", label: "Basic Traversal" },
                { value: "shortest", label: "Shortest path from A to B" },
                { value: "distances", label: "All distances from A" }
                ]}
            />

            <SelectNode
                label="Starting node"
                value={params.startNode}
                onChange={startNode => update({ startNode })}
            />

            {params.task === "shortest" && (
                <SelectNode
                label="Target node"
                value={params.targetNode}
                exclude={params.startNode}
                onChange={targetNode => update({ targetNode })}
                />
            )}
        </div>
    );
}
