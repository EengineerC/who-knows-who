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
async function addQuestion(gameCode: string, questionText: string, correctAnswer: string) {
    try {
        await set(ref(db, `gamecode/${gameCode}/questions/${questionText}/correctAnswer`), correctAnswer);
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

// Example usage
async function exampleGameFlow() {
    const gameCode = 'GAME123';
    
    // Initialize the game database structure
    await initializeGameDatabase(gameCode);

    // Add a question
    await addQuestion(gameCode, 'What is the capital of France?', 'Paris');

    // Simulate a guess
    // Assume you have a function to determine if the guess is correct
    const isCorrectGuess = true;
    await updateScores(gameCode, 'Alice', 'Bob', isCorrectGuess);
}

// Export these functions if you're using modules
// Add to your exports
export {
  initializeGameDatabase,
  addQuestion,
  updateScores,
  fetchScores  // Add this line
};

exampleGameFlow()



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCtSxk7kAxROQVaCU9nTyh0YFy0eSbpZpo",
//   authDomain: "who-knows-who-98da7.firebaseapp.com",
//   projectId: "who-knows-who-98da7",
//   storageBucket: "who-knows-who-98da7.firebasestorage.app",
//   messagingSenderId: "1098159458396",
//   appId: "1:1098159458396:web:18bec54c2f30a16192be99",
//   measurementId: "G-R6WJY9RSD3"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);





















// import * as admin from 'firebase-admin';
// import * as dotenv from 'dotenv';

// dotenv.config();

// interface ServiceAccount {
//   project_id: string;
//   private_key_id: string;
//   private_key: string;
//   client_email: string;
//   client_id: string;
//   auth_uri: string;
//   token_uri: string;
//   auth_provider_x509_cert_url: string;
//   client_x509_cert_url: string;
// }

// const projectId = process.env.FIREBASE_PROJECT_ID;
// const privateKey = process.env.FIREBASE_PRIVATE_KEY;
// const privateKeyId = process.env.FIREBASE_PRIVATE_KEY_ID;
// const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
// const clientId = process.env.FIREBASE_CLIENT_ID;

// if (!projectId || !privateKey || !privateKeyId || !clientEmail || !clientId) {
//   throw new Error('Missing required Firebase environment variables.');
// }

// const serviceAccount: ServiceAccount = {
//   project_id: projectId,
//   private_key_id: privateKeyId,
//   private_key: privateKey.replace(/\\n/g, '\n'),  // Fix for multiline private key
//   client_email: clientEmail,
//   client_id: clientId,
//   auth_uri: "https://accounts.google.com/o/oauth2/auth",
//   token_uri: "https://oauth2.googleapis.com/token",
//   auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//   client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-5d5m3%40who-knows-who-98da7.iam.gserviceaccount.com"
// };

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount as admin.ServiceAccount), 
//   databaseURL: "https://who-knows-who-98da7.firebaseio.com"  
// });

// const db = admin.firestore();
// const rtdb = admin.database();

// export { db, rtdb };
