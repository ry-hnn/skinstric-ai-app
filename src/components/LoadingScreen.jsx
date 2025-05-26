import React from 'react';
import RotatingBoxes from './RotatingBoxes';

function LoadingScreen() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{ position: 'relative', width: '70vmin', height: '70vmin', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="loading-screen-boxes">
          <RotatingBoxes />
        </div>
        <p style={{
          position: 'absolute',
          fontSize: '18px',
          fontWeight: '600',
          textTransform: 'uppercase',
          margin: 0,
          zIndex: 2,
          textAlign: 'center'
        }}>
          Preparing Your Analysis
        </p>
      </div>
    </div>
  );
}

export default LoadingScreen;
