import DAGAdapter from "../../components/graphPanel/visualizationLogic/algoRules/DAG/DAGAdapter"
import DAGAlgorithm from '../DAG_TopOrder/DAG'
import DAGDataVisualization from "../../components/controlsPanel/dataContainers/DAGData"
import DAGControls from "../../components/controlsPanel/subtaskControls/DAG_Controls"
import { bfsStyle } from "../../components/graphPanel/visualizationLogic/visualizationStyle/bfsStyle"
import  AlgoDataStyle  from "../../pdf/dataStyles/algorithmDataStyle"
import { DAGQuizConfig } from "../../components/interactivePanel/quizGeneration/DAG/dagQuizConfig"

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