
import { GraphProvider } from "../contexts/GraphContext";
import GraphSandbox from "../components/graph/Sandbox";
import { AlgorithmDefinition } from "../algorithms/definitions";

export default function AlgoPage({ algorithm }) {
    
    const algoDef = AlgorithmDefinition[algorithm];

    return (
        <GraphProvider algorithm={algorithm}>
            <div className="container-fluid mt-3">
                <div className="row bfs-layout">
                    <div className="col-md-5 border graph-col">
                        <GraphSandbox />
                    </div>

                    <div className="col-md-6 border p-3">
                        {algoDef.AlgorithmControl && (
                            <algoDef.AlgorithmControl/>
                        )}
                        
                    </div>
                </div>
            </div>
        </GraphProvider>
        
    );
}
