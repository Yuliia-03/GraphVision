import React, { useEffect, useState } from "react";
import '../styles/BFSpage.css'

import GraphSandbox from "../components/graph/Sandbox";
import MSTControls from '../components/controls/MSTControls';


export default function MSTPage() {
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
                        isWeighted={true}
                    />
                </div>

                <div className="col-md-6 border p-3">
                    <MSTControls
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

