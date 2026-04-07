import DFSAdapter from "../../components/visualization/adaptors/DFSAdapter"
// import DFSAlgorithm from '../DFS'
import DFSAlgorithm from "../DFS/dfsAlgorithm"
import DFSDataVisualization from "../../components/controls/data_containers/DFSData"
import DFSControls from "../../components/controls/DFSControls"
import { bfsStyle } from "../../components/visualization/visualizationStyle/bfsStyle"
import  AlgoDataStyle  from "../../pdf/dataStyles/algorithmDataStyle"
import { dfsQuizConfig } from "../../components/interactive/generation/DFS/dfsQuizConfig"

export const DFSDefinition = {

    id: "DFS",
    AdapterClass: DFSAdapter,
    AlgorithmClass: DFSAlgorithm,

    DataPanel: DFSDataVisualization,
    AlgorithmControl: DFSControls,
    
    QuizzConfig: dfsQuizConfig,
    style: bfsStyle,
    dataCss: AlgoDataStyle,

    canRun: (params) => {
        if (!params.task) return false;
        if (!params.startNode) return false;
        if (params.task === "path" && !params.targetNode) return false;
        return true;
    }

}