import React from "react";
import { useNavigate } from "react-router-dom";

function TestSections() {
  const navigate = useNavigate();

  const handleDemographicsClick = () => {
    navigate("/demographics");
  };

  return (
    <div className="test-sections">
      <div className="diamond-layout">
        <img 
          src="dottedRectangle.Analysis.svg" 
          alt="" 
          className="dotted-rectangle-overlay"
        />
        <img 
          src="dottedRectangle.Analysis.svg" 
          alt="dotted rectangle" 
          className="dotted-rectangle-overlay"
        />
        <div 
          className="quadrant top demographics-quadrant" 
          onClick={handleDemographicsClick}
        >
          <span className="quadrant-text">Demographics</span>
        </div>
        <div className="quadrant left skin-type-quadrant">
          <span className="quadrant-text">Skin Type Details</span>
        </div>
        <div className="quadrant right cosmetics-quadrant">
          <span className="quadrant-text">Cosmetic Concerns</span>
        </div>
        <div className="quadrant bottom weather-quadrant">
          <span className="quadrant-text">Weather</span>
        </div>
      </div>
    </div>
  );
}

export default TestSections;
