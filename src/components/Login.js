import React, { useState, useRef, useEffect } from 'react'
import axios from '../api/axios';
import useAuth from '../hooks/useAuth'

//const USER_REGEX = /^[a-zA-z][a-zA-z0-9_]{3,23}$/;
//const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Login() {

  const { setAuth } = useAuth();

  const userRef = useRef();
  const errRef = useRef("None");

  const [user, setUsernameReg] = useState('');
  const [pwd, setPasswordReg] = useState('');
  const [errMsg, setErrMsg] = useState("Welcome to Trivly!");

  const handleLogin = async (e) => {
    //authService.login(usernameReg, passwordReg)
    e.preventDefault();
    try {
      const response = await axios.post('/auth', JSON.stringify({user, pwd}), 
        {
          headers: { 'Content-Type': 'application/json'},
          withCredentials: true
        }
      );
      console.log(JSON.stringify(response?.data))
      const accessToken = response?.data?.accessToken;
      setErrMsg("Success!");
      localStorage.setItem("user", user);
      setAuth({ user, pwd, accessToken })
      window.location.reload();
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password')
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed :(');
      }
      errRef.current.focus();
    }
  }
  const handleRegister = async (e) => {
    //authService.register(usernameReg, passwordReg)
    e.preventDefault();
    try {
      const response = await axios.post('/register', JSON.stringify({user, pwd}), 
        {
          headers: { 'Content-Type': 'application/json'},
          withCredentials: true
        }
      );
      } catch (err) {
        console.log(err);
      }
    handleLogin(e);
  }

  return (
    <>
    <div>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
            {errMsg}
          </p>
        </div>
    <div name="form-container">
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
  </>
  )
}

export default Login;