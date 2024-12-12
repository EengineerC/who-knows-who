import { addAnsweredPlayer, db } from "../firebase/firebase";
import { calculateKnowledgeScore } from "./scoreCalculator";
import { getDatabase, ref, set, get, update, child } from 'firebase/database';

export const trackScores = async (
    question: string, 
    answerer: string, 
    guesser: string, 
    guess: string,
    gameCode?: string
) => {

    // If the guesser is the answerer, write their answer to the database
    if (guesser === answerer) {
        const correctAnswerRef = ref(db, `${gameCode ? `gamecode/${gameCode}/` : ''}/correctAnswer`)
        await set(correctAnswerRef, guess)
        return `Thank you for answering!`
    }
    
    // If guesser is not the answerer, check for correct answer
    const correctAnswerRef = ref(db, `${gameCode ? `gamecode/${gameCode}/` : ''}/correctAnswer`)
    const correctAnswerSnapshot = await get(correctAnswerRef)
    
    // If correct answer doesn't exist yet, return waiting status
    if (!correctAnswerSnapshot.exists()) {
        
        return `waiting for ${answerer} to answer`
    }
    
    const correctAnswer = correctAnswerSnapshot.val()
    
    const isCorrect = await calculateKnowledgeScore(question, guess, correctAnswer)
    
    const baseScorePath = gameCode ? `gamecode/${gameCode}/scores` : 'scores' //ts doesnt believe i can only get here if i have a gamecode
    
    const guessersScoreRef = ref(db, `${baseScorePath}/${guesser}`)
    const guessersScoreSnapshot = await get(guessersScoreRef)
    
    const currentScores = guessersScoreSnapshot.exists() 
        ? guessersScoreSnapshot.val() 
        : {}
    console.log('currnescores',currentScores)
    
    // Initialize player's entry if not exists
    const playerScores = currentScores[answerer] || { 
        totalGuesses: 0, 
        correctGuesses: 0, 
        accuracyPercentage: 0 
    }
    
    //self explanitory
    if (isCorrect) {
        playerScores.totalGuesses += 1
        playerScores.correctGuesses += 1
    } else {
        playerScores.totalGuesses += 1
    }
    
    // Recalculate accuracy percentage
    playerScores.accuracyPercentage = playerScores.totalGuesses > 0
        ? Math.round((playerScores.correctGuesses / playerScores.totalGuesses) * 100)
        : 0
    
    // Update the database with new scores
    await update(guessersScoreRef, {
        [answerer]: playerScores
    })


    return isCorrect ? `Nice work! You know ${answerer} pretty well!` : 'Looks like you have some things to learn'
}
