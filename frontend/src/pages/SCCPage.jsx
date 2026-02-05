import SCC_Controls from "../components/controls/SCC_Controls";
import AlgoPage from "./AlgoPage"
export default function SCCPage() {
    return (
        <AlgoPage
        algorithm="SCC"
        Controls={SCC_Controls}
        />
    );
}
