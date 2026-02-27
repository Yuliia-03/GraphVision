import '../../styles/BFSControl.css'
import { ButtonPanel } from './ButtonPanels';

import  {SelectTask}  from "./SelectTask";
import  {SelectNode}  from "./SelectNode";
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
                    { value: "tarajan", label: "Tarjan's Algorithm" },
                    { value: "kosaraju", label: "Kosaraju's Algorithm" }
                ]}
            />

            {params.task === "startNode" && (
                <SelectNode
                label="Source node"
                value={params.startNode}
                onChange={startNode => update({ startNode })}
                />
            )}

            <ButtonPanel params={params}/>
        </div>
    );
}
