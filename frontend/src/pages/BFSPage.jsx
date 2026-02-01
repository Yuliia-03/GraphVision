import { useState } from "react";
import '../styles/BFSpage.css'

import BFSControls from '../components/controls/BFSControls';
import { GraphProvider } from "../contexts/GraphContext";
import GraphSandbox from "../components/graph/Sandbox";


export default function BFSPage() {

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
                        <BFSControls
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

