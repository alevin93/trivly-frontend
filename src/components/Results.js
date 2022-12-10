import React, { useState, useEffect } from 'react';
import axios from '../api/axios'
import './styles.css';

function Results({user}) {

    const [results, setResults] = useState([]);
    const [resultClasses, setResultsClasses] = useState([]);

    useEffect(() => {
        getResults();
    })

    const getResults = async () => {
        if(localStorage.getItem("user")) {
            console.log(localStorage.getItem("user"))
            const result = await axios.post("/getResults", {"user": user})
                .then(result => {
                    let records = JSON.parse(result.data);
                    console.log(records);
                })
        } else {
            let tempKey = localStorage.getItem("catKey").split(",");
            console.log(tempKey);
            
        }
    }

    return (
        <>
        <div className="share-container" >
            <button className="share-today-button">Share Today's Results!</button>
            <button className="share-today-button">Share All Results!</button>
        </div>
            <div className="main-popup-container">
                <div className="results-box">
                </div>
            </div>
        </> 
    )
}

export default Results