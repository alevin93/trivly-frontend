import React, { useState } from 'react'
import axios from 'axios';


function Login() {

  const [usernameReg, setUsernameReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');


  function handleLogin() {
    axios.post('http://localhost:3000/test', { 
      username: usernameReg, 
      password: passwordReg })
    .then((response) => { console.log(response) } )
  }
  function handleRegister() {
    axios.post('http://localhost:3000/test', { 
      username: usernameReg, 
      password: passwordReg })
    .then((response) => { console.log(response) } )
  }
  
  return (
    <div name="form-container">
      <div className="welcome-message-wrapper">
        <p className="welcome-message-text">Welcome to Trivly</p>
      </div>
      <form className="login-form">
        <div className="email-wrapper">
          <input className="email-login-form" placeholder="Email" type="text" name="email" onChange={(e) => {
            setUsernameReg(e.target.value)
            }} />
        </div>
        <div className="password-wrapper">
          <input className="password-login-form" placeholder="Password" type="text" name="password" onChange={(e) => {
            setPasswordReg(e.target.value)
            }} />
        </div>
        <div className="submit-buttons-container">
          <button className="submit-button-login" onClick={handleLogin} >Login</button>
          <button className="submit-button-register" onClick={handleRegister} >Register</button>
        </div>
      </form>
    </div>
  )
}

export default Login;