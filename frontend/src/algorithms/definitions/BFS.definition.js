import BFSAdapter from "../../components/graphPanel/visualizationLogic/algoRules/BFS/BFSAdapter"
import BFSAlgorithm from '../BFS/bfsAlgorithm'
import BFSDataVisualization from "../../components/controlsPanel/dataContainers/BFSData"
import BFSControls from "../../components/controlsPanel/subtaskControls/BFS_Controls"
import { bfsStyle } from "../../components/graphPanel/visualizationLogic/visualizationStyle/bfsStyle"
import  AlgoDataStyle  from "../../pdf/dataStyles/algorithmDataStyle"
// import BFSExample from "../../components/examples/BFSExample"
import { bfsQuizConfig } from "../../components/interactivePanel/quizGeneration/BFS/BFSQuizConfig"

export const BFSDefinition = { 

    id: "BFS",

    AdapterClass: BFSAdapter,
    AlgorithmClass: BFSAlgorithm,

    DataPanel: BFSDataVisualization,
    AlgorithmControl: BFSControls,
    // ExampleContent: BFSExample,
    QuizzConfig: bfsQuizConfig,
    style: bfsStyle,
    dataCss: AlgoDataStyle,

    canRun: (params) => {
        if (!params.task) return false;
        if (!params.startNode) return false;
        if (params.task === "shortest" && !params.targetNode) return false;
        return true;
    }

}
