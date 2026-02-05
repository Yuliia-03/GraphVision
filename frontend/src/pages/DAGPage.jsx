
import '../styles/BFSpage.css'
import AlgoPage from "./AlgoPage"
import { ButtonPanel } from '../components/controls/ButtonPanels';
import DAGAlgorithm from '../algorithms/DAG';

export default function DAGPage() {

    const Controls = () => <ButtonPanel algorithm={DAGAlgorithm} />;

    return (
        <AlgoPage algorithm="DAG" Controls={Controls}/>
    );


}

