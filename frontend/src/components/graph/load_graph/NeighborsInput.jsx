import { useEffect, useState } from "react";



export default function NeighborsInput({ i, neighbours, labels, onCommit }) {
  const [text, setText] = useState(
    neighbours.map((n) => labels[n]).join(", ")
  );

  useEffect(() => {
      setText(neighbours.map((n) => labels[n]).join(", "));
    }, [neighbours, labels]);

  return (
    <input
      value={text}
      onChange={(e) => setText(e.target.value)}
      onBlur={() => onCommit(i, text)}
      style={{ width: 150 }}
    />
  );
}
