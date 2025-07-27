// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiJuHtjRfX0Hbh2yK8Z7mvvBirNEifpNo",
  authDomain: "organolab-66cee.firebaseapp.com",
  projectId: "organolab-66cee",
  storageBucket: "organolab-66cee.firebasestorage.app",
  messagingSenderId: "758680995709",
  appId: "1:758680995709:web:81f6297707fb10234c6e14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);