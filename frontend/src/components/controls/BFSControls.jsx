import '../../styles/Control.css'
import { useGraph } from '../../contexts/GraphContext';
import  {SelectTask}  from "./SelectTask";
import {SelectNode} from './SelectNode';
import { ButtonPanel } from './ButtonPanels';

import BFSAdapter from '../visualization/adaptors/BFSAdapter';

import BFSAlgorithm from '../../algorithms/BFS';

export default function BFSControls({ params, setParams }) {
    
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

            <ButtonPanel params={params} algorithm={BFSAlgorithm} adapter={BFSAdapter}/>
        </div>
    );
}
