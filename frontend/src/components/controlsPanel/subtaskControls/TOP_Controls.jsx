import '../../../styles/BFSControl.css'
import { ButtonPanel } from '../ButtonPanel';

export default function TOPControls({mode = "explore" }) {


    return (
        <div className="algo-controls">
            <div className="config-panel">
                <h3 className="config-title">Topological Sort</h3>

            </div>
            <ButtonPanel params = {{returnTopo: true}} mode = {mode} />
        </div>
    );
}
