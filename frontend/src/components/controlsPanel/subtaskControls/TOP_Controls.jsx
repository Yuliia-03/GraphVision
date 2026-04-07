import '../../../styles/BFSControl.css'
import { ButtonPanel } from '../ButtonPanel';

export default function TOPControls({mode = "explore" }) {


    return (
        <div>
            <ButtonPanel params = {{returnTopo: true}} mode = {mode} />
        </div>
    );
}
