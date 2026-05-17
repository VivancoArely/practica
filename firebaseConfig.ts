// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0N4y2PHWe7HEsWRxlmmUaA7i5pbQXKGc",
  authDomain: "ecociclo-88c5d.firebaseapp.com",
  projectId: "ecociclo-88c5d",
  storageBucket: "ecociclo-88c5d.firebasestorage.app",
  messagingSenderId: "794481866556",
  appId: "1:794481866556:web:d3299ff9009f31c2965039",
  measurementId: "G-S4L1J630RQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
