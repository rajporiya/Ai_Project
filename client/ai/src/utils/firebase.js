
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "authexamnotes-4167a.firebaseapp.com",
  projectId: "authexamnotes-4167a",
  storageBucket: "authexamnotes-4167a.firebasestorage.app",
  messagingSenderId: "380058055095",
  appId: "1:380058055095:web:0bdf63abd23ea8b36b7832"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider

export {auth, provider}