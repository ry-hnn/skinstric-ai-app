import React from "react";

function Demographics() {
  return (
    <div>
      <button className="back-button" onClick={() => navigate("/testing")}>
        <object
          className="back-button-icon"
          type="image/svg+xml"
          data="button-icon-shrunk.svg"
          width="40"
          height="40"
        ></object>
        Back
      </button>
    </div>
  );
}

export default Demographics;
