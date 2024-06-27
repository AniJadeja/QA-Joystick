// Question.jsx

import { useState, useEffect, useCallback } from "react";
import { Html } from "@react-three/drei";
import {
  getQuestionFromURL,
  updateURLWithQuestion,
} from "../utils/browserUtils";
import "./button.css";
import Popup from "./Popup/Popup";

const Question = () => {
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState("");
  const [answerData, setAnswerData] = useState({ error: "No answer" });

  const [inputValue, setInputValue] = useState("");

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
    console.log("Encoded que : ", encodedQue);

    fetch(
      `https://bermudaunicorn.com/api/beuapi.php?type=fetchquestion&que=${que}`
    )
      .then((response) =>
        
        response.json())
      .then((data) => {
        // Fetch the answers using the question ID
        fetch(
          `https://bermudaunicorn.com/api/beuapi.php?type=fetchanswers&questionId=${data.id}`
          //`https://bermudaunicorn.com/api/beuapi.php?type=fetchanswers&questionId=1`
        )
        .then((res) => {
          console.log("Response of Answer : ", typeof(res));
          return res.text(); // Get the response as text instead of JSON
        })
        .then((text) => {
          // Process the text response
          const jsonStrings = text.match(/\{[^}]+\}/g);
          const answerData = jsonStrings.map(jsonString => JSON.parse(jsonString));
          
          console.log("Answer : ", answerData);
          
          // Combine question data and answer data
          const combinedData = {
            ...data,
            answers: answerData,
          };
      
          // Update the state with the combined data
          setApiData(combinedData);
          setIsLoading(false);
        })
          .catch((err) => {
            setIsLoading(false);
            console.log(err);
            throw new Error(err);
          });
        console.log("Data : ", data);
      })
      .catch((error) => {
        setApiData({ error: "Error While Fetching Data" });
        console.error(error);
        setIsLoading(false);
      });
  };

  function ApiDataDisplay({ data, isLoading }) {
    return (
      <Html position={[0.2, -0.3, 0]} transform>
        {isLoading ? (
          <div style={{ color: "white", fontSize: "18px" }}>Loading...</div>
        ) : (
          <div
            style={{
              maxHeight: "534px",
              width: "247px",
              overflowY: "auto",
              color: "white",
              fontSize: "10px",
            }}
          >
            {data ? (
              <>
                <p
                  aria-label="element"
                  style={{
                    backgroundColor: "rgba(128, 128, 128, 0.3)",
                    boxShadow:
                      "2px 2px 5px rgba(0, 0, 0, 0.3), 4px 4px 10px rgba(0, 0, 0, 0.5)",
                    maxWidth: "fit-content",
                    borderRadius: "10px",
                    padding: "5px",
                  }}
                >
                  {data.asker}
                </p>
                {console.log("Accessed data : ", data)}
                <p aria-label="element">
                  <strong>Question:</strong> {data.question} ?
                </p>
                <p aria-label="element">
                  <strong>Answers : </strong>
                </p>
                <p
                  aria-label="element"
                  style={{
                    display: "inline",
                    backgroundColor: "rgba(128, 128, 128, 0.3)",
                    boxShadow:
                      "2px 2px 5px rgba(0, 0, 0, 0.3), 4px 4px 10px rgba(0, 0, 0, 0.5)",
                    maxWidth: "fit-content",
                    borderRadius: "10px",
                    padding: "5px",
                  }}
                >
                  {data.answers.pname}
                </p>

                {data && (
                  <p
                    style={{
                      display: "inline",
                    }}
                  >
                    {}
                    &nbsp;:&nbsp;&nbsp;{ data.answers.answer}
                  </p>
                )}
              </>
            ) : (
              <p>No data available</p>
            )}
          </div>
        )}
      </Html>
    );
  }

  return <ApiDataDisplay data={apiData} isLoading={isLoading} />;
};

export default Question;
