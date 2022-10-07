import React, { useState, useEffect } from 'react';
import axios from '../api/axios'
import Login from './Login.js';
import Alert from './Alert.js'
import useAuth from './RequireAuth'

function QuizBox() {

    const [category, setCategory] = useState('');
    const [question, setQuestion] = useState('');
    const [user, setUser] = useState('');

    var categories = [];

    useEffect(() => {
        getFeed();
    })

    if (localStorage.getItem("user")  && user === '' ) { 
        setUser(JSON.stringify(localStorage.getItem("user")).replace(/['"]+/g, ''));
    } else if (user === '') {
        setUser("Guest");
    }

    

    const getFeed = async () => {
        const result = await axios.get("/feed").then(result => console.log(result.data));
    }


  
  if(localStorage.getItem("user")) {
    return (
      <div className="main-popup-container">
          <div className="lesser-popup-container">
              <div className="popup-login-wrapper">
                  <>
                  <button className="errmsg">Play</button>
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
                  <p className="errmsg">Play</p>
                  <p className="errmsg">Next topic is:</p>
                  </>
              </div>
              
          </div>
      </div>
    )
  }
}

export default QuizBox