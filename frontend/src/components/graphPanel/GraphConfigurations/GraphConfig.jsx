import { useState } from "react";
import { useGraph } from "../../../contexts/GraphContext";
import { addEdge } from './graphConfigurations'
import Modal from "./AlertModal";
import '../../../styles/GraphConfig.css'
import { useTheme } from "../../../contexts/ThemeContext";
export default function GraphConfig() {

    const { rules, graphConfig, setGraphConfig, setEdges, edges, cyRef } = useGraph();
    const [modalMsg, setModalMsg] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const {theme} = useTheme();

    const showModal = (msg) => {
        setModalMsg(msg);
        setModalOpen(true);
    };

    const handleDirectedChange = (checked) => {
    if (!rules.allowsDirected && checked) {
        showModal(`${rules.name} is possible only on undirected graphs`);
        return;
    }

    if (!rules.allowsUndirected && !checked) {
        showModal(`${rules.name} is possible only on directed graphs`);
        return;
    }

    setGraphConfig(cfg => ({ ...cfg, directed: checked }));

    cyRef.current.edges().forEach(edge => {
        edge.classes("edge");

        edge.style({
            "source-arrow-shape": "none",
            "target-arrow-shape": checked ? "triangle" : "none"
        });
    });

    if (!checked) {
        setEdges(edges =>
            edges.reduce(
                (acc, edge) => addEdge(acc, edge, false, rules.allowSelfLoops),
                []
            )
        );
    }
};
    const handleWeightChange = (checked) => {
        setGraphConfig(cfg => ({ ...cfg, weighted: checked }));
    }


    return (
        <div className="graph-config">

    <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Graph Rule" theme={theme}>
        {modalMsg}
    </Modal>

    <label className="toggle">
        <input
            type="checkbox"
            checked={graphConfig.directed}
            onChange={e => handleDirectedChange(e.target.checked)}
        />
        <span className="slider" />
        <span className="label">Directed</span>
    </label>

    <label className="toggle">
        <input
            type="checkbox"
            checked={rules.name === "default" ? graphConfig.weighted : rules.requiresWeighted}
            onChange={(e) => {
                if (rules.name === "default") {
                    handleWeightChange(e.target.checked);
                } else {
                    showModal(
                        rules.requiresWeighted
                            ? `${rules.name} is possible only on weighted graphs`
                            : `${rules.name} is possible only on unweighted graphs`
                    );
                }
            }}
        />
        <span className="slider" />
        <span className="label">Weighted</span>
    </label>

</div>
    );
}