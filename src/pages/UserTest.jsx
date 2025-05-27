import React from "react";
import { useNavigate } from "react-router-dom";
import RotatingBoxes from "../components/RotatingBoxes";
import FormInput from "../components/FormInput";

function UserTest() {
  const navigate = useNavigate();

  return (
    <div className="user-test-container">
      <p className="user-test-title">TO START ANALYSIS</p>
      <button className="back-button" onClick={() => navigate("/")}>
        <img
          className="back-button-icon"
          src="button-icon-shrunk.svg"
          width="40"
          height="40"
          alt="Back"
        />
        Back
      </button>
      <FormInput />
      <RotatingBoxes />
    </div>
  );
}

export default UserTest;
