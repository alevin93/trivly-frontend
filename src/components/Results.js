import React, { useState, useEffect } from 'react';
import axios from '../api/axios'
import './styles.css';

function Results({user}) {

    const [results, setResults] = useState();
    const [cleanedResults, setCleanedResults] = useState(null);
    const [resultClasses, setResultsClasses] = useState([]);
    const [counter, setCounter] = useState(0);
    const [classChanger, setClassChanger] = useState("result-text");

    let catArray = [];
    let percArray = [];
    let streakArray = [];

    useEffect(() => {
        renderResults();
    }, [])

    const getResults = async () => {
        if(localStorage.getItem("user")) {
            console.log(localStorage.getItem("user"))
            const result = await axios.post("/getResults", {"user": user})
                .then(result => {
                    setResults(result.data);
                    console.log(results)
                })
        } else {
            let key = localStorage.getItem("catKey").split(',');
            let result = [];
            for(let i = 0; i < key.length; i++) {
                result[i] = JSON.parse(localStorage.getItem(`cat:${key[i]}`))
                console.log(result)
            }
            setResults(JSON.stringify(result))
        }
    }

    const cleanResults = () => {
        if (results) {
            for(let i = 0; i < JSON.parse(results)[0].length; i++) {

                catArray[i] = JSON.parse(results)[0][i].category;
                percArray[i] = Math.round((JSON.parse(results)[0][i].attempted / JSON.parse(results)[0][i].guesses) * 100) / 100;
                streakArray[i] = JSON.parse(results)[0][i].streak;

                console.log(catArray);
                console.log(percArray);
                console.log(streakArray);

            }

        }
        
    }

    const renderResults = (input) => {
        getResults();
        cleanResults();

        if(input) {
            return input.map((i, index) => {
                return index % 2 == 0 ? 
                    <p className="result-text" >{i}</p> :
                    <p className="result-text-alt" >{i}</p>
            })
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
                    <div className="result-box-cat">
                        <h6 className="result-header">💭</h6>
                        {renderResults(catArray)}
                    </div>
                    <div className="result-box-perc">
                        <h6 className="result-header">✔️</h6>
                        {renderResults(percArray)}
                    </div>
                    <div className="result-box-streak">
                        <h6 className="result-header">🔥</h6>
                        {renderResults(streakArray)}
                    </div>
                </div>
            </div>
        </> 
    )
}

export default Results