import { useState } from 'react';
import axios from 'axios';
import './App.css';

const QUESTION_BANK = [
  "Explain the difference between let, const, and var in JavaScript.",
  "What is the Virtual DOM in React, and why is it useful?",
  "How does Node.js handle asynchronous operations without blocking the main thread?",
  "Describe the concept of RESTful APIs."
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!answer.trim()) return;

    setLoading(true);
    setFeedback('');

    try {
      const res = await axios.post('https://your-backend-name.onrender.com/api/analyze', {
        question: QUESTION_BANK[currentIndex],
        answer: answer
      });
      setFeedback(res.data.feedback);
    } catch (error) {
      console.error(error);
      setFeedback("Error connecting to the AI analyzer. Please check your backend.");
    } finally {
      setLoading(false);
    }
  };

  const nextQuestion = () => {
    setAnswer('');
    setFeedback('');
    setCurrentIndex((prev) => (prev + 1) % QUESTION_BANK.length);
  };

  const skipQuestion = () => {
    nextQuestion();
  };

  return (
    <div className="container">
      <h1 className="header-title">AI Technical Interviewer</h1>
      
      <div className="card">
        <div className="progress-text">Question {currentIndex + 1} of {QUESTION_BANK.length}</div>
        <h2 className="question-text">{QUESTION_BANK[currentIndex]}</h2>
        
        <form onSubmit={handleSubmit}>
          <textarea
            className="textarea-input"
            placeholder="Type your detailed answer here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={loading || feedback}
          />
          
          {!feedback && (
            <div className="button-group">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={skipQuestion}
                disabled={loading}
              >
                Skip Question
              </button>
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={loading || !answer.trim()}
              >
                {loading ? (
                  <span className="loading-text">
                    Analyzing 
                    <span className="dot-typing"><span>.</span><span>.</span><span>.</span></span>
                  </span>
                ) : 'Submit Answer'}
              </button>
            </div>
          )}
        </form>
      </div>

      {feedback && (
        <div className="feedback-card">
          <h3 className="feedback-title">AI Feedback</h3>
          <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{feedback}</div>
          <button className="btn btn-primary" onClick={nextQuestion} style={{ marginTop: '20px', width: '100%' }}>
            Move to Next Question
          </button>
        </div>
      )}
    </div>
  );
}

export default App;