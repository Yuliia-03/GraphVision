import '../../../styles/BFSControl.css'
import { ButtonPanel } from '../ButtonPanel';

export default function DAGControls({mode = "explore" }) {


    return (
        <div>
            <ButtonPanel mode = {mode} />
        </div>
    );
}
