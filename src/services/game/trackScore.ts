
import { db } from "../../firebase/firebase";
import { calculateKnowledgeScore } from "./scoreCalculator"

import { getDatabase, ref, set, get, update } from 'firebase/database';

async function trackScores(question: string, answerer: string, guesser: string, guess: string) {
    
    // If the guesser is the answerer, write their answer to the database
    if (guesser === answerer) {
        const correctAnswerRef = ref(db, `questions/${question}/correctAnswer`);
        await set(correctAnswerRef, guess);
        return;
    }
    
    // If guesser is not the answerer, check for correct answer
    const correctAnswerRef = ref(db, `questions/${question}/correctAnswer`);
    const correctAnswerSnapshot = await get(correctAnswerRef);
    
    // If correct answer doesn't exist yet, return waiting status
    if (!correctAnswerSnapshot.exists()) {
        return `waiting for ${answerer} to answer`;
    }
    
    const correctAnswer = correctAnswerSnapshot.val();
    
    // Calculate knowledge score
    const isCorrect = await calculateKnowledgeScore(question, guess, correctAnswer);
    
    // Reference to the guesser's score tracking
    const guessersScoreRef = ref(db, `scores/${guesser}`);
    const guessersScoreSnapshot = await get(guessersScoreRef);
    
    // Get current scores or initialize if not exists
    const currentScores = guessersScoreSnapshot.exists() 
        ? guessersScoreSnapshot.val() 
        : {};
    
    // Initialize player's entry if not exists
    const playerScores = currentScores[answerer] || { 
        totalGuesses: 0, 
        correctGuesses: 0, 
        accuracyPercentage: 0 
    };
    
    // Update scores based on guess correctness
    if (isCorrect) {
        playerScores.totalGuesses += 1;
        playerScores.correctGuesses += 1;
    } else {
        playerScores.totalGuesses += 1;
    }
    
    // Recalculate accuracy percentage
    playerScores.accuracyPercentage = playerScores.totalGuesses > 0
        ? Math.round((playerScores.correctGuesses / playerScores.totalGuesses) * 100)
        : 0;
    
    // Update the database with new scores
    await update(guessersScoreRef, {
        [answerer]: playerScores
    });
}







// // import { Player } from "../../types/game";
// // import { PlayerKnowledgeScores } from "../../types/score";
// // import { calculateKnowledgeScore } from "./scoreCalculator";



// // class KnowledgeTracker {
// //     private knowledgeScores: PlayerKnowledgeScores = {};

// //     // Initialize tracking for a player
// //     initializePlayerTracking(playerID: string) {
// //         if (!this.knowledgeScores[playerID]) {
// //             this.knowledgeScores[playerID] = {};
// //         }
// //     }

// //     // Update knowledge score after a guess
// //     async updateKnowledgeScore(
// //         question: string,
// //         guesser: Player, 
// //         answerer: Player, 
// //         guess: string, 
// //         correctAnswer: string
// //     ) {
// //         // Ensure players are tracked
// //         this.initializePlayerTracking(guesser.id);
// //         this.initializePlayerTracking(answerer.id);

// //         // If no existing tracking for this player-to-player relationship, initialize
// //         if (!this.knowledgeScores[guesser.id][answerer.id]) {
// //             this.knowledgeScores[guesser.id][answerer.id] = {
// //                 totalGuesses: 0,
// //                 correctGuesses: 0,
// //                 accuracyPercentage: 0
// //             };
// //         }

// //         // Use existing calculateKnowledgeScore function to determine accuracy
// //         const isCorrect = await calculateKnowledgeScore(
// //             question, guess, correctAnswer
// //         );

// //         // Update tracking
// //         const playerScores = this.knowledgeScores[guesser.id][answerer.id];
// //         playerScores.totalGuesses++;
        
// //         if (isCorrect) {
// //             playerScores.correctGuesses++;
// //         }

// //         // Recalculate accuracy percentage
// //         playerScores.accuracyPercentage = 
// //             (playerScores.correctGuesses / playerScores.totalGuesses) * 100;
// //     }

// //     // Get knowledge score for a specific player-to-player relationship
// //     getKnowledgeScore(guesserID: string, answererID: string) {
// //         return this.knowledgeScores[guesserID]?.[answererID] || null;
// //     }

// //     // Get overall knowledge scores for a player
// //     getPlayerOverallKnowledgeScores(playerID: string) {
// //         return this.knowledgeScores[playerID] || {};
// //     }

// //     // Serialize scores for storage (e.g., database, local storage)
// //     serializeScores() {
// //         return JSON.stringify(this.knowledgeScores);
// //     }

// //     // Deserialize and load scores
// //     deserializeScores(serializedScores: string) {
// //         this.knowledgeScores = JSON.parse(serializedScores);
// //     }
// // }

// // export default KnowledgeTracker;






