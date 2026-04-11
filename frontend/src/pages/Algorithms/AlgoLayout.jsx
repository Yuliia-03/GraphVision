
import "../../styles/AlgoLayout.css"

import { GraphProvider } from "../../contexts/GraphContext";
import GraphSandbox from "../../components/graphPanel/Sandbox/Sandbox";
import { AlgorithmDefinition } from "../../algorithms/definitions";
import { useState, useRef, useEffect } from "react";

export default function AlgoPage({ algorithm }) {
    const algoDef = AlgorithmDefinition[algorithm];

    const [mode, setMode] = useState("explore");
    const [theme, setTheme] = useState("dark");
    const [leftWidth, setLeftWidth] = useState(68); // percentage

    const containerRef = useRef(null);
    const isDragging = useRef(false);

    // Handle dragging splitter
    const onMouseMove = (e) => {
        if (!isDragging.current) return;

        const container = containerRef.current;
        const rect = container.getBoundingClientRect();

        const newWidth = ((e.clientX - rect.left) / rect.width) * 100;

        if (newWidth > 30 && newWidth < 80) {
            setLeftWidth(newWidth);
        }
    };

    const stopDragging = () => {
        isDragging.current = false;
        document.body.style.cursor = "default";
    };

    useEffect(() => {
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", stopDragging);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", stopDragging);
        };
    }, []);

    return (
        <GraphProvider algorithm={algorithm}>
            <div className={`algo-app ${theme}`}>

                {/* TOP BAR */}
                <div className="top-bar">
                    {/* <div className="tabs">
                        <button onClick={() => setMode("explore")} className={mode === "explore" ? "active" : ""}>
                            Explore
                        </button>
                        <button onClick={() => setMode("interact")} className={mode === "interact" ? "active" : ""}>
                            Interactive
                        </button>
                    </div> */}

                    <button
                        className="theme-toggle"
                        onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
                    >
                        {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
                    </button>
                </div>

                <div className="workspace" ref={containerRef}>

                    <div
                        className="panel sandbox"
                        style={{ width: `${leftWidth}%` }}
                    >
                        <GraphSandbox />
                    </div>

                    <div
                        className="splitter"
                        onMouseDown={() => {
                            isDragging.current = true;
                            document.body.style.cursor = "col-resize";
                        }}
                    />

                    <div
                        className="panel control"
                        style={{ width: `${100 - leftWidth}%` }}
                    >
                        <div className="tabs">
                        <button onClick={() => setMode("explore")} className={mode === "explore" ? "active" : ""}>
                            Explore
                        </button>
                        <button onClick={() => setMode("interact")} className={mode === "interact" ? "active" : ""}>
                            Interactive
                        </button>
                    </div>
                        <div className="control-content">
                            {mode === "explore" && algoDef.AlgorithmControl && (
                                <algoDef.AlgorithmControl />
                            )}

                            {mode === "interact" && (
                                <algoDef.AlgorithmControl mode="interactive" />
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </GraphProvider>
    );
}