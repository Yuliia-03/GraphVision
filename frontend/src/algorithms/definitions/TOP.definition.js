import TOPAdapter from "../../components/visualization/adaptors/TOPAdapter"
import DAGAlgorithm from '../DAG'
import TOPDataVisualization from "../../components/controls/data_containers/TOPData"
import TOPControls from "../../components/controls/TOPControls"
import { bfsStyle } from "../../components/visualization/visualizationStyle/bfsStyle"
import  AlgoDataStyle  from "../../pdf/dataStyles/algorithmDataStyle"
import { DAGQuizConfig } from "../../components/interactive/generation/DAG/dagQuizConfig"

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