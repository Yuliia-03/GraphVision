import '../../../styles/BFSControl.css'
import { ButtonPanel } from '../ButtonPanel';

import  {SelectTask}  from "./dropdownComponents/SelectTask";
import  { useState } from "react";
export default function SCC_Controls({mode = "explore" }) {
    
    const [params, setParams] = useState({});
    const update = (patch) => setParams(p => ({ ...p, ...patch }));
    
    return (
        <div>
            <SelectTask
                value={params.task}
                onChange={task => update({ task })}
                options={[
                    // { value: "tarajan", label: "Tarjan's Algorithm" },
                    { value: "kosaraju", label: "Kosaraju's Algorithm" }
                ]}
            />

            <ButtonPanel params = {params} mode = {mode} />
        </div>
    );
}
