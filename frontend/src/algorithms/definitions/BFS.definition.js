import BFSAdapter from "../../components/visualization/adaptors/BFSAdapter"
import BFSAlgorithm from '../BFS'
import BFSDataVisualization from "../../components/controls/data_containers/BFSData"
import BFSControls from "../../components/controls/BFSControls"
import { bfsStyle } from "../../components/visualization/visualizationStyle/bfsStyle"

export const BFSDefinition = {

    id: "BFS",
    AdapterClass: BFSAdapter,
    AlgorithmClass: BFSAlgorithm,
    DataPanel: BFSDataVisualization,
    AlgorithmControl: BFSControls,
    style: bfsStyle,

    canRun: (params) => {
        if (!params.task) return false;
        if (!params.startNode) return false;
        if (params.task === "shortest" && !params.targetNode) return false;
        return true;
    }

}