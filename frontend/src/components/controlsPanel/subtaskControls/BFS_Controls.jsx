import '../../../styles/BFSControl.css'
import { useEffect } from 'react';
import  {SelectTask}  from "./dropdownComponents/SelectTask";
import {SelectNode} from './dropdownComponents/SelectNode';
import  { useState } from "react";
import { ButtonPanel } from '../ButtonPanel';

export default function BFSControls({mode = "explore" }) {
    const [params, setParams] = useState({});
    const update = (patch) => setParams(p => ({ ...p, ...patch }));
    
    useEffect(() => {
        if (mode === "interactive") {
            update({ task: "traversal" });
        }
    }, [mode]);

    const taskOptions = mode === "interactive"
        ? [{ value: "traversal", label: "Basic Traversal", disabled: true }]
        : [
            { value: "traversal", label: "Basic Traversal" },
            { value: "shortest", label: "Shortest path from A to B" },
            { value: "distances", label: "All distances from A" }
        ];
    
    return (
        <div className="algo-controls">
            <div className="config-panel">
                <h3>BFS Configuration</h3>
                
                <SelectTask
                    value={params.task}
                    onChange={task => update({ task })}
                    options={taskOptions}
                    disabled={mode === "interactive"}
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

            <ButtonPanel params = {params} mode = {mode} />
        </div>
    );
}
