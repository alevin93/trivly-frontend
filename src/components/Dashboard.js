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
  const [count, setCount] = useState(1);
  const [isTiming, setIsTiming] = useState(false);
  const [canAnswer, setCanAnswer] = useState(true);
  const [isTesting, setIsTesting] = useState(false);

  let headerRef = useRef(null);
  var categories = [];

  useEffect(() => {
      getUser();
      getFeed();
  }, [user])

  const childFinishedQuestion = () => {
    let temparr = localStorage.getItem("categories").split(',');
    console.log(temparr);
    if(localStorage.getItem("user") && !temparr[0]) {
      setIsQuizzing(false);
      setShowResults(true);
      setIsTesting(false);
    } 
    else if (!localStorage.getItem("user") && !temparr[1]) {
      setIsQuizzing(false);
      setShowResults(true);
      setIsTesting(false);
    }
    setFinishedQuestion(true);
    setIsTiming(false);
    setCanAnswer(false);
    var temp = localStorage.getItem("categories").split(',');
    temp.shift();
    localStorage.setItem("categories", temp);
    logResults();
    setNextCategory(temp[0]);
  }

  const stopTimer = () => {
    setCount(4, updateCount());
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
    setIsTesting(true);
    setCanAnswer(true);
    setIsQuizzing(true);
    setIsTiming(true);
    setFinishedQuestion(false);
    setCount(1);
    setCategory(nextCategory);
    createRecord();
  }

  const getUser = () => {
    if (localStorage.getItem("user")) { 
        setUser(JSON.stringify(localStorage.getItem("user")).replace(/['"]+/g, ''));
        
    }

    console.log("User is: " + user)
  }

  const getFeed = async () => {
      if (!localStorage.getItem("user") && !category && localStorage.getItem("categories")) {
        categories = localStorage.getItem("categories").split(',')
        setNextCategory(categories[0])
        setCategory(categories[0])
      } 
      else if(!category) {
      const result = await axios.post("/feed", {"user": user})
          .then(result => {
            console.log(result.data);
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
    updateRecord();
  }

  const updateRecord = () => {
    createRecord();
    var temp = JSON.parse(localStorage.getItem(`tempcat:${category}`));
    temp.guesses = temp.guesses + 1;
    localStorage.setItem(`tempcat:${category}`, JSON.stringify(temp))
    
    console.log(localStorage.getItem(`tempcat:${category}`))
  }

  const createRecord = () => {
    if(!localStorage.getItem(`tempcat:${category}`) && category) {
      localStorage.setItem(`tempcat:${category}`, JSON.stringify({
        category: category,
        guesses: 0,
        attempted: 1,
      }))
      presendResult();
    }
  }

  const presendResult = async () => {
    if(localStorage.getItem("user")) {
      await axios.post("/results", { "user": localStorage.getItem("user"), "category": category, "guesses": 4, "streakflag": false } )
    }
  }

  const logResults = async () => {
    const guesses = (4 - JSON.parse(localStorage.getItem(`tempcat:${category}`)).guesses)*(-1);
    console.log("guesses is: " + guesses)
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
        if(!localStorage.getItem("catKey")) {
          localStorage.setItem("catKey", [`${category}`])
        } else {
          let tempKey = [localStorage.getItem("catKey"), category];
          localStorage.setItem("catKey", tempKey);
          console.log(localStorage.getItem("catKey"));
        }
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
        <ReadyBox quizzing={startQuestion} category={nextCategory} isTesting={isTesting} />
    </div>
  )
  } else if (!localStorage.getItem('user')  && !isQuizzing) {
  return (
    <div className="main-content-container">
      <Header isTiming={isTiming} stopTimer={stopTimer} />
      <ReadyBox quizzing={startQuestion} category={nextCategory} isTesting={isTesting} />
      <LoginBox />
    </div>
  )
  
  //////////////////////////////// TAKING QUIZ
  } else if (isQuizzing && localStorage.getItem('user') && !finishedQuestion) {
    return (
      <div>
        <Header isTiming={isTiming} stopTimer={stopTimer} logResults={logResults}/>
        <QuizBox updateCount={updateRecord} logResults={logResults} category={category} finishedQuestion={childFinishedQuestion} canAnswer={canAnswer} setCanAnswer={childCanAnswer} />
      </div>
    )
  } else if (isQuizzing && !localStorage.getItem('user') && !finishedQuestion) {
    return (
      <div>
        <Header isTiming={isTiming} stopTimer={stopTimer} logResults={logResults}/>
        <QuizBox updateCount={updateRecord} logResults={logResults} category={category} finishedQuestion={childFinishedQuestion} canAnswer={canAnswer} setCanAnswer={childCanAnswer} />
      </div>
    )

    //////////////////////////// FINISHED ONE QUIZ
  } else if (isQuizzing && !localStorage.getItem('user') && finishedQuestion) {
    return (
      <div>
        <Header isTiming={isTiming} stopTimer={stopTimer} logResults={logResults}/>
        <QuizBox updateCount={updateRecord} logResults={logResults} category={category} finishedQuestion={childFinishedQuestion} canAnswer={canAnswer} setCanAnswer={childCanAnswer} />
        <ReadyBox category={nextCategory} quizzing={startQuestion} isTesting={isTesting} />
      </div>
    )
  } else if (isQuizzing && localStorage.getItem('user') && finishedQuestion) {
    return (
      <div>
        <Header isTiming={isTiming} stopTimer={stopTimer} logResults={logResults}/>
        <QuizBox updateCount={updateRecord} logResults={logResults} category={category} finishedQuestion={childFinishedQuestion} canAnswer={canAnswer} setCanAnswer={childCanAnswer} />
        <ReadyBox category={nextCategory} quizzing={startQuestion} isTesting={isTesting} />
      </div>
    )
  } 
}

export default Dashboard;