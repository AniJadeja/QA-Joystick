// Question.jsx

import { useState, useEffect } from "react";
import { Html } from "@react-three/drei";
import { getQuestionFromURL, updateURLWithQuestion } from "../utils/browserUtils";

const Question = () => {
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState("");
  // new use state for data object only
  

  


  useEffect(() => {
    const urlQuestion = getQuestionFromURL();
    if (urlQuestion) {
      setQuestion(urlQuestion);
      fetchQuestionData(urlQuestion);
    } else {
      // Default question if none in URL
      const defaultQuestion = "Which-city-is-known-as-the-Pink-City";
      setQuestion(defaultQuestion);
      fetchQuestionData(defaultQuestion);
    }
  }, []);

  const fetchQuestionData = (que) => {
    setIsLoading(true);
    let encodedQue = encodeURIComponent(que);
    encodedQue = encodedQue.replace(/%20/g, "-");
    console.log("Encoded que : ", encodedQue)
    fetch(`https://bermudaunicorn.com/api/beuapi.php?type=fetchquestion&que=${que}`)
      .then(response => response.json())
      .then(data => {
        console.log("data", data);
        setApiData(data);
        setIsLoading(false);
      })
      .catch(error => {
        setApiData({ error: "Error While Fetching Data" });
        console.error(error);
        setIsLoading(false);
      });
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    updateURLWithQuestion(question);
    fetchQuestionData(question);
  };

  function ApiDataDisplay({ data, isLoading }) {
    return (
      <Html position={[0, 0, 0]} transform>
        {isLoading ? (
          <div style={{ color: 'white', fontSize: '18px' }}>Loading...</div>
        ) : (
          <div style={{ maxHeight: '134px', width: "247px", overflowY: 'auto', color: 'white' }}>
            {data ? (
              <>
                <p><strong>Question:</strong> {data.question}</p>
                <p><strong>Asker:</strong> {data.asker}</p>
                <p><strong>Date:</strong> {data.date}</p>
              </>
            ) : (
              <p>No data available</p> 
            )}

          </div>
        )}
        <form onSubmit={handleQuestionSubmit}>
          <input 
            type="text" 
            value={question} 
            onChange={(e) => setQuestion(e.target.value)}
            style={{ color: 'black' }}
          />
          <button type="submit">Submit Question</button>
        </form>
      </Html>
    );
  }

  return (
    <ApiDataDisplay data={apiData} isLoading={isLoading} />
  );
};

export default Question;

