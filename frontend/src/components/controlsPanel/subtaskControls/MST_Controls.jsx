import '../../../styles/BFSControl.css'

import  {SelectNode}  from "./dropdownComponents/SelectNode";
import  { useState } from "react";
import { SelectTask } from './dropdownComponents/SelectTask';
import { ButtonPanel } from '../ButtonPanel';

export default function MSTControls({mode = "explore" }) {

    const [params, setParams] = useState({});
    const update = (patch) => setParams(p => ({ ...p, ...patch }));
    return (
        <div>
            <SelectTask
                value={params.task}
                onChange={task => update({ task })}
                options={[
                { value: "prims", label: "Prim's Algorithm" },
                { value: "kruskals", label: "Kruskal's Algorithm" }
                ]}
            />

            {params.task === "prims" && (
                <SelectNode
                label="Source node"
                value={params.startNode}
                onChange={startNode => update({ startNode })}
                />
            )}

            
            <ButtonPanel params = {params} mode = {mode} />
        </div>
    );
}
