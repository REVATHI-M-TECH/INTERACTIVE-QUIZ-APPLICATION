import React, { useState } from "react";
import quizData from "../data/quizData";
import "../App.css";

function Quiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState("");

  const current = quizData[currentQ];

  const handleSelect = (option) => {
    setSelected(option);
  };

  const handleNext = () => {
    if (!selected) return;

    if (selected === current.answer) {
      setScore(score + 1);
      setFeedback("✅ Correct!");
    } else {
      setFeedback(`❌ Wrong! Correct Answer: ${current.answer}`);
    }

    setTimeout(() => {
      setSelected("");
      setFeedback("");
      if (currentQ + 1 < quizData.length) {
        setCurrentQ(currentQ + 1);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const restart = () => {
    setCurrentQ(0);
    setSelected("");
    setScore(0);
    setShowResult(false);
    setFeedback("");
  };

  return (
    <div className="quiz-box">
      <h1>Interactive Quiz App</h1>

      {showResult ? (
        <div className="result">
          <h2>🎉  Congratulations! Quiz Completed! 🎉</h2>
          <p>Your Score: {score} / {quizData.length}</p>
          <button onClick={restart}>🔁 Restart</button>
        </div>
      ) : (
        <>
          <div className="question">
            <h2>{current.question}</h2>
            <div className="options">
              {current.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(option)}
                  className={`option-btn ${selected === option ? "selected" : ""}`}
                >
                  {option}
                </button>
              ))}
            </div>
            <button className="next-btn" onClick={handleNext}>
              Next ➡️
            </button>
            <p className="feedback">{feedback}</p>
            <p>Progress: {currentQ + 1} / {quizData.length}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Quiz;
