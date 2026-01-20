import React from "react";

const card = {
  border: "1px solid #ff0000ff",
  padding: "16px",
  margin: "16px",
  borderRadius: "8px",
  width: "200px"
};

const header = {
  height: "40px",
  backgroundColor: "#f19f9fff",
  borderRadius: "4px"
};

const algo = {
  marginTop: "12px",
  fontSize: "20px",
  fontWeight: "bold"
};

const description = {
  marginTop: "8px",
  fontSize: "14px",
  color: "#666"
};

export default function AlgoComponent({ algoName }) {
  return (
    <div style={card}>
      <div style={header}></div>
      <div style={algo}>
        <p>{algoName}</p>
      </div>
      <div style={description}>Description placeholder...</div>
    </div>
  );
}
