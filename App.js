import React from "react";
import Question from "./Question";

export default function App() {
  const [screenTwo, setScreenTwo] = React.useState(false);
  function changeScreen() {
    setScreenTwo(true);
  }
  const [apiData, setApiData] = React.useState([]);
  const [result, setResult] = React.useState({ show: false, correct: 0 });
  const [apiCall,setApiCall]=React.useState(0);
    
  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
      .then((res) => res.json())
      .then((data) => setApiData(data.results));
  }, [apiCall]);
  // console.log(apiData.map((i) => i.correct_answer));
  const [question, setQuestion] = React.useState([
    { question: "0", answer: "" },
    { question: "1", answer: "" },
    { question: "2", answer: "" },
    { question: "3", answer: "" },
    { question: "4", answer: "" },
  ]);

  function setAns(q, a) {
    setQuestion((prev) => {
      const newans = [];
      for (let i = 0; i < prev.length; i++) {
        if (q == prev[i].question) {
          newans.push({ ...prev[i], answer: a });
        } else {
          newans.push(prev[i]);
        }
      }
      return newans;
    });
  }
  const [color, setColor] = React.useState([
    { question: "0", red: "", green: "" },
    { question: "1", red: "", green: "" },
    { question: "2", red: "", green: "" },
    { question: "3", red: "", green: "" },
    { question: "4", red: "", green: "" },
  ]);

  function check() {
    let newcolor = [];
    var corr = 0;
    for (let i = 0; i < apiData.length; i++) {
      if (apiData[i].correct_answer == question[i].answer) {
        corr++;
        newcolor.push({ ...color[i], green: apiData[i].correct_answer });
      } else {
        newcolor.push({
          ...color[i],
          green: apiData[i].correct_answer,
          red: question[i].answer,
        });
      }
    }
    setResult({ show: true, correct: corr });
    setColor(newcolor);
  }

  function reset() {
    // console.log("reset");
    setResult({ show: false, correct: 0 });
    setColor([
    { question: "0", red: "", green: "" },
    { question: "1", red: "", green: "" },
    { question: "2", red: "", green: "" },
    { question: "3", red: "", green: "" },
    { question: "4", red: "", green: "" },
  ])
  setQuestion([
    { question: "0", answer: "" },
    { question: "1", answer: "" },
    { question: "2", answer: "" },
    { question: "3", answer: "" },
    { question: "4", answer: "" },
  ])
// setScreenTwo(true)
setApiCall(prev=>prev+1)
  }

  let idctr = 0;
  const qna = apiData.map((i) => {
    return (
      <Question
        q={i.question}
        ca={i.correct_answer}
        ina={i.incorrect_answers}
        selectedAns={question[idctr].answer}
        color={color[idctr]}
        qno={idctr}
        key={idctr++}
        setAns={setAns}
        result={result.show}
        apiCall={apiCall}
      />
    );
  });

  return (
    <main>
      {screenTwo ? (
        <div className="screen-two">
          
          {qna}
          <div className="bottom">
            {result.show && (
              <h3 className="result">
                You scored {result.correct}/5 correct answers
              </h3>
            )}
            {!result.show && (
              <button className="blue-btn" onClick={check}>
                Check Answer
              </button>
            )}
            {result.show && (
              <button className="blue-btn" onClick={reset}>
                
                Play Again
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="starting-screen">
          <h1 className="homeTitle">Quizzical</h1>
          <p className="homeDesc">Looking for a fun and educational way to pass the time? Look no further than our entertaining quiz app!</p>
          <button className="blue-btn" onClick={changeScreen}>
            Start quiz
          </button>
        </div>
      )}
    </main>
  );
}
