import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import "../../../../styles/SelectTask.css";
import { useGraph } from "../../../../contexts/GraphContext";

export function SelectNode({ label, value, onChange, exclude }) {
  const { nodes } = useGraph();

  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState(null);
  const ref = useRef();

  const options = nodes
    .filter(n => String(n.data.id) !== String(exclude))
    .map(n => ({
      value: String(n.data.id),
      label: n.data.label
    }));

  const selected = options.find(o => o.value === value);

  // 📍 open + position
  const openDropdown = () => {
    const rect = ref.current.getBoundingClientRect();

    setCoords({
      top: rect.bottom + window.scrollY + 4,
      left: rect.left + window.scrollX,
      width: Math.max(rect.width, 180)
    });

    setOpen(true);
  };

  // ✅ close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <div className="select-group" ref={ref}>
        <label>{label}</label>

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
            {options.length === 0 ? (
              <div className="dropdown-item disabled">No nodes</div>
            ) : (
              options.map(opt => (
                <div
                  key={opt.value}
                  className={`dropdown-item ${
                    value === opt.value ? "active" : ""
                  }`}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                >
                  {opt.label}
                </div>
              ))
            )}
          </div>,
          document.body
        )}
    </>
  );
}