// import { db } from "../../firebase/firebase";
// import { Player } from "../../types/game";
// import { PlayerKnowledgeScores } from "../../types/score";
// import { calculateKnowledgeScore } from "./scoreCalculator";

// import { 
//   doc, 
//   setDoc, 
//   getDoc, 
//   updateDoc, 
//   collection 
// } from 'firebase/firestore';

// class KnowledgeTracker {
//     private knowledgeScores: PlayerKnowledgeScores = {};

//     // Firebase collection reference
//     private knowledgeScoresRef = collection(db, 'knowledgeScores');
//     // Initialize tracking for a player in Firebase
//     async initializePlayerTracking(playerID: string) {
//         try {
//             const playerDocRef = doc(this.knowledgeScoresRef, playerID);
//             const playerDoc = await getDoc(playerDocRef);

//             if (!playerDoc.exists()) {
//                 await setDoc(playerDocRef, {});
//             }
//         } catch (error) {
//             console.error('Error initializing player tracking:', error);
//         }
//     }

//     // Update knowledge score after a guess and store in Firebase
//     async updateKnowledgeScore(
//         question: string,
//         guesser: Player, 
//         answerer: Player, 
//         guess: string, 
//         correctAnswer: string
//     ) {
//         try {
//             // Ensure players are tracked
//             await this.initializePlayerTracking(guesser.id);
//             await this.initializePlayerTracking(answerer.id);

//             // Get current knowledge scores for the guesser
//             const guesserDocRef = doc(this.knowledgeScoresRef, guesser.id);
//             const guesserDoc = await getDoc(guesserDocRef);
//             const currentScores = guesserDoc.data() || {};

//             // Initialize player-to-player relationship if not exists
//             if (!currentScores[answerer.id]) {
//                 currentScores[answerer.id] = {
//                     totalGuesses: 0,
//                     correctGuesses: 0,
//                     accuracyPercentage: 0
//                 };
//             }

//             // Calculate if the guess is correct
//             const isCorrect = await calculateKnowledgeScore(
//                 question, guess, correctAnswer
//             );

//             // Update scores
//             const playerScores = currentScores[answerer.id];
//             playerScores.totalGuesses++;
            
//             if (isCorrect) {
//                 playerScores.correctGuesses++;
//             }

//             // Recalculate accuracy percentage
//             playerScores.accuracyPercentage = 
//                 (playerScores.correctGuesses / playerScores.totalGuesses) * 100;

//             // Update in Firebase
//             await updateDoc(guesserDocRef, currentScores);

//             // Update local cache
//             this.knowledgeScores[guesser.id] = currentScores;

//             return playerScores;
//         } catch (error) {
//             console.error('Error updating knowledge score:', error);
//             throw error;
//         }
//     }

//     // Get knowledge score for a specific player-to-player relationship from Firebase
//     async getKnowledgeScore(guesserID: string, answererID: string) {
//         try {
//             const guesserDocRef = doc(this.knowledgeScoresRef, guesserID);
//             const guesserDoc = await getDoc(guesserDocRef);
//             const scores = guesserDoc.data() || {};

//             return scores[answererID] || null;
//         } catch (error) {
//             console.error('Error getting knowledge score:', error);
//             return null;
//         }
//     }

//     // Get overall knowledge scores for a player from Firebase
//     async getPlayerOverallKnowledgeScores(playerID: string) {
//         try {
//             const playerDocRef = doc(this.knowledgeScoresRef, playerID);
//             const playerDoc = await getDoc(playerDocRef);

//             return playerDoc.data() || {};
//         } catch (error) {
//             console.error('Error getting player overall knowledge scores:', error);
//             return {};
//         }
//     }

//     // Load knowledge scores from Firebase
//     async loadKnowledgeScores(playerID: string) {
//         try {
//             const playerDocRef = doc(this.knowledgeScoresRef, playerID);
//             const playerDoc = await getDoc(playerDocRef);

//             if (playerDoc.exists()) {
//                 this.knowledgeScores[playerID] = playerDoc.data() || {};
//             }
//         } catch (error) {
//             console.error('Error loading knowledge scores:', error);
//         }
//     }

//     // Serialize scores (now mostly a pass-through since Firebase handles storage)
//     async serializeScores(playerID: string) {
//         try {
//             const playerDocRef = doc(this.knowledgeScoresRef, playerID);
//             const playerDoc = await getDoc(playerDocRef);
//             return JSON.stringify(playerDoc.data() || {});
//         } catch (error) {
//             console.error('Error serializing scores:', error);
//             return '{}';
//         }
//     }

//     // Deserialize and load scores
//     async deserializeScores(playerID: string, serializedScores: string) {
//         try {
//             const playerDocRef = doc(this.knowledgeScoresRef, playerID);
//             const parsedScores = JSON.parse(serializedScores);
//             await setDoc(playerDocRef, parsedScores);
//             this.knowledgeScores[playerID] = parsedScores;
//         } catch (error) {
//             console.error('Error deserializing scores:', error);
//         }
//     }
// }

