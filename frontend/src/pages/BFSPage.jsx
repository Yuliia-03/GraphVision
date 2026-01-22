import React, { useEffect, useState } from "react";
import GraphCanvas from "../components/graph/GraphCanvas";
import { fetchGraph } from "../services/api";
import '../styles/Home.css'

import AlgorithmLayout from "../components/layout/AlgorithmLayout";
import GraphSandbox from "../components/graph/Sandbox";
import BFSControls from '../components/controls/BFSControls';


export default function BFSPage() {
    const [elements, setElements] = useState([]);

    return (
        <div style={{ width: "40vw", height: "50vh", border: "1px solid #ccc"}}>
            <GraphSandbox elements={elements} setElements={setElements} />
        </div>
    );
}

