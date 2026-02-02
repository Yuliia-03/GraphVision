import React, { useEffect, useState } from "react";
import { GraphProvider } from "../contexts/GraphContext";
import GraphSandbox from "../components/graph/Sandbox";


export default function AlgoPage({ algorithm, Controls }) {
  const [params, setParams] = useState({});

  return (
    <GraphProvider algorithm={algorithm}>
        <div className="container-fluid mt-3">
            <div className="row bfs-layout">
                <div className="col-md-5 border graph-col">
                    <GraphSandbox />
                </div>

                <div className="col-md-6 border p-3">
                    {Controls && (
                        <Controls
                            params={params}
                            setParams={setParams}
                        />
                    )}
                    {/* <RunnerPanel algorithm={algorithm} params={params} /> */}
                </div>
            </div>
        </div>
    </GraphProvider>
  );
}
