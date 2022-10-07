import React, { useState, useEffect } from 'react';
import './styles.css'
import Header from './Header.js';
import LoginBox from './LoginBox.js'
import QuizBox from './QuizBox'
import authService from '../services/auth.service.js'

function Dashboard() {

  if (localStorage.getItem('user')) {
  return (
    <div className="main-content-container">
        <Header />
        <QuizBox />
    </div>
  )
  } else {
  return (
    <div className="main-content-container">
      <Header />
      <QuizBox />
      <LoginBox />
    </div>
  )
  }
}

export default Dashboard;