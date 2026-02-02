import DFSControls from "../components/controls/DFSControls";
import AlgoPage from "./AlgoPage"
export default function DFSPage() {
  return (
    <AlgoPage
      algorithm="DFS"
      Controls={DFSControls}
    />
  );
}
