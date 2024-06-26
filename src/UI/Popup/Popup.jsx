import React, { useState, useEffect } from "react";
import "./Popup.css"; // You'll need to create this CSS file

const Popup = ({ name, onClose }) => {
  const [selectedOption, setSelectedOption] = useState("ask");
  const [inputText, setInputText] = useState("");
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    const words = inputText.trim().split(/\s+/);
    setWordCount(words.length === 1 && words[0] === "" ? 0 : words.length);
  }, [inputText]);

  const handlePost = () => {
    console.log("Posting:", inputText);
    // Add your post logic here
  };

  return (
    <div className="popup">
      <button className="close-button" onClick={onClose}>
      </button>
      <div className="header">
        <button
          className={`option ${selectedOption === "ask" ? "active" : ""}`}
          onClick={() => setSelectedOption("ask")}
        >
          Ask a Question
        </button>
        <button
          className={`option ${selectedOption === "post" ? "active" : ""}`}
          onClick={() => setSelectedOption("post")}
        >
          Post an Answer
        </button>
        <div className={`slider ${selectedOption}`}></div>
      </div>
      <div className="content">
        <div className="avatar">{name[0].toUpperCase()}</div>
        <p>{name}</p>
      </div>
      <textarea
        placeholder={`Something awesome you may want to ${
          selectedOption === "ask" ? "ask" : "answer"
        }...`}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <div className="footer">
        <span className="word-count">{wordCount}/100</span>
        <button className="post-button" onClick={handlePost}>
          POST →
        </button>
      </div>
    </div>
  );
};

export default Popup;
