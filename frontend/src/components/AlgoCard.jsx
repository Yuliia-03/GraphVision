import { useNavigate } from "react-router-dom";
import '../styles/AlgoCard.css';

export default function AlgoCard({ algoName, description, variant, link }) {
    const navigate = useNavigate();

    const variants = {
        dfs: "#ef4444",
        bfs: "#3b82f6",
        mst: "#8b5cf6",
        topo: "#22c55e",
        dag: "#f59e0b",
        scc: "#06b6d4"
    };

    const color = variants[variant] || "#64748b";

    return (
        <div className="algo-card" onClick={() => navigate(link)} style={{ cursor: "pointer" }}>
            <div className="header" style={{ backgroundColor: color }}></div>

            <div className="algo">
                <p>{algoName}</p>
            </div>

            <div className="description">
                <p>{description}</p>
            </div>
        </div>
    );
}