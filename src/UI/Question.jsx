// Question.jsx

import { useState, useEffect, useCallback } from "react";
import { Html } from "@react-three/drei";
import {
  getQuestionFromURL,
  updateURLWithQuestion,
} from "../utils/browserUtils";
import "./button.css";

const Question = () => {
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState("");
  const [answerData, setAnswerData] = useState({ error: "No answer" });
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("");
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
      .then((response) => response.json())
      .then((data) => {
        // Fetch the answers using the question ID
        fetch(
          `https://bermudaunicorn.com/api/beuapi.php?type=fetchanswers&questionId=${data.id}`
        )
          .then((res) => res.json())
          .then((answerData) => {
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

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    updateURLWithQuestion(question);
    fetchQuestionData(question);
  };

  const handleButtonClick = (type) => {
    setPopupType(type);
    setShowPopup(true);
  };

  const handlePopupSubmit = (e) => {
    e.preventDefault();
    console.log(`Submitted ${popupType}: ${inputValue}`);
    setShowPopup(false);
    setInputValue("");
    // Here you can add logic to handle the submission based on popupType
  };

  const closePopup = useCallback(() => {
    setShowPopup(false);
    setInputValue("");
  }, []);

  function ApiDataDisplay({ data, isLoading }) {
    return (
      <Html position={[0.2, -0.2, 0]} transform>
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
                    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3), 4px 4px 10px rgba(0, 0, 0, 0.5)",
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
                  <strong>Answer : </strong> {data.answers.answer}
                </p>

                <div
                  style={{
                    display: 'flex',
                    marginLeft: "120px",
                    marginTop: "50px"
                  }}
                >
                  <button
                    style={{
                      maxWidth: "90px",
                      fontSize: "8px",
                      maxHeight: "25px",
                      backgroundColor:'rgba(128,128,128,1)'
                    }}
                    className="button-30"
                    role="button"
                    onClick={() => handleButtonClick("question")}
                  >
                    Ask question
                  </button>

                  <button
                    style={{
                      maxWidth: "90px",
                      fontSize: "8px",
                      marginLeft: "10px",
                      maxHeight: "25px",
                      backgroundColor:'rgba(128,128,128,1)'
                    }}
                    className="button-30"
                    role="button"
                    onClick={() => handleButtonClick("answer")}
                  >
                    Give Answer
                  </button>
                </div>
              </>
            ) : (
              <p>No data available</p>
            )}
          </div>
        )}
        {showPopup && (
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000
            }}
            onClick={closePopup}
          >
            <div 
              style={{
                backgroundColor: 'rgba(128,128,128,0.9)',
                borderRadius: '20px',
                padding: '20px',
                
                width: '300px',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closePopup}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'none',
                  border: 'none',
                  fontSize: '18px',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
              <h2 style={{ textAlign: 'center', color: '#fff', marginBottom: '20px' }}>
                {popupType === "question" ? "Ask a Question" : "Give an Answer"}
              </h2>
              <form onSubmit={handlePopupSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={popupType === "question" ? "Enter your question" : "Enter your answer"}
                  style={{
                    width: '100%',
                    padding: '10px',
                    margin: '10px 0',
                    border: 'none',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(128,128,128,0.9)',
                    boxShadow: 'inset 5px 5px 10px rgba(255,255,255,0.2), inset -5px -5px 10px rgba(128,128,128,1)'
                  }}
                />
                <button type="submit" style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(128,128,128,0.9)',
                  boxShadow: '5px 5px 10px rgba(255,255,255,0.2), -5px -5px 10px rgba(128,128,128,1)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  marginTop: '20px'
                }}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </Html>
    );
  }

  return <ApiDataDisplay data={apiData} isLoading={isLoading} />;
};

export default Question;