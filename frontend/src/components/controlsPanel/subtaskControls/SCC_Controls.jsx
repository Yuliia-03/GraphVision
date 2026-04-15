import '../../../styles/BFSControl.css'
import { ButtonPanel } from '../ButtonPanel';

import  {SelectTask}  from "./dropdownComponents/SelectTask";
import  { useState } from "react";
export default function SCC_Controls({mode = "explore" }) {
    
    const [params, setParams] = useState({});
    const update = (patch) => setParams(p => ({ ...p, ...patch }));
    
    return (
        <div className="algo-controls">
            <div className="config-panel">
                <h3 className="config-title">Strongly Connected Components</h3>

                <div className="config-row">
                    <SelectTask
                        value={params.task}
                        onChange={task => update({ task })}
                        options={[
                            { value: "kosaraju", label: "Kosaraju's Algorithm" }
                        ]}
                    />
                </div>
            </div>
            <ButtonPanel params = {params} mode = {mode} />
        </div>
    );
}
