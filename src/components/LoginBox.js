import React from 'react';
import Login from './Login.js';
import Alert from './Alert.js'
import useAuth from './RequireAuth'

function LoginBox() {

  if (localStorage.getItem("user")) { console.log("USER IS: " + JSON.stringify(localStorage.getItem("user")))}
  
  if(localStorage.getItem("user")) {
    return (
      <div className="main-popup-container">
          <div className="lesser-popup-container">
              <div className="popup-login-wrapper">
                  <>
                  <p className="errmsg">You're Logged in you Motherfucker</p>
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
                  <Login />
                  </>
              </div>
              
          </div>
      </div>
    )
  }
}

export default LoginBox