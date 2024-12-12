import { ref, get, set, update } from 'firebase/database';
import { addQuestion, db, selectRandomAnswerer } from '../../../firebase/firebase';
import { generatePersonalQuestion } from '../../../game/questionGenerator';
import { PageServerLoad } from './$types';
import { error, fail, Actions } from '@sveltejs/kit';
import { trackScores } from '../../../game/trackScore';

export const load: PageServerLoad = async ({ cookies, locals }) => {
  const gameCode = cookies.get('gameCode');
  const playerName = cookies.get('playerName');

  if (!gameCode) {
    throw error(400, { message: 'Game code is required' });
}

if (!playerName) {
    throw error(400, { message: 'Player name is required' });
}

  try {
    // Initialize game if it doesn't exist
    const gameRef = ref(db, `gamecode/${gameCode}`);
    const gameSnapshot = await get(gameRef);
    
    if (!gameSnapshot.exists()) {
      // Create initial game structure
      await set(gameRef, {
        players: {
          [playerName]: true // Add the current player
        },
        gameState: {
          questionStatus: 'not_started'
        },
        scores: {},
        questions: {}
      });
      console.log(`Initialized new game with code ${gameCode}`);
    }

    // Ensure player is in the players list
    const playersRef = ref(db, `gamecode/${gameCode}/players`);
    const playersSnapshot = await get(playersRef);
    const players = playersSnapshot.val() || {};

    if (!players[playerName]) {
      await update(playersRef, {
        [playerName]: true
      });
    }

    // Check game state
    const gameStateRef = ref(db, `gamecode/${gameCode}/gameState`);
    const gameStateSnapshot = await get(gameStateRef);
    const gameState = gameStateSnapshot.val();

    // If no question or all players have answered
    if (!gameState || 
        gameState.questionStatus === 'completed' || 
        gameState.questionStatus === 'not_started') {
      
      const playersList = Object.keys(players);

      // Ensure there are players
      if (playersList.length === 0) {
        console.error('No players found in the game');
        throw error(400, { message: 'No players in the game' });
      }

      // Select random answerer
      const answerer = await selectRandomAnswerer(gameCode, playersList);

      // Generate question for answerer
      const questionData = await generatePersonalQuestion(answerer);

      addQuestion(gameCode, questionData.question) 

      return {
        question: questionData.question,
        questionType: questionData.type,
        answerer: answerer
      };
    }

    // Return existing question if in progress
    return {
      question: gameState.currentQuestion,
      questionType: gameState.questionType,
      answerer: gameState.currentAnswerer
    };
  } catch (error) {
    console.error('Critical error in load function:', error);
  }
};

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const gameCode = cookies.get('gameCode');
    const playerName = cookies.get('playerName');
    const data = await request.formData();
    const answer = data.get('answer')?.toString();

    // Validate the data
    if (!answer) {
      return fail(400, { error: 'Answer is required' });
    }

    try {
      const gameStateRef = ref(db, `gamecode/${gameCode}/gameState`);
      const gameStateSnapshot = await get(gameStateRef);
      const gameState = gameStateSnapshot.val();

    //   Check if player has already answered
      if (gameState.answeredPlayers?.includes(playerName)) {
        return fail(400, { error: 'You have already answered this question' });
      }


      // Track scores
      const score = await trackScores(
        gameState.currentQuestion, 
        gameState.currentAnswerer, 
        playerName, 
        answer
      );

      // Update answered players
      const updatedAnsweredPlayers = [
        ...(gameState.answeredPlayers || []), 
        playerName
      ];

      // Check if all players have answered
      const playersRef = ref(db, `gamecode/${gameCode}/players`);
      const playersSnapshot = await get(playersRef);
      const players = Object.keys(playersSnapshot.val() || {});

      if (updatedAnsweredPlayers.length === players.length -1) {
  
            const answerer = await selectRandomAnswerer(gameCode, players);

            // Generate question for answerer
            const questionData = await generatePersonalQuestion(answerer);

            addQuestion(gameCode, questionData.question) 

            console.log('everyone has answered');

      } else {
        await update(gameStateRef, {
          answeredPlayers: updatedAnsweredPlayers
        });
        console.log('not everyone has answered');
      }

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




// import { Actions, fail } from '@sveltejs/kit';
// import { generatePersonalQuestion } from '../../../game/questionGenerator';
// import { calculateKnowledgeScore } from '../../../game/scoreCalculator';
// import { PageServerLoad } from './$types';
// import { trackScores } from '../../../game/trackScore';

// let question = ''
// const answerer = 'Bryant'
// const guesser = 'Bryant'

// export const load: PageServerLoad = async () => {

//     try {
        
//         const questionData = await generatePersonalQuestion(answerer);


//         question = questionData.question //TODO make this cleaner (this is so i can use it in)
//         return {
//             question: questionData.question,
//             questionType: questionData.type
//         };
//     } catch (error) {
//         console.error('Failed to generate question:', error);
//         return {
//             question: 'Could not generate a question',
//             questionType: 'error'
//         };
//     }
// };

// export const actions: Actions = {
//     default: async ({ request }) => {
//         const data = await request.formData();
//         const answer = data.get('answer')?.toString();

//         // Validate the data
//         if (!answer) {
//             return fail(400, { error: 'Answer is required' });
//         }

//         try {
//             const score = await trackScores(question,answerer,guesser,answer)

//             return { 
//                 success: true, 
//                 score: score 
//             };
//         } catch (error) {
//             console.error('Error processing answer:', error);
//             return fail(500, { 
//                 error: 'Failed to process answer', 
//                 answer: answer 
//             });
//         }
//     }
// };