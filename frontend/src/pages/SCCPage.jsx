import React, { useEffect, useState } from "react";
import '../styles/BFSpage.css'


import { GraphProvider } from "../contexts/GraphContext";
import GraphSandbox from "../components/graph/Sandbox";
import SCC_Controls from '../components/controls/SCC_Controls';


export default function SCCPage() {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    const [task, setTask] = useState("");
    const [startNode, setStartNode] = useState("");
    const [targetNode, setTargetNode] = useState("");

    return (
        <GraphProvider algorithm="SCC">
            <div className="container-fluid mt-3">
                <div className="row bfs-layout">
                    <div className="col-md-5 border graph-col">
                        
                         <GraphSandbox />
                    </div>

                    <div className="col-md-6 border p-3">
                        <SCC_Controls
                            task={task}
                            setTask={setTask}
                        />
                    </div>
                </div>
            </div>
        </GraphProvider>
    );


}

