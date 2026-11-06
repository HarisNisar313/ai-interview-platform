# AI Interview Preparation Platform

A full-stack web application that simulates technical mock interviews and provides real-time, constructive generative AI feedback to candidates. Built in a single day as a Minimum Viable Product (MVP).

## 🚀 Live Demo
- **Frontend:** [Link to your Vercel URL here]
- **Backend API:** [Link to your Render URL here]

## 🛠 Tech Stack
- **Frontend:** React.js, Vite, Axios
- **Backend:** Node.js, Express.js
- **AI Integration:** Google Gemini API (`gemini-1.5-flash`)

## ✨ Features
- **Mock Interview Interface:** Cycles through a curated bank of technical questions.
- **AI Analysis:** Sends user text answers to the Gemini LLM for evaluation.
- **Actionable Feedback:** Returns structured feedback highlighting strengths, missing concepts, and ideal answer examples.

## 💻 Run Locally
1. Clone the repository: `git clone https://github.com/YourUsername/ai-interview-platform.git`
2. Install Backend dependencies: `cd backend && npm install`
3. Install Frontend dependencies: `cd ../frontend && npm install`
4. Create a `.env` file in the `backend` directory and add: `GEMINI_API_KEY=your_api_key_here`
5. Start the backend: `cd backend && npm run dev`
6. Start the frontend: `cd frontend && npm run dev`