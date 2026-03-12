import SCCAdapter from "../../components/visualization/adaptors/SCCAdapter"
import DAGAlgorithm from '../DAG'
import SCC_DataVisualization from "../../components/controls/data_containers/SCC_Data"
import SCC_Controls from "../../components/controls/SCC_Controls"
import { bfsStyle } from "../../components/visualization/visualizationStyle/bfsStyle"
import SCCAlgorithm from "../SCC"

export const SCCDefinition = {

    id: "SCC",
    AdapterClass: SCCAdapter,
    AlgorithmClass: SCCAlgorithm,
    DataPanel: SCC_DataVisualization,
    AlgorithmControl: SCC_Controls,
    style: bfsStyle,

    canRun: (params) => {
        if (!params.task) return false;
        return true;
    }

}