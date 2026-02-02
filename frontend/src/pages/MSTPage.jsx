import MSTControls from "../components/controls/MSTControls";
import AlgoPage from "./AlgoPage"
export default function MSTPage() {
  return (
    <AlgoPage
      algorithm="MST"
      Controls={MSTControls}
    />
  );
}
