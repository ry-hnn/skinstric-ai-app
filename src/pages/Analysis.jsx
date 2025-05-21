import React from "react";
import RotatingBoxes from "../components/RotatingBoxes";
import TestSections from "../components/TestSections";
import { useNavigate } from "react-router-dom";

function Analysis() {
  const navigate = useNavigate();

  return (
    <div className="analysis-container">
      <button
        className="back-button"
        onClick={() => navigate("/start-analysis")}
      >
        <object
          className="back-button-icon"
          type="image/svg+xml"
          data="button-icon-shrunk.svg"
          width="40"
          height="40"
        ></object>
        Back
      </button>
      <TestSections />
    </div>
  );
}

export default Analysis;
