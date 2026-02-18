import '../../styles/BFSControl.css'
import { ButtonPanel } from './ButtonPanels';

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

            
            <ButtonPanel params={params}/>
        </div>
    );
}
