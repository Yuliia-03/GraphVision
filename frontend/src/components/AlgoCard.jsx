import React from "react";
import '../styles/AlgoCard.css';

export default function AlgoCard({ algoName, description, headerColor, link  }) {
  const openPage = () => {
    window.open(link, "_blank");
  };
  return (
    <div className="card" onClick={openPage} style={{ cursor: "pointer" }}>
      <div className="header" style={{ backgroundColor: headerColor }}></div>
      <div className="algo">
        <p>{algoName}</p>
      </div>
      <div className="description">
        <p>{description}</p>
      </div>
    </div>
  );
}
