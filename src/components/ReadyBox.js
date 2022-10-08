import React, { useState, useEffect } from 'react';
import axios from '../api/axios'
import Login from './Login.js';
import Alert from './Alert.js'
import useAuth from './RequireAuth'

function ReadyBox({category}) {
  
  if(localStorage.getItem("user")) {
    return (
      <div className="main-popup-container">
          <div className="lesser-popup-container">
              <div className="popup-login-wrapper">
                  <>
                  <button className="errmsg" >Play</button>
                  <p className="errmsg">Next Topic: {category}</p>
                  </>
              </div>
              
          </div>
      </div>
    )

  } else {
    return (
      <div className="main-popup-container">
          <div className="lesser-popup-container">
              <div className="popup-login-wrapper">
                  <>
                  <button className="errmsg" >Play</button>
                  <p className="errmsg">Next Topic: {category}</p>
                  </>
              </div>
              
          </div>
      </div>
    )
  }
}

export default ReadyBox