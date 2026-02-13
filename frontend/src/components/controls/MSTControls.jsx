import '../../styles/Control.css'
import { ButtonPanel } from './ButtonPanels';

import  { useState } from "react";

export default function MSTControls() {

    const [params, setParams] = useState({});
    const update = (patch) => setParams(p => ({ ...p, ...patch }));
    return (
        <div>
            <label>Choose subtask:</label>
            <select value={params.task || ""} onChange={(e) => update({ task: e.target.value })}  className='option'>
                <option value="">-- Select --</option>
                <option value="prims">Prim's Algorithm</option>
                <option value="kruskals">Kruskal's Algorithm</option>
            </select>

            
            <ButtonPanel params={params}/>
        </div>
    );
}
