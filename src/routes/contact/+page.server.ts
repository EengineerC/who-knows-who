import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { generatePersonalQuestion } from '../../services/ai/questionGenerator';
import { calculateKnowledgeScore } from '../../services/scoring/scoreCalculator';


export const load: PageServerLoad = async () => {
    // You'll need to pass in actual player details
    const playerDetails = { name: 'John Doe' }; 
    
    try {
        const questionData = await generatePersonalQuestion(playerDetails);
        return {
            question: questionData.question,
            questionType: questionData.type
        };
    } catch (error) {
        console.error('Failed to generate question:', error);
        return {
            question: 'Could not generate a question',
            questionType: 'error'
        };
    }
};

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const answer = data.get('answer')?.toString();

        // Validate the data
        if (!answer) {
            return fail(400, { error: 'Answer is required' });
        }

        try {
            // For now, we'll just return a placeholder score
            // In a real implementation, you'd compare the answer 
            const score = await calculateKnowledgeScore(
                'Placeholder Question', 
                answer, 
                'Correct Answer'
            );

            return { 
                success: true, 
                score: score 
            };
        } catch (error) {
            console.error('Error processing answer:', error);
            return fail(500, { 
                error: 'Failed to process answer', 
                answer: answer 
            });
        }
    }
};