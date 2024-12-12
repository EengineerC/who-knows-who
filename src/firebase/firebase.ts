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
export async function initializeGameDatabase(gameCode: string) {
    try {
        await set(ref(db, `gamecode/${gameCode}/questions`), {
            //nothing in here looks so weird
        });

        await set(ref(db, `gamecode/${gameCode}/scores`), {

        });

        console.log(`Game database structure initialized for game code: ${gameCode}`);
    } catch (error) {
        console.error("Error initializing game database:", error);
    }
}


// Function to fetch scores from the database
export async function fetchScores(
  gameCode: string = 'exampleGame'
): Promise<PlayerKnowledgeScores> {
  try {
      const scoresPath = `gamecode/${gameCode}/scores`;
      const scoreSnapshot = await get(child(ref(db), scoresPath));

      if (scoreSnapshot.exists()) {
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


export async function getGameState(gameCode: string) {
  try {
    const stateRef = ref(db, `gamecode/${gameCode}/gameState`);
    const snapshot = await get(stateRef);
    return snapshot.exists() ? snapshot.val() : null;
  } catch (error) {
    console.error("Error getting game state:", error);
    return null;
  }
}
async function updateGameState(gameCode: string, updates: any) {
  try {
    const stateRef = ref(db, `gamecode/${gameCode}/gameState`);
    await update(stateRef, updates);
  } catch (error) {
    console.error("Error updating game state:", error);
  }
}

export async function selectRandomAnswerer(gameCode: string, players: string[]) {
  const randomIndex = Math.floor(Math.random() * players.length);
  const answerer = players[randomIndex];
  
  await updateGameState(gameCode, {
    currentAnswerer: answerer,
    questionStatus: 'awaiting_answer'
  });

  return answerer;
}

// Function to add a question to the database
export async function addQuestion(gameCode: string, questionText: string) {
  try {
      await set(ref(db, `gamecode/${gameCode}/questions/`), questionText);
  } catch (error) {
      console.error("Error adding question:", error);
  }
}

export async function setCorrectAnswer(gameCode: string, questionText: string, correctAnswer: string) {
  try {
      await set(ref(db, `gamecode/${gameCode}/questions/${questionText}/correctAnswer`), correctAnswer);
  } catch (error) {
      console.error("Error adding question:", error);
  }
}

export async function addPlayer(gameCode: string, guesser: string) {
  try {
      await set(ref(db, `gamecode/${gameCode}/scores/`), guesser);
  } catch (error) {
      console.error("Error adding question:", error);
  }
}