// export default KnowledgeTracker;

// // Example usage
// async function exampleUsage() {
//     const knowledgeTracker = new KnowledgeTracker();

//     // Update knowledge score
//     await knowledgeTracker.updateKnowledgeScore(
//         "What is player A's favorite color?",
//         { id: "playerB", name: "Player B" },
//         { id: "playerA", name: "Player A" },
//         "Blue",
//         "Blue"
//     );

//     // Retrieve knowledge scores
//     const overallScores = await knowledgeTracker.getPlayerOverallKnowledgeScores("playerB");
//     const specificScore = await knowledgeTracker.getKnowledgeScore("playerB", "playerA");
// }

// exampleUsage()


// import { db } from "../../firebase/firebase";
// import { Player } from "../../types/game";
// import { PlayerKnowledgeScores } from "../../types/score";
// import { calculateKnowledgeScore } from "./scoreCalculator";
// import { getDatabase, ref, set, get, update, child } from 'firebase/database';

// class KnowledgeTracker {
//     private knowledgeScores: PlayerKnowledgeScores = {};

//     async initializePlayerTracking(playerID: string) {
//         try {
//             const playerRef = ref(db, `knowledgeScores/${playerID}`);
//             const snapshot = await get(playerRef);
            
//             if (!snapshot.exists()) {
//                 await set(playerRef, {});
//             }
//         } catch (error) {
//             console.error('Error initializing player tracking:', error);
//         }
//     }

//     async updateKnowledgeScore(
//         question: string,
//         guesser: Player, 
//         answerer: Player, 
//         guess: string, 
//         correctAnswer: string
//     ) {
//         try {
//             await this.initializePlayerTracking(guesser.id);
//             await this.initializePlayerTracking(answerer.id);

//             const guesserRef = ref(db, `knowledgeScores/${guesser.id}/${answerer.id}`);
//             const guesserSnapshot = await get(guesserRef);
//             const currentScores = guesserSnapshot.val() || {
//                 totalGuesses: 0,
//                 correctGuesses: 0,
//                 accuracyPercentage: 0
//             };

//             const isCorrect = await calculateKnowledgeScore(
//                 question, guess, correctAnswer
//             );

//             currentScores.totalGuesses++;
            
//             if (isCorrect) {
//                 currentScores.correctGuesses++;
//             }

//             currentScores.accuracyPercentage = 
//                 (currentScores.correctGuesses / currentScores.totalGuesses) * 100;

//             await set(guesserRef, currentScores);

//             this.knowledgeScores[guesser.id] = this.knowledgeScores[guesser.id] || {};
//             this.knowledgeScores[guesser.id][answerer.id] = currentScores;

//             return currentScores;
//         } catch (error) {
//             console.error('Error updating knowledge score:', error);
//             throw error;
//         }
//     }

//     async getKnowledgeScore(guesserID: string, answererID: string) {
//         try {
//             const scoreRef = ref(db, `knowledgeScores/${guesserID}/${answererID}`);
//             const snapshot = await get(scoreRef);
//             return snapshot.val() || null;
//         } catch (error) {
//             console.error('Error getting knowledge score:', error);
//             return null;
//         }
//     }

//     async getPlayerOverallKnowledgeScores(playerID: string) {
//         try {
//             const playerRef = ref(db, `knowledgeScores/${playerID}`);
//             const snapshot = await get(playerRef);
//             return snapshot.val() || {};
//         } catch (error) {
//             console.error('Error getting player overall knowledge scores:', error);
//             return {};
//         }
//     }

//     async loadKnowledgeScores(playerID: string) {
//         try {
//             const playerRef = ref(db, `knowledgeScores/${playerID}`);
//             const snapshot = await get(playerRef);
            
//             if (snapshot.exists()) {
//                 this.knowledgeScores[playerID] = snapshot.val() || {};
//             }
//         } catch (error) {
//             console.error('Error loading knowledge scores:', error);
//         }
//     }

//     async serializeScores(playerID: string) {
//         try {
//             const playerRef = ref(db, `knowledgeScores/${playerID}`);
//             const snapshot = await get(playerRef);
//             return JSON.stringify(snapshot.val() || {});
//         } catch (error) {
//             console.error('Error serializing scores:', error);
//             return '{}';
//         }
//     }

//     async deserializeScores(playerID: string, serializedScores: string) {
//         try {
//             const playerRef = ref(db, `knowledgeScores/${playerID}`);
//             const parsedScores = JSON.parse(serializedScores);
//             await set(playerRef, parsedScores);
//             this.knowledgeScores[playerID] = parsedScores;
//         } catch (error) {
//             console.error('Error deserializing scores:', error);
//         }
//     }
// }

// export default KnowledgeTracker;


//await right correctAnswer from database

//if right answer isnt there say waiting for {answerer} to answer

//when we get right answer I 

// const question = 'i need to connect this'
// const correctAnswer: string = 'blue'
// const guess = 'blue'