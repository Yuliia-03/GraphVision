import DAGAdapter from "../../components/visualization/adaptors/DAGAdapter"
import DAGAlgorithm from '../DAG'
import DAGDataVisualization from "../../components/controls/data_containers/DAGData"
import DAGControls from "../../components/controls/DAGControls"
import { bfsStyle } from "../../components/visualization/visualizationStyle/bfsStyle"

export const DAGDefinition = {

    id: "DAG",
    AdapterClass: DAGAdapter,
    AlgorithmClass: DAGAlgorithm,
    DataPanel: DAGDataVisualization,
    AlgorithmControl: DAGControls,
    style: bfsStyle

}