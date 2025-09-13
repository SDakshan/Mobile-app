// src/firebase.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB414eK7e1yrf9eS5lOLJjEN8w9WpwG3FQ",
  authDomain: "mobile-app-dac4c.firebaseapp.com",
  projectId: "mobile-app-dac4c",
  storageBucket: "mobile-app-dac4c.firebasestorage.app",
  messagingSenderId: "290077174962",
  appId: "1:290077174962:web:53cd4b56c570f4bf94edab"
};


const app = initializeApp(firebaseConfig);
console.log('Firebase Initialized:', app);
export default app;