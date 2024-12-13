import { ref, get, set, update } from 'firebase/database';
import { addQuestion, db, getGame,  selectRandomAnswerer } from '../../../firebase/firebase';
import { generatePersonalQuestion } from '../../../game/questionGenerator';
import { PageServerLoad } from './$types';
import { fail, Actions } from '@sveltejs/kit';
import { trackScores } from '../../../game/trackScore';

export const load: PageServerLoad = async ({ cookies, locals }) => {
    const gameCode = cookies.get('gameCode') || 'Error no gameCode'
    const playerName = cookies.get('playerName') || 'Error no Playername'

    try {
        const playersRef = ref(db, `gamecode/${gameCode}/players`)
        const playersSnapshot = await get(playersRef)
        const players = playersSnapshot.val() || {}
        const playersList = Object.keys(players)
        
        // make sure player is in the players list
        if (!players[playerName]) {
            await update(playersRef, {
            [playerName]: true
            })
            playersList.push(playerName)

        }
        
        const game = await getGame(gameCode)
        
        //make sure there is a question (should only hit this on first load)
        if (!game.questions )
        {
            const answerer = await selectRandomAnswerer(gameCode,playersList) || 'this is to keep typescript happy'
            const questionData = await generatePersonalQuestion(answerer)
            
            addQuestion(gameCode, questionData.question)
            return {
                question: questionData.question,
                answerer: answerer
            }
    }
    
    else{
    return {
        question: game.questions,
        answerer: game.currentAnswerer
    }}
    } catch (error) {
    console.error('Critical error in load function:', error)
    return {
        question: 'Could not generate a question',
        questionType: 'error',
        answerer: playerName
    }
    }
}


export const actions: Actions = {
    default: async ({ request, cookies }) => {
    //getting the client side data i need
    const gameCode = cookies.get('gameCode') || 'Error no gameCode'
    const playerName = cookies.get('playerName') || 'Error no Playername'
    const data = await request.formData()
    const answer = data.get('answer')?.toString()

    if (!answer) {
        return fail(400, { error: 'Answer is required' })
    }

    try {
        const game = await getGame(gameCode)
        const answeredPlayersRef = ref(db, `gamecode/${gameCode}/answeredPlayers`)
        const answeredPlayersSnapshot = await get(answeredPlayersRef)
        const answerdPlayers = answeredPlayersSnapshot.val() || {}

        if (game.currentAnswerer.name != playerName && !game.correctAnswer){
            return fail(400, { error: `Just a second. ${game.currentAnswerer.name} needs to answer first` })}
    
        if (answerdPlayers[playerName]) {
            return fail(400, { error: `You have already answered this question ${playerName}` })
        }
            else{
            await update(answeredPlayersRef, {
            [playerName]: true
            })
        }
        const message = await trackScores(
        game.questions, 
        game.currentAnswerer.name, 
        playerName, 
        answer,
        gameCode
        )
        await set(ref(db, `gamecode/${gameCode}/roundStatus/`), 'inProgress')    

        const playersSnapshot = await get(ref(db, `gamecode/${gameCode}/players`))
        const players = Object.keys(playersSnapshot.val() || {})
        const answeredSnapshot = await get(ref(db, `gamecode/${gameCode}/answeredPlayers`))
        const answered = Object.keys(answeredSnapshot.val() || {})

        if (answered.length === players.length) {
            await set(ref(db, `gamecode/${gameCode}/answeredPlayers/`), {})
            await set(ref(db, `gamecode/${gameCode}/correctAnswer/`), {})
            await set(ref(db, `gamecode/${gameCode}/roundStatus/`), {})
            const answerer = await selectRandomAnswerer(gameCode, players) || 'Error'//I dont think itll ever hit error though
            const questionData = await generatePersonalQuestion(answerer)
        addQuestion(gameCode, questionData.question)
            
        return { 
            success: true, 
            message: message,
            newQuestion: questionData.question,
            newAnswerer: answerer
        }
        } else {

        return { 
            success: true, 
            message: message 
        }
        }
    } catch (error) {
        console.error('Error processing answer:', error)
        return fail(500, { 
        error: 'Failed to process answer', 
        answer: answer 
        })
    }
    }
};
