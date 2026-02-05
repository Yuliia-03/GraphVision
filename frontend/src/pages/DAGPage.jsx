
import '../styles/BFSpage.css'
import AlgoPage from "./AlgoPage"
import { ButtonPanel } from '../components/controls/ButtonPanels';
import DAGAlgorithm from '../algorithms/DAG';

export default function DAGPage() {

    const Controls = ({ params, setParams }) => (
        <ButtonPanel
            algorithm={DAGAlgorithm}
            params={{ ...params, returnTopo: false }}
            setParams={setParams}
        />);

    return (
        <AlgoPage algorithm="DAG" Controls={Controls}/>
    );


}

