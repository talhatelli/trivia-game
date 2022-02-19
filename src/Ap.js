import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null); //datayı ilk değeri null döderdik.
  const [index, setIndex] = useState(0); //inex'i ilk 0. indisle başlattık
  const [score, setScore] = useState(0); // cevapların scorunu oluşturur. İlk değerini (0 dan başlamalı)
  const [showScore, setShowScore] = useState(false); //score tablosu

  async function getData() {
    const response = await axios.get("https://opentdb.com/api.php?amount=10");
    setData(response.data.results);
  }
  useEffect(() => {
    getData();
  }, []);
  console.log(data);
  if (!data) return <div>yükleniyor...</div>;

  const handleAnswerButtonClick = (index) => {
    //her cevap butonları tıklandığında skoru oluşturur
    if (setData.correct_answer) {
      // skora 1 ekle
      setScore(score + 1);
    }
    if (setData.incorrect_answers) {
      //yanlış cevap verilirse skoru göster
      setShowScore(true);
    }

    // const nextIndex = index + 1; // yeni soruyu getir yoksa da score tablosunu göster.
    // if (nextIndex < index.length) {
    //   setCurrentQuestion(nextIndex);
    // } else {
    //   setShowScore(true);
    // }
  };

  return (
    <>
      <h1 className="header">bilgi yarişması</h1>
      <div className="app">
        {showScore ? (
          <div className="score-section">
            {index.length} soruda {score} soru yaptnız.
          </div>
        ) : (
          <>
            <div className="question-section">
              {" "}
              soru bölümü
              <div className="question-count">
                {" "}
                soruyu sayan yer
                <span>Soru {index + 1}</span>
                {index.length}
              </div>
              <div className="question-text">{data[index].question}</div>
            </div>

            {/* <div className='answer-section'>
              {
                data[index].(correct_answer,incorrect_answers).map((answerOptions) => (
                  <button onClick={() => handleAnswerButtonClick(index.isCorrect)}>{answerOptions.answerText}</button>
                ))
              }
            </div> */}
          </>
        )}
      </div>
    </>
  );
  // }
  //     <div>
  //       <div>{data[index].question}</div>
  //       <div>
  //         {data[index].correct_answers}
  //         {/* <button onClick={(handleAnswerButtonClick = index)}>
  //           {data.correct_answer}
  //         </button> */}
  //       </div>
  //       <div>{data[index].incorrect_answers}</div>

  //       {/* <button onClick={() => setIndex(index + 1)}>Next</button> */}
  //     </div>
  //   );
}

export default App;
