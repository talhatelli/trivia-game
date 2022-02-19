import React, { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const questions = [
    {
      questionText: "Hz.Muhammed S.A.V kaç yılında doğmuştur?",
      answerOptions: [
        { answerText: "575", isCorrect: false },
        { answerText: "573", isCorrect: false },
        { answerText: "571", isCorrect: true },
        { answerText: "572", isCorrect: false },
      ],
    },
  ];

  const [series, setSeries] = useState(0);
  const [data, setData] = useState(null);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  //const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10")
      .then((response) => response.json())
      .then((data) => console.log(data));
    setData(data.results); // set data yazınca consol erorları oluşuyor
  }, []);

  const handleAnswerButtonClick = (correct_answer) => {
    if (correct_answer === true) {
      setScore(score + 1);
    }

    const nextQuetions = currentQuestion + 1;
    if (nextQuetions < questions.length) {
      setCurrentQuestion(nextQuetions);
    } else {
      setShowScore(true);
    }
  };

  if (!data) {
    return null;
  } else {
    return (
      <div>
        <div>{data[series].question}</div>
        <div>{data[series].correct_answer}</div>
        <div>{data[series].incorrect_answers}</div>
        <button onClick={() => setSeries(series + 1)}></button>
      </div>
    );
  }
  return (
    <>
      <h1 className="header">Bilgi Yarışması</h1>
      <div className="app">
        {showScore ? (
          <div className="score-section">
            {questions.length} soruda {score} soru yaptnız.
          </div>
        ) : (
          <>
            <div className="question-section">
              <div className="question-count">
                <span>Soru {currentQuestion + 1}/</span>
                {questions.length}
              </div>
              <div className="question-text">
                {questions[currentQuestion].questionText}
              </div>
            </div>

            <div className="answer-section">
              {questions[currentQuestion].answerOptions.map((answerOptions) => (
                <button
                  onClick={() =>
                    handleAnswerButtonClick(answerOptions.isCorrect)
                  }
                >
                  {answerOptions.answerText}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default App;

// React.useEffect(() => {
//   axios
//     .get("https://opentdb.com/api.php?amount=10")
//     .then((data) => console.log(data))
//     .then((response) => {

//     });
// }, []);
