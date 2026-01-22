import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/AlgoCard.css';

export default function AlgoCard({ algoName, description, headerColor, link  }) {
  const navigate = useNavigate();
  return (
    <div className="card" onClick={() => navigate(link)} style={{ cursor: "pointer" }}>
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
