import '../../../styles/BFSControl.css'

import  {SelectNode}  from "./dropdownComponents/SelectNode";
import  { useState } from "react";
import { SelectTask } from './dropdownComponents/SelectTask';
import { ButtonPanel } from '../ButtonPanel';

export default function MSTControls({mode = "explore" }) {

    const [params, setParams] = useState({});
    const update = (patch) => setParams(p => ({ ...p, ...patch }));
    return (
        <div className="algo-controls">
            <div className="config-panel">
                <h3 className="config-title">MST</h3>

                <div className="config-row">
                    <SelectTask
                        value={params.task}
                        onChange={task => update({ task })}
                        options={[
                            { value: "prims", label: "Prim's Algorithm" },
                            { value: "kruskals", label: "Kruskal's Algorithm" }
                        ]}
                    />

                    {params.task === "prims" && (
                        <div className="form-row">
                            <SelectNode 
                                label="Starting node"
                                value={params.startNode}
                                onChange={startNode => update({ startNode })}
                            />
                        </div>
                    )}

                </div>
            </div>

            <ButtonPanel params={params} mode={mode} />
        </div>
    );
}
