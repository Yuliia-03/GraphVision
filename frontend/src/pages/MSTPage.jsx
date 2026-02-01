import React, { useEffect, useState } from "react";
import '../styles/BFSpage.css'
import { GraphProvider } from "../contexts/GraphContext";
import GraphSandbox from "../components/graph/Sandbox";
import MSTControls from '../components/controls/MSTControls';


export default function MSTPage() {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    const [task, setTask] = useState("");
    const [startNode, setStartNode] = useState("");
    const [targetNode, setTargetNode] = useState("");

    return (
        <GraphProvider algorithm="MST">
            <div className="container-fluid mt-3">
                <div className="row bfs-layout">
                    <div className="col-md-5 border graph-col">
                        
                        <GraphSandbox />
                        
                    </div>

                    <div className="col-md-6 border p-3">
                        <MSTControls
                            task={task}
                            setTask={setTask}
                        />
                    </div>
                </div>
            </div>
        </GraphProvider>
    );


}

