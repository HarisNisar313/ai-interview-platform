import { useState } from 'react';
import axios from 'axios';
import './App.css';

const QUESTION_BANK = [
  "Explain the difference between let, const, and var in JavaScript.",
  "What is the Virtual DOM in React?",
  "How does Node.js handle asynchronous operations?"
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
      const res = await axios.post('http://localhost:5000/api/analyze', {
        question: QUESTION_BANK[currentIndex],
        answer: answer
      });
      setFeedback(res.data.feedback);
    } catch (error) {
      console.error(error);
      setFeedback("Error generating feedback. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const nextQuestion = () => {
    setAnswer('');
    setFeedback('');
    setCurrentIndex((prev) => (prev + 1) % QUESTION_BANK.length);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>AI Interview Prep</h1>
      
      <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>Question {currentIndex + 1} of {QUESTION_BANK.length}</h3>
        <p><strong>{QUESTION_BANK[currentIndex]}</strong></p>
      </div>

      <form onSubmit={handleSubmit}>
        <textarea
          rows="5"
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          placeholder="Type your answer here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={loading}
        />
        <br />
        <button type="submit" disabled={loading || !answer}>
          {loading ? 'Analyzing...' : 'Submit Answer'}
        </button>
      </form>

      {feedback && (
        <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #4CAF50', borderRadius: '8px' }}>
          <h4>AI Feedback:</h4>
          <p style={{ whiteSpace: 'pre-wrap' }}>{feedback}</p>
          <button onClick={nextQuestion} style={{ marginTop: '10px' }}>
            Next Question
          </button>
        </div>
      )}
    </div>
  );
}

export default App;