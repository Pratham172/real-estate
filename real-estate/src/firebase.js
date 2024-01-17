// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-3562e.firebaseapp.com",
  projectId: "real-estate-3562e",
  storageBucket: "real-estate-3562e.appspot.com",
  messagingSenderId: "628696220388",
  appId: "1:628696220388:web:62d6ec08dfacbdbe4362f1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);