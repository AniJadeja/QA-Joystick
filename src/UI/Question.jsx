/* Question.jsx

import { useState, useEffect } from "react";
import { Html } from "@react-three/drei";
import { getQuestionFromURL, updateURLWithQuestion } from "../utils/browserUtils";

const Question = () => {
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState("");
  const [answerData, setAnswerData] = useState("No answer")

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

  // const fetchQuestionData = (que) => {
  //   setIsLoading(true);
  //   let encodedQue = encodeURIComponent(que);
  //   encodedQue = encodedQue.replace(/%20/g, "-");
  //   console.log("Encoded que : ", encodedQue)
  //   fetch(`https://bermudaunicorn.com/api/beuapi.php?type=fetchquestion&que=${que}`)
  //     .then(response => response.json())
  //     .then(data => {
      
  //       setApiData(data);

  //       fetch(`https://bermudaunicorn.com/api/beuapi.php?type=fetchanswers&questionId=${data.id}`).then(res => res.json()).then(answerData=>{
          

  //         data = {
  //           ...data,
  //           answer:answerData
  //         }

  //         setApiData(data);
  //         setIsLoading(false);
  //       })
  //       .catch(err =>{
  //         setIsLoading(false);
  //         console.log(err)
  //         throw new Error(err);
  //       })
  //       console.log("data", data);
      
  //     })
  //     .catch(error => {
  //       setApiData({ error: "Error While Fetching Data" });
  //       console.error(error);
  //       setIsLoading(false);
  //     });
  // };



  const fetchQuestionData = (que) => {
    setIsLoading(true);
    let encodedQue = encodeURIComponent(que);
    encodedQue = encodedQue.replace(/%20/g, "-");
    console.log("Encoded que : ", encodedQue);
  
    fetch(`https://bermudaunicorn.com/api/beuapi.php?type=fetchquestion&que=${que}`)
      .then(response => response.json())
      .then(data => {
        // Fetch the answers using the question ID
        fetch(`https://bermudaunicorn.com/api/beuapi.php?type=fetchanswers&questionId=${data.id}`)
          .then(res => res.json())
          .then(answerData => {
            console.log("Answer : ", answerData);
            // Update the state with the combined data
            setAnswerData(answerData);
            setIsLoading(false);
          })
          .catch(err => {
            setIsLoading(false);
            console.log(err);
            throw new Error(err);
          });
          console.log("Data : ",data)
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

  function ApiDataDisplay({ data, answerData, isLoading }) {
    return (
      <Html position={[0.2, 0.8, 0]} transform>
        {isLoading ? (
          <div style={{ color: 'white', fontSize: '18px' }}>Loading...</div>
        ) : (
          <div style={{ maxHeight: '134px', width: "247px", overflowY: 'auto', color: 'white' , fontSize:'10px'}}>
            {data ? (
              <>
               
              <p
             style={{
              backgroundColor: 'rgba(128, 128, 128, 0.3)', // RGBA grey with 80% opacity
              boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', // Text shadow for 3D effect
              boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.5)', // Box shadow for 3D effect
              maxWidth: 'fit-content',
              borderRadius: '10px', // Rounded borders
              padding:'5px'
            }}
            
              >{data.asker}</p>
              <p><strong>Question:</strong> {data.question} ?</p>
                
              </>
            ) : (
              <p>No data available</p> 
            )}

          </div>
        )}
        {/* <form onSubmit={handleQuestionSubmit}>
          <input 
            type="text" 
            value={question} 
            onChange={(e) => setQuestion(e.target.value)}
            style={{ color: 'black' }}
          />
          <button type="submit">Submit Question</button>
        </form> }
      </Html>
    );
  }

  return (
    <ApiDataDisplay data={apiData} isLoading={isLoading} answerData={answerData}/>
  );
};

export default Question;

*/

// Question.jsx

import { useState, useEffect } from "react";
import { Html } from "@react-three/drei";
import { getQuestionFromURL, updateURLWithQuestion } from "../utils/browserUtils";

const Question = () => {
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState("");
  const [answerData, setAnswerData] = useState({error:"No answer"});

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

    fetch(`https://bermudaunicorn.com/api/beuapi.php?type=fetchquestion&que=${que}`)
      .then(response => response.json())
      .then(data => {
        // Fetch the answers using the question ID
        fetch(`https://bermudaunicorn.com/api/beuapi.php?type=fetchanswers&questionId=${data.id}`)
          .then(res => res.json())
          .then(answerData => {
            console.log("Answer : ", answerData);
            // Combine question data and answer data
            const combinedData = {
              ...data,
              answers: answerData
            };

            // Update the state with the combined data
            setApiData(combinedData);
            setIsLoading(false);
          })
          .catch(err => {
            setIsLoading(false);
            console.log(err);
            throw new Error(err);
          });
        console.log("Data : ", data);
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
      <Html position={[0.2, -0.2, 0]} transform>
        {isLoading ? (
          <div style={{ color: 'white', fontSize: '18px' }}>Loading...</div>
        ) : (
          <div style={{ maxHeight: '534px', width: "247px", overflowY: 'auto', color: 'white', fontSize: '10px' }}>
            {data ? (
              <>
                <p aria-label="element"
                  style={{
                    backgroundColor: 'rgba(128, 128, 128, 0.3)', // RGBA grey with 80% opacity
                    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', // Text shadow for 3D effect
                    boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.5)', // Box shadow for 3D effect
                    maxWidth: 'fit-content',
                    borderRadius: '10px', // Rounded borders
                    padding: '5px'
                  }}
                >
                  {data.asker}
                </p>
                {
                  console.log("Accessed data : ", data)
                }
                <p aria-label="element"><strong>Question:</strong> {data.question} ?</p>
                <p aria-label="element" ><strong>Answer : </strong> {data.answers.answer}</p>
                <button
                  style={{
                    maxWidth:'80px',
                    fontSize:'10px',
                     marginTop:'50px',
                    marginLeft:'80px'
                  }}
                >
                  Ask Question
                </button>

                <button
                style={{
                  maxWidth:'80px',
                  fontSize:'10px',
                  marginLeft:'10px'
                 
                }}>
                  Give Answer
                </button>
              </>
            ) : (
              <p>No data available</p>
            )}
          </div>
        )}
      </Html>
    );
  }

  return (
    <ApiDataDisplay data={apiData} isLoading={isLoading} />
  );
};

export default Question;
