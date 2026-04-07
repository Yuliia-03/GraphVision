import MSTAdapter from "../../components/visualization/adaptors/MSTAdapter"
// import MSTAlgorithm from "../MST/mstAlgorithm"
import MSTAlgorithm from "../MST"
import MSTDataVisualization from "../../components/controls/data_containers/MSTData"
import MSTControls from "../../components/controls/MSTControls"
import { mstStyle } from "../../components/visualization/visualizationStyle/mstStyle"
import  mstDataStyle  from "../../pdf/dataStyles/mstDataStyle"
import { kruskalMstQuizConfig, primsMstQuizConfig } from "../../components/interactive/generation/MST/mstQuizConfig"


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