
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function calculateKnowledgeScore(
    question: string,
    guess: string, 
    correctAnswer: string
) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;;
    if (!apiKey) throw new Error('GEMINI_API_KEY is not configured');
    
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `the question was ${question} and the correct answer was ${correctAnswer} the answer entered was ${guess}. Is that a reasonably close answer? answer with 1 or 0`;

    try {
        const result = await model.generateContent(prompt);
        if (result.response.text() === '1') {
            return 1;
        } else if (result.response.text() === '0') {
            return 0;
        } else {
            throw new Error('Invalid response from model');
        }
    } catch (error) {
        console.error('Question generation failed:', error);
        throw new Error('Failed to generate question');
    }
}

