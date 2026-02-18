import '../../styles/BFSControl.css'
import { ButtonPanel } from './ButtonPanels';

import  {SelectTask}  from "./SelectTask";
import  { useState } from "react";
export default function SCC_Controls({ }) {
    
    const [params, setParams] = useState({});
    const update = (patch) => setParams(p => ({ ...p, ...patch }));
    
    return (
        <div>
            <SelectTask
                value={params.task}
                onChange={task => update({ task })}
                options={[
                { value: "traversal", label: "Tarjan's Algorithm" },
                { value: "shortest", label: "Kosaraju's Algorithm" }
                ]}
            />


            
            <ButtonPanel/>
        </div>
    );
}
