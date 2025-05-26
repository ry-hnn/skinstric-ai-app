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
        <div className="demographics-wrapper">
          <object 
            className="demographics-quadrant top" 
            data="/another-ingredient.png" 
            type="" 
            onClick={handleDemographicsClick}
          />
          <img 
            className="dotted-rectangle-overlay"
            src="/dottedRectangle.Analysis.svg" 
            alt="dotted rectangle"
          />
        </div>
        <object className="skin-type-quadrant left" data="/skin-type-quadrant.png" type=""></object>
        <object className="cosmetics-quadrant right" data="/cosmetics-quadrant.png" type=""></object>
        <object className="weather-quadrant bottom" data="/weather-quadrant.png" type=""></object>
      </div>
    </div>
  );
}

export default TestSections;
