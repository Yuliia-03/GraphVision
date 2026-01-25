import React, { useEffect, useState } from "react";
import GraphCanvas from "../components/graph/GraphCanvas";
import '../styles/Home.css'

import AlgorithmLayout from "../components/layout/AlgorithmLayout";
import GraphSandbox from "../components/graph/Sandbox";
import BFSControls from '../components/controls/BFSControls';


export default function DFSPage() {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    return (
        <div style={{ width: "40vw", height: "50vh", border: "1px solid #ccc"}}>
            <GraphSandbox
                nodes={nodes}
                setNodes={setNodes}
                edges={edges}
                setEdges={setEdges}
            />
        </div>
    );
}

