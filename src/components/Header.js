import React,{ useState, useEffect } from 'react';
import axios from '../api/axios';
import Timer from './Timer'
import './styles.css';


function Header({isTiming, stopTimer}) {

  const [timer, setTimer] = useState(10);



  useEffect(() => {
    if (isTiming) {
      let interval = setInterval(() => {
        if (timer <= 0 ) { setTimer(0); endTimer() }
        else { setTimer(timer => timer - 1); }
      }, 1000)

      return () => clearInterval(interval)
    } else {
      setTimer(10);
    }
  }, [isTiming, timer, stopTimer]);

  const endTimer = () => {
    stopTimer();
  }


  const user = localStorage.getItem("user");

  const handleLogout = () => {
    axios.post("/logout", {"user": user});
    localStorage.clear();
    window.location.reload();
  }


  if(!isTiming) {
    return (
      <div className="main-header-container">
        <div className="lesser-header-container">
          <p className="main-header-text">TRIVLY</p>
        </div>
        <div className="profile-buttons">
          <button className="logout-button" onClick={handleLogout} >Menu</button>
        </div>
      </div>
    )
    }
  if (isTiming) {
    return (
    <>
      <div className="main-header-container">
        <div className="lesser-header-container">
          <Timer timer={timer} />
        </div>
        <div className="profile-buttons">
        </div>
      </div>
    </>
    )
  }

}

export default Header