import DAGAdapter from "../../components/visualization/adaptors/DAGAdapter"
import DAGAlgorithm from '../DAG'
import DAGDataVisualization from "../../components/controls/data_containers/DAGData"
import DAGControls from "../../components/controls/DAGControls"
import { bfsStyle } from "../../components/visualization/visualizationStyle/bfsStyle"
import  AlgoDataStyle  from "../../pdf/dataStyles/algorithmDataStyle"
import { DAGQuizConfig } from "../../components/interactive/generation/DAG/dagQuizConfig"

export const DAGDefinition = {

    id: "DAG",
    AdapterClass: DAGAdapter,
    AlgorithmClass: DAGAlgorithm,
    DataPanel: DAGDataVisualization,
    AlgorithmControl: DAGControls,
    QuizzConfig: DAGQuizConfig("dag"),
    style: bfsStyle,
    dataCss: AlgoDataStyle,
    canRun: () => true

}