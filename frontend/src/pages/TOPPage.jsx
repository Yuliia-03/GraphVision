import React, { useEffect, useState } from "react";
import '../styles/BFSpage.css'

import GraphSandbox from "../components/graph/Sandbox";
import BFSControls from '../components/controls/BFSControls';
import { GraphProvider } from "../contexts/GraphContext";

export default function TOPPage() {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    const [task, setTask] = useState("");
    const [startNode, setStartNode] = useState("");
    const [targetNode, setTargetNode] = useState("");

    return (
        <GraphProvider algorithm="Top_sort">
            <div className="container-fluid mt-3">
                <div className="row bfs-layout">
                    <div className="col-md-5 border graph-col">
                        <GraphSandbox />
                    </div>

                    <div className="col-md-6 border p-3">
                    </div>
                </div>
            </div>
        </GraphProvider>
    );


}

