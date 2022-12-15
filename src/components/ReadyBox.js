import React, { useState, useEffect } from 'react';

import axios from '../api/axios'
import Login from './Login.js';
import useAuth from './RequireAuth'

function ReadyBox({category, quizzing, isTesting}) {

  const [cat, setCat] = useState(category);

  useEffect(() => {
    setCat(category)
  }, [category])

  function setIsQuizzing() {
    quizzing(true);
  }
  
  if(localStorage.getItem("user") && !isTesting ) {
    return (
      <div className="main-popup-container">
          <div className="lesser-popup-container">
                  <>
                  <button className="play-button" onClick={setIsQuizzing} >Play</button>
                  <p className="errmsg">Next Topic: {cat}</p>
                  </>
          </div>
      </div>
    )

  } else if (!localStorage.getItem("user") && !isTesting) {
    return (
      <div className="main-popup-container">
          <div className="lesser-popup-container">
                  <>
                  <button className="play-button" onClick={setIsQuizzing} >Play as Guest</button>
                  <p className="errmsg">Next Topic: {cat}</p>
                  </>
          </div>
      </div>
    )
  }
  else if (isTesting) {
    return (
      <div className="main-popup-container">
          <div className="lesser-popup-container">
                  <>
                  <button className="play-button" onClick={setIsQuizzing} >Continue</button>
                  <p className="errmsg">Next Topic: {cat}</p>
                  </>
          </div>
      </div>
    )
  }
}

export default ReadyBox