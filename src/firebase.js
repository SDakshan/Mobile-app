import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 🔐 Replace this with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB414eK7e1yrf9eS5lOLJjEN8w9WpwG3FQ",
  authDomain: "mobile-app-dac4c.firebaseapp.com",
  projectId: "mobile-app-dac4c",
  storageBucket: "mobile-app-dac4c.firebasestorage.app",
  messagingSenderId: "290077174962",
  appId: "1:290077174962:web:53cd4b56c570f4bf94edab"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
