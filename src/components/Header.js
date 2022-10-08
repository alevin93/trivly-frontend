import React,{ useState } from 'react';
import axios from '../api/axios';
import cookies from 'react-cookies'
import './styles.css';


function Header() {

  const handleLogout = () => {
    axios.get("/logout");
    localStorage.clear();
    cookies.remove("jwt");
    //window.location.reload();
  }

  return (
    <div className="main-header-container">
      <div className="lesser-header-container">
        <p className="main-header-text">TRIVLY</p>
      </div>
      <div className="profile-buttons">
        <button onClick={handleLogout} >LOGOUT</button>
      </div>
    </div>
  )
}

export default Header