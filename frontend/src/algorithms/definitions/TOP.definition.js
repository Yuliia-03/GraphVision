import TOPAdapter from "../../components/visualization/adaptors/TOPAdapter"
import DAGAlgorithm from '../DAG'
import TOPDataVisualization from "../../components/controls/data_containers/TOPData"
import TOPControls from "../../components/controls/TOPControls"
import { bfsStyle } from "../../components/visualization/visualizationStyle/bfsStyle"

export const TOPDefinition = {

    id: "TOP",
    AdapterClass: TOPAdapter,
    AlgorithmClass: DAGAlgorithm,
    DataPanel: TOPDataVisualization,
    AlgorithmControl: TOPControls,
    style: bfsStyle

}