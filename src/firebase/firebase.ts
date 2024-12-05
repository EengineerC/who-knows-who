import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, update, child } from 'firebase/database';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  storageBucket: "who-knows-who-98da7.firebasestorage.app",
  messagingSenderId: "1098159458396",
  appId: "1:1098159458396:web:18bec54c2f30a16192be99",
  measurementId: "G-R6WJY9RSD3"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);







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
