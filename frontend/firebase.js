// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCJa7n8o9cgWqOzLsA3vBro7TtsRa7ROqg",
    authDomain: "travelplanner-c327a.firebaseapp.com",
    projectId: "travelplanner-c327a",
    storageBucket: "travelplanner-c327a.firebasestorage.app",
    messagingSenderId: "454777685795",
    appId: "1:454777685795:web:a06f6b2e7abe3623e82e96"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
