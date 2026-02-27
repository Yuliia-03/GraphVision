import MSTAdapter from "../../components/visualization/adaptors/MSTAdapter"
import MSTAlgorithm from '../MST'
import MSTDataVisualization from "../../components/controls/data_containers/MSTData"
import MSTControls from "../../components/controls/MSTControls"
import { mstStyle } from "../../components/visualization/visualizationStyle/mstStyle"
import  mstDataCss  from "../../components/visualization/visualizationStyle/mstDataCss"


export const MSTDefinition = {

    id: "MST",
    AdapterClass: MSTAdapter,
    AlgorithmClass: MSTAlgorithm,
    DataPanel: MSTDataVisualization,
    AlgorithmControl: MSTControls,
    style: mstStyle,

    dataCss: mstDataCss,

    canRun: (params) => {
        if (!params.task) return false;
        if (params.task ==="prims" && !params.startNode) return false;
        return true;
    }
}