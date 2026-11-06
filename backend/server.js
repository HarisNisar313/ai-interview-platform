import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/analyze', async (req, res) => {
    const { question, answer } = req.body;

    if (!question || !answer) {
        return res.status(400).json({ error: "Question and answer are required." });
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt = `
        Act as an expert technical interviewer. 
        Question asked: "${question}"
        Candidate's Answer: "${answer}"
        
        Provide constructive feedback on this answer. Include:
        1. What they did well.
        2. What they missed or got wrong.
        3. A brief example of a better answer.
        Keep it concise and professional.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const feedback = response.text();

        res.json({ feedback });
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: "Failed to analyze answer." });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));