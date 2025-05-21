import React, { useState, useRef, useEffect } from "react";
import RotatingBoxes from "../components/RotatingBoxes";
import { useNavigate } from "react-router-dom";

function StartAnalysis() {
  const [showPopup, setShowPopup] = useState(false);
  const [cameraAllowed, setCameraAllowed] = useState(false);
  const videoRef = useRef(null);

  const navigate = useNavigate();

  const API_URL_TWO = import.meta.env.VITE_PHASE_TWO_API_URL;

  useEffect(() => {
    if (cameraAllowed) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        })
        .catch(() => {
          setCameraAllowed(false);
        });
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  }, [cameraAllowed]);

  const handleCameraClick = () => {
    setShowPopup(true);
  };

  const handleAllow = () => {
    setShowPopup(false);
    setCameraAllowed(true);
  };

  const handleDeny = () => {
    setShowPopup(false);
    setCameraAllowed(false);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const uploadImageToAPI = async (base64Image) => {
    try {
      const response = await fetch(API_URL_TWO, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64Image }),
      });

      const data = await response.json();
      console.log("API response:", data);
      navigate("/analysis");
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      const base64Image = await convertToBase64(file);
      console.log("Base64 image:", base64Image);
      await uploadImageToAPI(base64Image);
    }
  };

  return (
    <div className="test-result-container">
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

      <div className="small-box-wrapper">
        <RotatingBoxes />
        <div className="scan-text">
          <p>
            ALLOW A.I.
            <br />
            TO SCAN YOUR FACE
          </p>
        </div>
        <img
          className="line-circle"
          src="./lineCircle.png"
          alt="line with circle"
        />
        <img
          className="camera-icon"
          src="./camera.png"
          alt="Camera Icon"
          onClick={handleCameraClick}
        />
      </div>

      <div className="small-box-wrapper">
        <div className="access-gallery-text">
          <p>
            ALLOW A.I.
            <br />
            TO ACCESS GALLERY
          </p>
        </div>
        <img
          className="line-circle_gallery"
          src="./lineCircle.png"
          alt="line with circle"
        />
        <img
          className="gallery-icon"
          src="./gallery.png"
          alt="Gallery Icon"
          onClick={() => document.getElementById("fileInput").click()}
        />
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <RotatingBoxes />
      </div>

      {showPopup && (
        <div className="camera-popup-overlay">
          <div className="camera-popup">
            <p>ALLOW A.I. TO ACCESS YOUR CAMERA</p>
            <div className="pop-up-border"></div>
            <div className="popup-buttons">
              <button onClick={handleDeny}>Deny</button>
              <button onClick={handleAllow}>Allow</button>
            </div>
          </div>
        </div>
      )}

      {cameraAllowed && (
        <div className="camera-video-container">
          <video ref={videoRef} className="camera-video" autoPlay muted />
        </div>
      )}
    </div>
  );
}

export default StartAnalysis;
