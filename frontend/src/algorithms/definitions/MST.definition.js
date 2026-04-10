import MSTAdapter from "../../components/graphPanel/visualizationLogic/algoRules/MST/MSTAdapter"
// import MSTAlgorithm from "../MST/mstAlgorithm"
import MSTAlgorithm from "../MST/MST"
import MSTDataVisualization from "../../components/controlsPanel/dataContainers/MSTData"
import MSTControls from "../../components/controlsPanel/subtaskControls/MST_Controls"
import { mstStyle } from "../../components/graphPanel/visualizationLogic/visualizationStyle/mstStyle"
import  mstDataStyle  from "../../pdf/dataStyles/mstDataStyle"
import { kruskalMstQuizConfig, primsMstQuizConfig } from "../../components/interactivePanel/quizGeneration/MST/mstQuizConfig"


export const MSTDefinition = {

    id: "MST",
    AdapterClass: MSTAdapter,
    AlgorithmClass: MSTAlgorithm,


    DataPanel: MSTDataVisualization,
    AlgorithmControl: MSTControls,

    QuizzConfig: (params) => {
        if (params.task === "kruskals") return kruskalMstQuizConfig;
        return primsMstQuizConfig;
    },
    style: mstStyle,

    dataCss: mstDataStyle,

    canRun: (params) => {
        if (!params.task) return false;
        if (params.task ==="prims" && !params.startNode) return false;
        return true;
    }
}