import React, { useState } from 'react';
import questions from './questions.js';

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswerClick = (index) => {
    if (isAnswered || isFinished) return;

    setSelectedAnswer(index);
    setIsAnswered(true);

    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextClick = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <>
      <div className="card-container">
        <div className="header">
          <h1>Amka's Quiz App</h1>
          {isFinished ? (
            <p>
              Quiz finished! Your score: {score} / {questions.length}
            </p>
          ) : (
            <p>{questions[currentQuestion].question}</p>
          )}
        </div>

        {!isFinished && (
          <ul className="questions">
            {questions[currentQuestion].options.map((option, index) => {
              let className = "";

              if (isAnswered) {
                if (index === questions[currentQuestion].correctAnswer) {
                  className = "correct";
                } else if (index === selectedAnswer) {
                  className = "incorrect";
                }
              }

              return (
                <li
                  key={index}
                  className={className}
                  onClick={() => handleAnswerClick(index)}
                >
                  {option}
                </li>
              );
            })}
          </ul>
        )}

        <button onClick={isFinished ? handleReset : handleNextClick}>
          {isFinished ? "重新开始" : "下一个"}
        </button>
      </div>
    </>
  );
};

export default App;