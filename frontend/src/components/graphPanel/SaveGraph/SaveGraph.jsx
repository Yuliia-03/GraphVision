import { useState } from "react";
import '../../../styles/LoadGraph/LoadGraphMenue.css'
import { saveGraph } from "../../../services/api";
import { useGraph } from "../../../contexts/GraphContext";

import {formatNodesForAPI, formatEdgesForAPI} from "../../../utils/saveGraphFormatter";


export default function SaveGraph ({onClose}) {

    const { nodes, edges, graphConfig} = useGraph();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSave = async (e) => {
         e.preventDefault();
                setError(null);
                setLoading(true);
                console.log(graphConfig.weighted)
        
                try {
                    await saveGraph(
                        {
                            name: title, 
                            description, 
                            nodes: formatNodesForAPI(nodes), 
                            edges: formatEdgesForAPI(edges), 
                            directed: !!graphConfig.directed, 
                            weighted: !!graphConfig.weighted ?? false
                        });
                    onClose();
                } catch (err) {
                    setError(err.message || "Login failed");
                } finally {
                    setLoading(false);
                }
    };

    return(
        <div className="graph-menue-popup">
            <div className="window">

                <div className="modal-header">
                    <button
                        className="back-button"
                        onClick={() => setMode("")}
                        style={{ visibility:  "hidden" }}
                    >
                        ←
                    </button>

                    <button className="close-x" onClick={onClose}>
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSave}>
                    <h3>Save Graph</h3>
                    <input type="text" placeholder="Title" id="title" onChange={(e) => setTitle(e.target.value)} required/>
                    <input type="text" placeholder="Description" id="description" onChange={(e) => setDescription(e.target.value)}/>
                    {error && <p className="error">{error}</p>}
                    <button type="submit" disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </button>
                </form>
                
                
            </div>
        </div>
    );


};