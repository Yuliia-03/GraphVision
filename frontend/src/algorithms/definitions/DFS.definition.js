import DFSAdapter from "../../components/graphPanel/visualizationLogic/algoRules/DFS/DFSAdapter"
import DFSAlgorithm from "../DFS/dfsAlgorithm"
import DFSDataVisualization from "../../components/controlsPanel/dataContainers/DFSData"
import DFSControls from "../../components/controlsPanel/subtaskControls/DFS_Controls"
import { bfsStyle } from "../../components/graphPanel/visualizationLogic/visualizationStyle/bfsStyle"
import  AlgoDataStyle  from "../../pdf/dataStyles/algorithmDataStyle"
import { dfsQuizConfig } from "../../components/interactivePanel/quizGeneration/DFS/dfsQuizConfig"

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