import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="landing-title">Sophisticated skincare</h1>
        <div className="landing-paragraph">
          <p>
            Skinstric developed an A.I. that creates a highly-personalized
            routine tailored to what your skin needs.
          </p>
          <button className="landing-button" onClick={() => navigate("/testing")}>
            <div>Enter Experience</div>
            <object
              className="button-icon"
              type="image/svg+xml"
              data="button-icon-shrunk.svg"
              width="40"
              height="40"
            ></object>
          </button>
        </div>
        <button className="take-test-button" onClick={() => navigate("/testing")}>
          <div>Take Test</div>
          <object
            className="button-icon"
            type="image/svg+xml"
            data="button-icon-shrunk.svg"
            width="40"
            height="40"
          ></object>
        </button>
      </div>
    </div>
  );
}

export default Home;
