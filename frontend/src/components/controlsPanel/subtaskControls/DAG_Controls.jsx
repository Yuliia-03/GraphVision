import '../../../styles/BFSControl.css'
import { ButtonPanel } from '../ButtonPanel';

export default function DAGControls({mode = "explore" }) {


    return (
        <div className="algo-controls">
  <div className="config-panel">
    <h3>DAG</h3>
    <div style={{ fontSize: 12, color: "#6b7280" }}>
      No configuration needed
    </div>
  </div>

  <ButtonPanel mode={mode} />
</div>
    );
}
