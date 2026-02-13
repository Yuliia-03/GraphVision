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
    style: bfsStyle

}