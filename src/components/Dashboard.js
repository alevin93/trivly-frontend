import React from 'react';
import './styles.css'
import Header from './Header.js';
import Popup from './Popup.js'

function Dashboard() {
  return (
    <div className="main-content-container">
        <Header />
        <Popup />

    </div>
  )
}

export default Dashboard;