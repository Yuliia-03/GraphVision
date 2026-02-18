import DFSAdapter from "../../components/visualization/adaptors/DFSAdapter"
import DFSAlgorithm from '../DFS'
import DFSDataVisualization from "../../components/controls/data_containers/DFSData"
import DFSControls from "../../components/controls/DFSControls"
import { bfsStyle } from "../../components/visualization/visualizationStyle/bfsStyle"

export const DFSDefinition = {

    id: "DFS",
    AdapterClass: DFSAdapter,
    AlgorithmClass: DFSAlgorithm,
    DataPanel: DFSDataVisualization,
    AlgorithmControl: DFSControls,
    style: bfsStyle,
    canRun: (params) => {
        if (!params.task) return false;
        if (!params.startNode) return false;
        if (params.task === "path" && !params.targetNode) return false;
        return true;
    }

}