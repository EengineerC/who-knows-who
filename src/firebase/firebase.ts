import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, update, child } from 'firebase/database';
import { PlayerKnowledgeScores } from '../types/score';

const firebaseConfig = {
  apiKey: "AIzaSyCtSxk7kAxROQVaCU9nTyh0YFy0eSbpZpo",
  authDomain: "who-knows-who-98da7.firebaseapp.com",
  databaseURL: "https://who-knows-who-98da7-default-rtdb.firebaseio.com",
  projectId: "who-knows-who-98da7",
  storageBucket: "who-knows-who-98da7.firebasestorage.app",
  messagingSenderId: "1098159458396",
  appId: "1:1098159458396:web:18bec54c2f30a16192be99",
  measurementId: "G-R6WJY9RSD3"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);


// Function to set up the initial database structure
async function initializeGameDatabase(gameCode: string) {
    try {
        // Create the base structure for a specific game code
        await set(ref(db, `gamecode/${gameCode}/questions`), {
            // You can add an initial empty questions object if needed
        });

        await set(ref(db, `gamecode/${gameCode}/scores`), {
            // You can add an initial empty scores object if needed
        });

        console.log(`Game database structure initialized for game code: ${gameCode}`);
    } catch (error) {
        console.error("Error initializing game database:", error);
    }
}


// Function to fetch scores from the database
async function fetchScores(
  gameCode: string = 'exampleGame'
): Promise<PlayerKnowledgeScores> {
  try {
      const scoresPath = `gamecode/${gameCode}/scores`;
      const scoreSnapshot = await get(child(ref(db), scoresPath));

      if (scoreSnapshot.exists()) {
          console.log(scoreSnapshot.val());
          return scoreSnapshot.val();
      } else {
          console.warn('No scores found in database');
          return {};
      }
  } catch (error) {
      console.error('Error fetching scores:', error);
      throw error;
  }
}

// Function to add a question to the database
async function addQuestion(gameCode: string, questionText: string) {
  try {
      await set(ref(db, `gamecode/${gameCode}/questions/`), questionText);
  } catch (error) {
      console.error("Error adding question:", error);
  }
}

async function setCorrectAnswer(gameCode: string, questionText: string, correctAnswer: string) {
  try {
      await set(ref(db, `gamecode/${gameCode}/questions/${questionText}/correctAnswer`), correctAnswer);
  } catch (error) {
      console.error("Error adding question:", error);
  }
}

async function addPlayer(gameCode: string, guesser: string) {
  try {
      await set(ref(db, `gamecode/${gameCode}/scores/`), guesser);
  } catch (error) {
      console.error("Error adding question:", error);
  }
}

// Function to update scores
async function updateScores(
    gameCode: string, 
    guesser: string, 
    answerer: string, 
    isCorrect: boolean
) {
    try {
        const scoreRef = ref(db, `gamecode/${gameCode}/scores/${guesser}/${answerer}`);
        
        // First, get the current scores
        const snapshot = await get(scoreRef);
        const currentScores = snapshot.exists() ? snapshot.val() : {
            totalGuesses: 0,
            correctGuesses: 0,
            accuracyPercentage: 0
        };

        // Update scores
        const updatedScores = {
            totalGuesses: (currentScores.totalGuesses || 0) + 1,
            correctGuesses: isCorrect 
                ? (currentScores.correctGuesses || 0) + 1 
                : (currentScores.correctGuesses || 0),
            accuracyPercentage: 0 // We'll calculate this next
        };

        // Recalculate accuracy percentage
        updatedScores.accuracyPercentage = updatedScores.totalGuesses > 0
            ? Math.round((updatedScores.correctGuesses / updatedScores.totalGuesses) * 100)
            : 0;

        // Update the database
        await set(scoreRef, updatedScores);
    } catch (error) {
        console.error("Error updating scores:", error);
    }
}

export {
  initializeGameDatabase,
  addQuestion,
  addPlayer,
  setCorrectAnswer,
  updateScores,
  fetchScores  
};