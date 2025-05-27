import React, { useState, useRef, useEffect } from "react";
import RotatingBoxes from "../components/RotatingBoxes";
import LoadingScreen from "../components/LoadingScreen";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function StartAnalysis() {
  const [showPopup, setShowPopup] = useState(false);
  const [cameraAllowed, setCameraAllowed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
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
      // Store API response data in localStorage
      localStorage.setItem('analysisData', JSON.stringify(data));
      navigate("/analysis");
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const capturePhoto = async () => {
    if (videoRef.current) {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      
      // Draw the current video frame
      const context = canvas.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      
      // Convert to base64
      const base64Image = canvas.toDataURL('image/jpeg');
      
      // Upload to API
      await uploadImageToAPI(base64Image);
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
    <>
      {isLoading && <LoadingScreen />}
      <div className="test-result-container">
        <button className="back-button" onClick={() => navigate("/testing")}>
          <img
            className="back-button-icon"
            src="button-icon-shrunk.svg"
            width="40"
            height="40"
            alt="Back"
          />
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
          <RotatingBoxes />
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
          <>
          <button className="back-button-icon-only" onClick={() => setCameraAllowed(false)}>
            <img
              className="back-button-icon"
              src="button-icon-shrunk.svg"
              width="40"
              height="40"
              alt="Back"
            />
          </button>
          <Link to="/" className="startanalysis-navbar-logo">
            Skinstric
          </Link>
          <div className="camera-video-container">
            <video ref={videoRef} className="camera-video" autoPlay muted />
            <div className="camera-button-container">
            <span className="take-photo-text">TAKE PICTURE</span>
            <button 
              className="take-photo-button"
              onClick={capturePhoto}
            >
              <img src="/camera-button.svg" alt="" />
            </button>
            </div>
            <img className="camera-instructions" src="/camera-instructions.svg" alt="" />
          </div>
          </>
        )}
      </div>
    </>
  );
}

export default StartAnalysis;
