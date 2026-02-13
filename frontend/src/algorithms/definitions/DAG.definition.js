import DAGAdapter from "../../components/visualization/adaptors/DAGAdapter"
import DAGAlgorithm from '../DAG'
import DAGDataVisualization from "../../components/controls/data_containers/DAGData"
import DAGControls from "../../components/controls/DAGControls"
import { dagStyle } from "../../components/visualization/visualizationStyle/dagStyle"

export const DAGDefinition = {

    id: "DAG",
    AdapterClass: DAGAdapter,
    AlgorithmClass: DAGAlgorithm,
    DataPanel: DAGDataVisualization,
    AlgorithmControl: DAGControls,
    style: dagStyle

}