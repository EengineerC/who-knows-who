import { Player } from '../../types/game';
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




// interface ScoringFactors {
//     accuracy: number;      // 0-1 based on answer correctness
//   //   speed: number;        // 0-1 based on response time
//     consistency: number;  // 0-1 based on historical performance
//   }

// function calculateAccuracy(guess: string, correctAnswer: string): number {
//   // Simple string similarity for now
//   return guess.toLowerCase() === correctAnswer.toLowerCase() ? 1 : 0;
// }

// function calculateSpeedFactor(timestamp: number): number {
//   // Placeholder speed calculation
//   return 0.5; // Default middle value
// }

// function calculateConsistencyFactor(guesser: Player, answerer: Player): number {
//   // Placeholder consistency calculation
//   return 0.5; // Default middle value
// }

// function weightedAverage(factors: ScoringFactors): number {
//   return (factors.accuracy * 0.6) /*+ (factors.speed * 0.2)*/ + (factors.consistency * 0.2);
// } 


// import { GoogleGenerativeAI } from "@google/generative-ai";

// interface PlayerDetails {
//   name: string;
// }


// export async function generatePersonalQuestion(playerDetails: PlayerDetails) {
//   const apiKey = process.env.COMPARER_API_KEY;
//   if (!apiKey) throw new Error('GEMINI_API_KEY is not configured');
  
//   const genAI = new GoogleGenerativeAI(apiKey);
//   const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//   // Add safety checks
//   if (!playerDetails?.name) {
//     throw new Error('Player details are required');
//   }

//   const prompt = `Generate a unique personal trivia question about ${playerDetails.name} 
//   that requires specific insider knowledge. The question should:
//   - Be specific enough that only close friends/family would know
//   - Have a clear, factual answer
//   - Not reveal sensitive personal information
//   - Be formatted as a JSON object with 'question' and 'type' fields
//   - Type should be one of: ['memory', 'preference', 'habit', 'interest']`;

//   try {
//     const result = await model.generateContent(prompt);
//     const parsedResponse = JSON.parse(result.response.text());
//     return parsedResponse;
//   } catch (error) {
//     console.error('Question generation failed:', error);
//     throw new Error('Failed to generate question');
//   }
// } 