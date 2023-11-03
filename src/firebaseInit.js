// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCahkqknQ7f2hrUz55khb05eZCdPHxwc-0",
  authDomain: "users-database-d721e.firebaseapp.com",
  projectId: "users-database-d721e",
  storageBucket: "users-database-d721e.appspot.com",
  messagingSenderId: "981826827672",
  appId: "1:981826827672:web:cd13d97953bcd9e3d5e7ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

