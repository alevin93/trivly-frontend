import React,{ useState } from 'react';
import axios from 'axios';
import cookies from 'react-cookies'
import './styles.css';


function Header() {

  const handleLogout = () => {
    axios.get("http://localhost:3000/logout");
    localStorage.clear();
    cookies.remove();
    window.location.reload();
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