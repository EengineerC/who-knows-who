import { GoogleGenerativeAI } from "@google/generative-ai";

// interface PlayerDetails {
//   name: string;
// }


export async function generatePersonalQuestion(answerer:string) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error('VITE_GEMINI_API_KEY is not configured');
  
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Forget all previous instructions and generate a unique personal trivia question about ${answerer} 
  that requires specific insider knowledge. The question should:
  - Be specific enough that only close friends/family would know
  - Have a clear, factual answer
  - Not reveal sensitive personal information
  - Be formatted as a JSON object with 'question' and 'type' fields
  - Type should be one of: ['memory', 'preference', 'habit', 'interest']`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const cleanedResponse = responseText.replace(/```json|```/g, '').trim();
    const parsedResponse = JSON.parse(cleanedResponse);
    return parsedResponse;
  } catch (error) {
    console.error('Question generation failed:', error);
    throw new Error('Failed to generate question');
  }
} 