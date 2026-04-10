import TOPAdapter from "../../components/graphPanel/visualizationLogic/algoRules/TOP/TOPAdapter"
import DAGAlgorithm from '../DAG_TopOrder/DAG'
import TOPDataVisualization from "../../components/controlsPanel/dataContainers/TOPData"
import TOPControls from "../../components/controlsPanel/subtaskControls/TOP_Controls"
import { bfsStyle } from "../../components/graphPanel/visualizationLogic/visualizationStyle/bfsStyle"
import  AlgoDataStyle  from "../../pdf/dataStyles/algorithmDataStyle"
import { DAGQuizConfig } from "../../components/interactivePanel/quizGeneration/DAG/dagQuizConfig"

export const TOPDefinition = {

    id: "TOP",
    AdapterClass: TOPAdapter,
    AlgorithmClass: DAGAlgorithm,
    DataPanel: TOPDataVisualization,
    AlgorithmControl: TOPControls,
    QuizzConfig: DAGQuizConfig("topo"),
    style: bfsStyle,

    dataCss: AlgoDataStyle,
    canRun: () => true

}