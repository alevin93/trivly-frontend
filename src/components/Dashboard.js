import React, { useState, useEffect, useRef } from 'react';
import './styles.css';
import axios from '../api/axios';
import Header from './Header.js';
import LoginBox from './LoginBox.js';
import ReadyBox from './ReadyBox';
import QuizBox from './QuizBox';
import Results from './Results';

function Dashboard() {

  const [category, setCategory] = useState(null);
  const [nextCategory, setNextCategory] = useState('');
  const [isQuizzing, setIsQuizzing] = useState(false);
  const [finishedQuestion, setFinishedQuestion] = useState(false);
  const [user, setUser] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [count, setCount] = useState(0);
  const [isTiming, setIsTiming] = useState(false);
  const [canAnswer, setCanAnswer] = useState(true);

  let headerRef = useRef(null);

  var index = 0;
  var categories = [];

  useEffect(() => {
      getUser()
      getFeed()
  })

  const childFinishedQuestion = () => {
    let temparr = localStorage.getItem("categories").split(',');
    if(!temparr[1]) {
      setIsQuizzing(false);
      setShowResults(true);
    }
    setFinishedQuestion(true);
    setIsTiming(false);
    setCanAnswer(false);
    var temp = localStorage.getItem("categories").split(',');
    temp.shift();
    localStorage.setItem("categories", temp);
    setNextCategory(temp[0]);
  }

  const stopTimer = () => {
    setCount(count+4);
    let temparr = localStorage.getItem("categories").split(',');
    if(!temparr[1]) {
      setIsQuizzing(false);
      setShowResults(true);
    }
    setFinishedQuestion(true);
    setIsTiming(false);
    setCanAnswer(false);
    var temp = localStorage.getItem("categories").split(',');
    temp.shift();
    localStorage.setItem("categories", temp);
    setNextCategory(temp[0]);
    logResults();
  }

  const childCanAnswer = (bool) => {
    setCanAnswer(bool);
  }
 

  function startQuestion() {
    setCanAnswer(true);
    setIsQuizzing(true);
    setIsTiming(true);
    setFinishedQuestion(false);
    setCount(0);
    setCategory(nextCategory);
  }

  const getUser = () => {
    if (localStorage.getItem("user")) { 
        setUser(JSON.stringify(localStorage.getItem("user")).replace(/['"]+/g, ''));
        
    } else {
        setUser("Guest");
    }

    console.log("User is: " + user)
  }

  const getFeed = async () => {
      if (user == "Guest" && !category && localStorage.getItem("categories")) {
        categories = localStorage.getItem("categories").split(',')
        setNextCategory(categories[0])
        setCategory(categories[0])
      } 
      else if(!category) {
      const result = await axios.post("/feed", {"user": user})
          .then(result => {
            if(result.data == "8675309") {
              setIsQuizzing(false);
              setShowResults(true);
            } else {
              categories = result.data.split(',');
              for( var i = 0; i < categories.length; i++){
                  categories[i] = categories[i].replace(/[^\w\s]/gi, '')
              }
            }
          })
          .then(() => {
              localStorage.setItem("categories", categories);
              setNextCategory(categories[0]);
              setCategory(categories[0]);
          })
      }
  }

  const updateCount = () => {
    console.log("UPDATE COUNT RUN")
    setCount(count+1)
    console.log("Dashboard Guesses: " + count)
  }

  const logResults = async () => {
    const guesses = count;
    const username = localStorage.getItem("user");
    if(username && username !== "Guest") {
      await axios.post("/results", { "user": username, "category": category, "guesses": guesses })
    }
    if(!localStorage.getItem(`cat:${category}`)) {
        localStorage.setItem(`cat:${category}`, JSON.stringify({
            category: category,
            guesses: guesses,
            attempted: 1,
        }))
    } else {
        var temp = JSON.parse(localStorage.getItem(`cat:${category}`));
        temp.guesses = temp.guesses + guesses;
        temp.attempted = temp.attempted+1;
        localStorage.setItem(`cat:${category}`, JSON.stringify(temp))
    }

    console.log(JSON.parse(localStorage.getItem(`cat:${category}`)))
}

  ///////////////////////////// START JSX

  ///////////////////////////// RESULTS SCREENS

  if (showResults && localStorage.getItem("user")) {
    return (
      <div className="main-content-container">
        <Header headerRef={headerRef} />
        <Results user={user} />
    </div>
    )
  }

  if (showResults && !localStorage.getItem("user")) {
    return (
      <div className="main-content-container">
        <Header headerRef={headerRef} />
        <Results user={user} />
    </div>
    )
  }

  ////////////////////////////// MAIN SCREEN

  if (localStorage.getItem('user')  && !isQuizzing) {
  return (
    <div className="main-content-container">
        <Header isTiming={isTiming} stopTimer={stopTimer} />
        <ReadyBox quizzing={startQuestion} category={nextCategory} />
    </div>
  )
  } else if (!localStorage.getItem('user')  && !isQuizzing) {
  return (
    <div className="main-content-container">
      <Header isTiming={isTiming} stopTimer={stopTimer} />
      <ReadyBox quizzing={startQuestion} category={nextCategory} />
      <LoginBox />
    </div>
  )
  
  //////////////////////////////// TAKING QUIZ
  } else if (isQuizzing && localStorage.getItem('user') && !finishedQuestion) {
    return (
      <div>
        <Header isTiming={isTiming} stopTimer={stopTimer} logResults={logResults}/>
        <QuizBox updateCount={updateCount} logResults={logResults} category={category} finishedQuestion={childFinishedQuestion} canAnswer={canAnswer} setCanAnswer={childCanAnswer} />
      </div>
    )
  } else if (isQuizzing && !localStorage.getItem('user') && !finishedQuestion) {
    return (
      <div>
        <Header isTiming={isTiming} stopTimer={stopTimer} logResults={logResults}/>
        <QuizBox updateCount={updateCount} logResults={logResults} category={category} finishedQuestion={childFinishedQuestion} canAnswer={canAnswer} setCanAnswer={childCanAnswer} />
      </div>
    )

    //////////////////////////// FINISHED ONE QUIZ
  } else if (isQuizzing && !localStorage.getItem('user') && finishedQuestion) {
    return (
      <div>
        <Header isTiming={isTiming} stopTimer={stopTimer} logResults={logResults}/>
        <QuizBox updateCount={updateCount} logResults={logResults} category={category} finishedQuestion={childFinishedQuestion} canAnswer={canAnswer} setCanAnswer={childCanAnswer} />
        <ReadyBox category={nextCategory} quizzing={startQuestion}/>
      </div>
    )
  } else if (isQuizzing && localStorage.getItem('user') && finishedQuestion) {
    return (
      <div>
        <Header isTiming={isTiming} stopTimer={stopTimer} logResults={logResults}/>
        <QuizBox updateCount={updateCount} logResults={logResults} category={category} finishedQuestion={childFinishedQuestion} canAnswer={canAnswer} setCanAnswer={childCanAnswer} />
        <ReadyBox category={nextCategory} quizzing={startQuestion}/>
      </div>
    )
  } 
}

export default Dashboard;