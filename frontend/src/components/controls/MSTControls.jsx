import '../../styles/Control.css'
import { ButtonPanel } from './ButtonPanels';
import MSTAlgorithm from "../../algorithms/MST";

export default function MSTControls({ params, setParams }) {

    const update = (patch) => setParams(p => ({ ...p, ...patch }));
    return (
        <div>
            <label>Choose subtask:</label>
            <select value={params.task || ""} onChange={(e) => update({ task: e.target.value })}  className='option'>
                <option value="">-- Select --</option>
                <option value="prims">Prim's Algorithm</option>
                <option value="kruskals">Kruskal's Algorithm</option>
            </select>

            
            <ButtonPanel params={params} algorithm={MSTAlgorithm}/>
        </div>
    );
}
