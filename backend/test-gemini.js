import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

async function testAPI() {
    console.log("1. Reading API Key...");
    if (!process.env.GEMINI_API_KEY) {
        console.error("ERROR: GEMINI_API_KEY is missing from .env file.");
        return;
    }
    console.log("API Key found (starts with):", process.env.GEMINI_API_KEY.substring(0, 5) + "...");

    console.log("\n2. Initializing Gemini...");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Using the lite version for highest availability
    const modelName = "gemini-flash-lite-latest";
    console.log(`Using model: ${modelName}`);
    const model = genAI.getGenerativeModel({ model: modelName });

    console.log("\n3. Sending test prompt to Google...");
    try {
        const result = await model.generateContent("Reply with the word 'SUCCESS' if you receive this.");
        const response = await result.response;
        console.log("\n✅ GOOGLE RESPONDED:");
        console.log(response.text());
    } catch (error) {
        console.log("\n❌ GOOGLE API ERROR:");
        console.log("Status Code:", error.status);
        console.log("Message:", error.message);
    }
}

testAPI();