import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { generatePersonalQuestion } from '../../services/game/questionGenerator';
import { calculateKnowledgeScore } from '../../services/game/scoreCalculator';


export const load: PageServerLoad = async () => {
    // Todo: conect to actual player data
    const playerDetails = { name: 'alice' }; 
    
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
            const score = await calculateKnowledgeScore(
                'Placeholder Question', 
                answer, 
                'Correct Answer'
            ); //Todo connect to real data

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