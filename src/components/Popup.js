import React from 'react';
import Login from './Login.js';

function Popup() {
  return (
    <div className="main-popup-container">
        <div className="lesser-popup-container">
            <div className="popup-login-wrapper">
                <Login />
            </div>
            
        </div>
    </div>
  )
}

export default Popup