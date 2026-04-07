import { useState } from "react";

export default function Modal({ open, onClose, title, children }) {
    if (!open) return null;

    return (
        <div style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
        }}>
            <div style={{
                background: "#fff",
                padding: 20,
                borderRadius: 8,
                minWidth: 300,
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
            }}>
                <h3 style={{ marginTop: 0 }}>{title}</h3>
                <div>{children}</div>
                <button onClick={onClose} style={{ marginTop: 10 }}>Close</button>
            </div>
        </div>
    );
}