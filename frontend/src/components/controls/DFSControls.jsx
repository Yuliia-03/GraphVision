import '../../styles/BFSControl.css'

import  {SelectTask}  from "./SelectTask";
import {SelectNode} from './SelectNode';
import { useGraph } from '../../contexts/GraphContext';

import  { useState } from "react";
import { ButtonPanel } from './ButtonPanels';

export default function DFSControls() {

    const [params, setParams] = useState({});
    const { nodes } = useGraph();
    const update = (patch) => setParams(p => ({ ...p, ...patch }));

    return (
    <div className="algo-controls">

        <h3>DFS Configuration</h3>
        <SelectTask
            value={params.task}
            onChange={task => update({ task })}
            options={[
            { value: "traversal", label: "Basic Traversal" },
            { value: "path", label: "Check path from A to B" }
            ]}
        />

        <SelectNode
            label="Starting node"
            value={params.startNode}
            onChange={startNode => update({ startNode })}
        />

        {params.task === "path" && (
            <SelectNode
            label="Target node"
            value={params.targetNode}
            exclude={params.startNode}
            onChange={targetNode => update({ targetNode })}
            />
        )}
        <ButtonPanel params={params}/>        
    </div>
  );
}
