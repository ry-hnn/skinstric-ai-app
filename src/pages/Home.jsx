import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <button className="navbar-button">Enter Code</button>
      <div className="home-content">
        <button
          className="take-test-button"
          onClick={() => navigate("/testing")}
        >
          <div>TAKE TEST</div>
          <object
            className="test-button-icon"
            type="image/svg+xml"
            data="button-icon-shrunk.svg"
            width="40"
            height="40"
          ></object>
        </button>
        <h1 className="landing-title">Sophisticated skincare</h1>
        <div className="landing-paragraph">
          <p>
            Skinstric developed an A.I. that creates a highly-personalized
            routine tailored to what your skin needs.
          </p>
          <button
            className="landing-button"
            onClick={() => navigate("/testing")}
          >
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
        <div className="discover-ai-wrapper">
          <button className="discover-ai-button">
            <div>DISCOVER A.I.</div>
            <object
              className="button-icon"
              type="image/svg+xml"
              data="button-icon-shrunk.svg"
              width="40"
              height="40"
            ></object>
          </button>
        </div>
        <svg
          className="home-svg-left"
          width="302"
          height="604"
          viewBox="0 0 302 604"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M302 1L603 302L302 603L1 302L302 1Z"
            stroke="#A0A4AB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="0.1 8"
          />
        </svg>
        <svg
          className="home-svg"
          width="302"
          height="604"
          viewBox="0 0 302 604"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M302 1L603 302L302 603L1 302L302 1Z"
            stroke="#A0A4AB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="0.1 8"
          />
        </svg>
      </div>
    </div>
  );
}

export default Home;
