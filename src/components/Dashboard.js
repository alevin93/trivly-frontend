import React, { useState, useEffect } from 'react';
import './styles.css'
import axios from '../api/axios'
import Header from './Header.js';
import LoginBox from './LoginBox.js'
import ReadyBox from './ReadyBox'
import authService from '../services/auth.service.js'

function Dashboard() {

  const [category, setCategory] = useState(null)
  const [question, setQuestion] = useState('');
  const [user, setUser] = useState('');

  var categories = [];

  useEffect(() => {
      getFeed()
  })


  if (localStorage.getItem("user")  && user === '' ) { 
      setUser(JSON.stringify(localStorage.getItem("user")).replace(/['"]+/g, ''));
  } else if (user === '') {
      setUser("Guest");
  }

  

  const getFeed = async () => {
      if(!category) {
        console.log("user is: " + user);
      const result = await axios.get("/feed", {
        user: user
      })
          .then(result => {
              categories = result.data.split(',');
              for( var i = 0; i < categories.length; i++){
                  categories[i] = categories[i].replace(/[^\w\s]/gi, '')
                  console.log(categories[i])
              }
          })
          .then(() => {
              setCategory(categories[0]);
              console.log(category)  
          })
      }
  }

  if (localStorage.getItem('user')) {
  return (
    <div className="main-content-container">
        <Header />
        <ReadyBox category={category} />
    </div>
  )
  } else {
  return (
    <div className="main-content-container">
      <Header />
      <ReadyBox category={category} />
      <LoginBox />
    </div>
  )
  }
}

export default Dashboard;