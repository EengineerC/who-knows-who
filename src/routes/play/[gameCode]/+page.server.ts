import { ref, get, set, update } from 'firebase/database';
import { addAnsweredPlayer, addQuestion, db, getGame,  selectRandomAnswerer } from '../../../firebase/firebase';
import { generatePersonalQuestion } from '../../../game/questionGenerator';
import { PageServerLoad } from './$types';
import { error, fail, Actions } from '@sveltejs/kit';
import { trackScores } from '../../../game/trackScore';

export const load: PageServerLoad = async ({ cookies, locals }) => {
    const gameCode = cookies.get('gameCode') || 'Error no gameCode';
    const playerName = cookies.get('playerName') || 'Error no Playername';
  
    try {
        // Ensure player is in the players list
        const playersRef = ref(db, `gamecode/${gameCode}/players`);
        const playersSnapshot = await get(playersRef);
        const players = playersSnapshot.val() || {};
        const playersList = Object.keys(players);
    
        if (!players[playerName]) {
            await update(playersRef, {
            [playerName]: true
            });
            playersList.push(playerName);

        }
        
        const game = await getGame(gameCode)
        console.log(game);
        
        if (!game.questions )
        {
            console.log('it doesnt think theres a question already');
            
            const answerer = await selectRandomAnswerer(gameCode,playersList) || 'this is to keep typescript happy'
            const questionData = await generatePersonalQuestion(answerer);
            
            addQuestion(gameCode, questionData.question);
            
            return {
                question: questionData.question,
                answerer: answerer
            };
      }
      
      else{
      return {
        question: game.questions,
        answerer: game.currentAnswerer
      };}
    } catch (error) {
      console.error('Critical error in load function:', error);
      return {
        question: 'Could not generate a question',
        questionType: 'error',
        answerer: playerName
      };
    }
  };


export const actions: Actions = {
    default: async ({ request, cookies }) => {
      const gameCode = cookies.get('gameCode') || 'Error no gameCode';
      const playerName = cookies.get('playerName') || 'Error no Playername';
      const data = await request.formData();
      const answer = data.get('answer')?.toString();

      if (!answer) {
        return fail(400, { error: 'Answer is required' });
      }
  
      try {
        const game = await getGame(gameCode)
        const answeredPlayersRef = ref(db, `gamecode/${gameCode}/answeredPlayers`);
        const answeredPlayersSnapshot = await get(answeredPlayersRef);
        const answerdPlayers = answeredPlayersSnapshot.val() || {};
    
        if (answerdPlayers[playerName]) {
            return fail(400, { error: `You have already answered this question ${playerName}` });
        }
            else{
            await update(answeredPlayersRef, {
            [playerName]: true
            });
        }
        const score = await trackScores(
          game.questions, 
          game.currentAnswerer.name, 
          playerName, 
          answer,
          gameCode
        );

        const playersSnapshot = await get(ref(db, `gamecode/${gameCode}/players`));
        const players = Object.keys(playersSnapshot.val() || {});
        const answeredSnapshot = await get(ref(db, `gamecode/${gameCode}/answeredPlayers`));
        const answered = Object.keys(answeredSnapshot.val() || {});

        if (answered.length === players.length) {
            await set(ref(db, `gamecode/${gameCode}/answeredPlayers/`), {});
          const answerer = await selectRandomAnswerer(gameCode, players) || 'Error';//I dont think itll ever hit error though
          const questionData = await generatePersonalQuestion(answerer);
  
          addQuestion(gameCode, questionData.question);
  
          return { 
            success: true, 
            score: score,
            newQuestion: questionData.question,
            newAnswerer: answerer
          };
        } else {

          return { 
            success: true, 
            score: score 
          };
        }
      } catch (error) {
        console.error('Error processing answer:', error);
        return fail(500, { 
          error: 'Failed to process answer', 
          answer: answer 
        });
      }
    }
  };
