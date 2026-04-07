import SCCAdapter from "../../components/visualization/adaptors/SCCAdapter"
import DAGAlgorithm from '../DAG'
import SCC_DataVisualization from "../../components/controls/data_containers/SCC_Data"
import SCC_Controls from "../../components/controls/SCC_Controls"
import { bfsStyle } from "../../components/visualization/visualizationStyle/bfsStyle"
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