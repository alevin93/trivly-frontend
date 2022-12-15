import React, {useEffect, useState} from 'react'
import axios from '../api/axios'

function QuizBox({category, finishedQuestion, logResults, canAnswer, setCanAnswer, updateCount}) {



    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState([]);
    const [answerClass, setAnswerClass] = useState(['answer-text', 'answer-text', 'answer-text', 'answer-text']);
    const [guesses, setGuesses] = useState(0);
    var answers = [];
    var rawAnswers = [];

    useEffect(() => {
        getQuestion();
        setAnswerClass(['answer-text', 'answer-text', 'answer-text', 'answer-text'])
        setGuesses(0);
        
    }, [category])

    const getQuestion = async () => {
        const result = await axios.post("/question", {"category": category, "user": localStorage.getItem("user")})
        const data = JSON.parse(JSON.stringify(result.data))
        if (data?.correct && data?.incorrect) {
            rawAnswers = data.incorrect;
            rawAnswers[3] = data.correct;
            answers = randomizeAnswers(rawAnswers)
            setAnswer(answers);
            setQuestion(data);
        }
    }

    const randomizeAnswers = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }

        return array;
    }

    const checkAnswer = (ans, index) => {
        if (!canAnswer) {
            return
        }
        let answerClassArray = answerClass;
        if(ans === question.correct) {
            updateCount();
            setCanAnswer(false);
            answerClassArray[index] = "answer-correct";
            setGuesses(guesses + 1)
            console.log("QuizBox Guesses: " + guesses)
            
            finishedQuestion();
        } else {
            answerClassArray[index] = "answer-incorrect";
            setGuesses(guesses + 1);
            console.log("QuizBox Guesses: " + guesses)
            updateCount();
        }
        setAnswerClass(answerClassArray);
    }

    return ( 
        <div className="main-popup-container">
            <div className="question-popup-container">
                <div className="question-container">
                    <p className="question-text">{question.question}</p>
                </div>
                <div className="answers-container">
                    <button className={answerClass[0]} onClick={() => checkAnswer(answer[0], 0)}>{answer[0]}</button>
                    <button className={answerClass[1]} onClick={() => checkAnswer(answer[1], 1)}>{answer[1]}</button>
                    <button className={answerClass[2]} onClick={() => checkAnswer(answer[2], 2)}>{answer[2]}</button>
                    <button className={answerClass[3]} onClick={() => checkAnswer(answer[3], 3)}>{answer[3]}</button>
                </div>
            </div>
        </div>
    )
}

export default QuizBox