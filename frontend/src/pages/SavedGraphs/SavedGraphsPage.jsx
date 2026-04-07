import { GraphProvider } from "../../contexts/GraphContext";
import SavedGraphContent from "./SavedGraphContent";

export default function SavedGraphsPage() {
  return (
    <GraphProvider algorithm="Default">
      <SavedGraphContent />
    </GraphProvider>
  );
}