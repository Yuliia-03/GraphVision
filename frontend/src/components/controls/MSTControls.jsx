import '../../styles/BFSControl.css'
import { ButtonPanel } from './ButtonPanels';

import  {SelectNode}  from "./SelectNode";
import  { useState } from "react";
import { SelectTask } from './SelectTask';

export default function MSTControls() {

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

            
            <ButtonPanel params={params}/>
        </div>
    );
}
