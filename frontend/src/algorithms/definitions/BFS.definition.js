import BFSAdapter from "../../components/visualization/adaptors/BFSAdapter"
// import BFSAlgorithm from '../BFS'
import BFSAlgorithm from '../BFS/bfsAlgorithm'
import BFSDataVisualization from "../../components/controls/data_containers/BFSData"
import BFSControls from "../../components/controls/BFSControls"
import { bfsStyle } from "../../components/visualization/visualizationStyle/bfsStyle"
import  AlgoDataStyle  from "../../pdf/dataStyles/algorithmDataStyle"
import BFSExample from "../../components/examples/BFSExample"
import { bfsQuizConfig } from "../../components/interactive/generation/BFS/BFSQuizConfig"

export const BFSDefinition = { 

    id: "BFS",

    AdapterClass: BFSAdapter,
    AlgorithmClass: BFSAlgorithm,

    DataPanel: BFSDataVisualization,
    AlgorithmControl: BFSControls,
    ExampleContent: BFSExample,
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
