import React, { useEffect, useState } from "react";
import '../styles/BFSpage.css'

import GraphSandbox from "../components/graph/Sandbox";
import BFSControls from '../components/controls/BFSControls';

import { GraphProvider } from "../contexts/GraphContext";

export default function DAGPage() {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    const [task, setTask] = useState("");
    const [startNode, setStartNode] = useState("");
    const [targetNode, setTargetNode] = useState("");

    return (
        <div className="container-fluid mt-3">
            <div className="row bfs-layout">
                <div className="col-md-5 border graph-col">
                    <GraphProvider algorithm="DAG">
                        <GraphSandbox />
                    </GraphProvider>
                </div>

                <div className="col-md-6 border p-3">
                    
                </div>
            </div>
        </div>
    );


}

