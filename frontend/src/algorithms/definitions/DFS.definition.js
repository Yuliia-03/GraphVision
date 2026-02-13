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
    style: bfsStyle

}