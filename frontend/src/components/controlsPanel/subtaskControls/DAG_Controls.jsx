import '../../../styles/BFSControl.css'
import { ButtonPanel } from '../ButtonPanel';

export default function DAGControls({mode = "explore" }) {


    return (
        <div className="algo-controls">
            <div className="config-panel">
                <h3>DAG</h3>
            </div>

            <ButtonPanel mode={mode} />
        </div>
    );
}
