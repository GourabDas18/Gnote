import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "g-note-cd91a.firebaseapp.com",
    databaseURL: "https://g-note-cd91a-default-rtdb.firebaseio.com",
    projectId: "g-note-cd91a",
    storageBucket: "g-note-cd91a.appspot.com",
    messagingSenderId: "1059434688344",
    appId: "1:1059434688344:web:1eb05b0c82b2e3a80f7f2d"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const db = getDatabase(app);
  export const auth = getAuth(app);
  export const provider = new GoogleAuthProvider();
