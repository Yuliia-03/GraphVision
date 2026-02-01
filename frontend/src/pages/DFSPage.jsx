import React, { useEffect, useState } from "react";
import '../styles/BFSpage.css'

import GraphSandbox from "../components/graph/Sandbox";
import DFSControls from '../components/controls/DFSControls';

import { useGraph } from "../contexts/GraphContext";

import { GraphProvider } from "../contexts/GraphContext";

export default function DFSPage() {
    

    const [task, setTask] = useState("");
    const [startNode, setStartNode] = useState("");
    const [targetNode, setTargetNode] = useState("");

    return (
        <GraphProvider algorithm="DFS">

            <div className="container-fluid mt-3">
                <div className="row bfs-layout">
                    <div className="col-md-5 border graph-col">
                        <GraphSandbox />
                    </div>

                    <div className="col-md-6 border p-3">
                        <DFSControls
                            task={task}
                            setTask={setTask}
                            startNode={startNode}
                            setStartNode={setStartNode}
                            targetNode={targetNode}
                            setTargetNode={setTargetNode}
                        />
                    </div>
                </div>
            </div>
        </GraphProvider>
    );


}

