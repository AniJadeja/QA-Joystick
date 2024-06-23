// browserUtils.js

export function getQuestionFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const question = urlParams.get('que');
    return question ? decodeURIComponent(question.replace(/-/g, ' ')) : null;
  }
  
  export function updateURLWithQuestion(question) {
    const encodedQuestion = encodeURIComponent(question.replace(/\s+/g, '-'));
    window.history.pushState({}, '', `/?que=${encodedQuestion}`);
  }