import { useState, useRef, useEffect } from "react";
import "../../../../styles/SelectTask.css";
import { createPortal } from "react-dom";

export function SelectTask({ value, onChange, options }) {
  
    const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState(null);
  const ref = useRef();

  const selected = options.find(o => o.value === value);

  // 📍 calculate position
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
        function handleClick(e) {
            if (ref.current && !ref.current.contains(e.target)) {
            setOpen(false);
            }
        }

        document.addEventListener("click", handleClick); // ✅ FIX
        return () => document.removeEventListener("click", handleClick);
    }, []);

  return (
    <>
      <div className="select-group" ref={ref}>
        <label>Task</label>

            <div
            className={`select ${open ? "open" : ""}`}
            onClick={() => (open ? setOpen(false) : openDropdown())}
            >
          {selected?.label || "Select..."}
        </div>
      </div>

      {/* 🔥 PORTAL DROPDOWN */}
      {open && coords &&
        createPortal(
          <div
            className="dropdown"
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
                className="dropdown-item"
                onClick={() => {
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