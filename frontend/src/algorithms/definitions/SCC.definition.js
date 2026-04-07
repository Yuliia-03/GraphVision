import SCCAdapter from "../../components/graphPanel/visualizationLogic/algoRules/SCC/SCCAdapter"
import DAGAlgorithm from '../DAG'
import SCC_DataVisualization from "../../components/controlsPanel/dataContainers/SCC_Data"
import SCC_Controls from "../../components/controlsPanel/subtaskControls/SCC_Controls"
import { bfsStyle } from "../../components/graphPanel/visualizationLogic/visualizationStyle/bfsStyle"
import  AlgoDataStyle  from "../../pdf/dataStyles/algorithmDataStyle"
import SCCAlgorithm from "../SCC/SCC"

export const SCCDefinition = {

    id: "SCC",
    AdapterClass: SCCAdapter,
    AlgorithmClass: SCCAlgorithm,
    DataPanel: SCC_DataVisualization,
    AlgorithmControl: SCC_Controls,
    style: bfsStyle,

    dataCss: AlgoDataStyle,

    canRun: (params) => {
        if (!params.task) return false;
        return true;
    }

}