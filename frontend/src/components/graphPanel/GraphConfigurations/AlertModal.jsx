import { createPortal } from "react-dom";
import "../../../styles/Modal.css"

export default function Modal({ open, onClose, title, children, theme }) {
    if (!open) return null;

    return createPortal(
        <div className={`modal-overlay ${theme}`} onClick={onClose}>
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    <h3>{title}</h3>
                </div>

                <div className="modal-body">
                    {children}
                </div>

                <div className="modal-footer">
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>,
        document.body
    );
}