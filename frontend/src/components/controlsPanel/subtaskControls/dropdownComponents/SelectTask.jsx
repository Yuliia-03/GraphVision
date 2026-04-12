import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import "../../../../styles/SelectTask.css";

import { useTheme } from "../../../../contexts/ThemeContext";

export function SelectTask({ value, onChange, options }) {
    const [open, setOpen] = useState(false);
    const [coords, setCoords] = useState(null);
    const ref = useRef();

    const { theme } = useTheme();

    const selected = options.find(o => o.value === value);

    const openDropdown = () => {
        const rect = ref.current.getBoundingClientRect();

        setCoords({
            top: rect.bottom + window.scrollY + 4,
            left: rect.left + window.scrollX,
            width: rect.width
        });

        setOpen(true);
    };

    useEffect(() => {
        const handleClick = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setOpen(false);
        }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
    
}, []);

return (
    <>
        <div className={`select-group  ${theme}`} ref={ref}>
            <label>Task</label>

            <div
            className={`select ${open ? "open" : ""}`}
            onClick={() => (open ? setOpen(false) : openDropdown())}
            >
                {selected?.label || "Select..."}
            </div>
        </div>

        {open && coords &&
            createPortal(
            <div
                className="bfs-select-dropdown"
                style={{
                position: "absolute",
                top: coords.top,
                left: coords.left,
                width: coords.width,
                zIndex: 999999
                }}
            >
                {options.map(opt => (
                <div
                    key={opt.value}
                    className="bfs-select-item"
                    onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        onChange(opt.value);
                        setOpen(false);
                    }}
                >
                    {opt.label}
                </div>
                ))}
            </div>,
            document.body
        )}
    </>
  );
}