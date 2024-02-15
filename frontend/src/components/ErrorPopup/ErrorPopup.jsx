import React from 'react';

const ErrorPopup = ({ message, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        padding: '50px',
        borderRadius: '5px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
        textAlign: 'center',
        backgroundColor: '#fff'
      }}>
        <p>{message}</p>
        <button onClick={onClose} style={{
          marginTop: '50px',
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px'
        }}>Close</button>
      </div>
    </div>
  );
};

export default ErrorPopup;
