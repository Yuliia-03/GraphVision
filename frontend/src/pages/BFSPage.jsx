import BFSControls from "../components/controls/BFSControls";
import AlgoPage from "./AlgoPage"
export default function BFSPage() {
  return (
    <AlgoPage
      algorithm="BFS"
      Controls={BFSControls}
    />
  );
}
