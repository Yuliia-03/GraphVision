import '../../styles/BFSControl.css'
import  {SelectTask}  from "./SelectTask";
import {SelectNode} from './SelectNode';
import { ButtonPanel } from './ButtonPanels';
import  { useState } from "react";

export default function BFSControls() {
    const [params, setParams] = useState({});
    const update = (patch) => setParams(p => ({ ...p, ...patch }));
    
    return (
        <div className="algo-controls">
            <div className="config-panel">
                <h3>BFS Configuration</h3>
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

            <ButtonPanel params={params}/>
        </div>
    );
}
