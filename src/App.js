import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const [index, setIndex] = useState(0);

  async function getData() {
    const response = await axios.get("https://opentdb.com/api.php?amount=10");
    setData(response.data.results);
  }
  useEffect(() => {
    getData();
  }, []);
  console.log(data);

  function AnswerButtonClick(selected_answer) {
    if (selected_answer === data[index].correct_answer) {
      console.log("doğru cevapladın");
      getData();
    } else {
      console.log("yanlış cevap");
    }
  }
  if (!data) return <div>loadıng...</div>;
  const all_answers = [
    data[index].correct_answer,
    ...data[index].incorrect_answers,
  ];
  console.log(all_answers);

  return (
    <div className="App">
      <div
        style={{ fontSize: 20, marginBottom: 40, fontWeight: "lighter" }}
      ></div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>(=Soru=) {data[index].question}</div>

        {all_answers.map((selected_answer, index) => {
          return (
            <button
              onClick={() => AnswerButtonClick(selected_answer)}
              style={{ backgroundColor: "red", color: "white", fontSize: 30 }}
            >
              {selected_answer.toUpperCase()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
export default App;
