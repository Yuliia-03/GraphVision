import '../../styles/Control.css'
import { ButtonPanel } from './ButtonPanels';

export default function DAGControls({ }) {


    return (
        <div>
            <ButtonPanel params={{ returnTopo: true}}/>
        </div>
    );
}
