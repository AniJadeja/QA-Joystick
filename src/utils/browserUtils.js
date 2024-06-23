// browserUtils.js

export const getQuestionFromURL = () => {
  const path = window.location.pathname;
  // Remove the leading slash and decode the URL
  const question = decodeURIComponent(path.slice(1));
  // Replace hyphens with spaces
  return question.replace(/-/g, ' ');
};

export const updateURLWithQuestion = (question) => {
  // Replace spaces with hyphens and encode the question
  const encodedQuestion = encodeURIComponent(question.replace(/ /g, '-'));
  const newUrl = `/${encodedQuestion}`;
  window.history.pushState({}, '', newUrl);
};