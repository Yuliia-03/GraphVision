import React, { useEffect, useState } from "react";
import '../styles/BFSpage.css'

import GraphSandbox from "../components/graph/Sandbox";
import BFSControls from '../components/controls/BFSControls';


export default function BFSPage() {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    const [task, setTask] = useState("");
    const [startNode, setStartNode] = useState("");
    const [targetNode, setTargetNode] = useState("");

    return (
        <div className="container-fluid mt-3">
            <div className="row bfs-layout">
                <div className="col-md-5 border graph-col">
                    <GraphSandbox
                        nodes={nodes}
                        setNodes={setNodes}
                        edges={edges}
                        setEdges={setEdges}
                    />
                </div>

                <div className="col-md-6 border p-3">
                    <BFSControls
                        nodes={nodes}
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
    );


}

