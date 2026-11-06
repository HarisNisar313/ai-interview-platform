import dotenv from 'dotenv';
dotenv.config();

async function checkModels() {
    console.log("Checking available models for your API key...");
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.error) {
            console.log("API Key Error:", data.error.message);
            return;
        }

        console.log("\n=== MODELS YOU CAN USE FOR THIS PROJECT ===");
        data.models.forEach(m => {
            // We only want models that support generating text
            if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
                // Remove the 'models/' prefix to get the exact string you need
                console.log(m.name.replace('models/', '')); 
            }
        });
        console.log("===========================================\n");
    } catch (error) {
        console.error("Failed to fetch:", error);
    }
}

checkModels();