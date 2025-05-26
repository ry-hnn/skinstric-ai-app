import React from 'react';
import RotatingBoxes from './RotatingBoxes';

function CameraSetupLoadingScreen() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{ position: 'relative', width: '70vmin', height: '70vmin', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <RotatingBoxes />
        <img
          src="./camera.png"
          alt="Camera Icon"
          style={{
            position: 'absolute',
            width: '120px',
            height: '120px',
            zIndex: 10,
            pointerEvents: 'none'
          }}
        />
      </div>
      <p style={{
        marginTop: '20px',
        fontSize: '18px',
        fontWeight: '600',
        textTransform: 'uppercase',
        color: '#000',
        textAlign: 'center'
      }}>
        SETTING UP CAMERA
      </p>
    </div>
  );
}

export default CameraSetupLoadingScreen;
