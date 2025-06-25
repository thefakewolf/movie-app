// firebase.js
import { initializeApp, getApps } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth"; // <-- 這行至關重要
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'; // <-- 這行也至關重要

const firebaseConfig = {
    apiKey: "AIzaSyCJa7n8o9cgWqOzLsA3vBro7TtsRa7ROqg",
    authDomain: "travelplanner-c327a.firebaseapp.com",
    projectId: "travelplanner-c327a",
    storageBucket: "travelplanner-c327a.firebasestorage.app",
    messagingSenderId: "454777685795",
    appId: "1:454777685795:web:a06f6b2e7abe3623e82e96"
};

// 檢查是否已經有 Firebase 應用程式實例，避免重複初始化
// 如果已經有實例，則使用現有的；否則就初始化一個新的。
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// 初始化 Auth 服務並配置 React Native 的持久化
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth, app }; // 導出 auth 和 app，以便在其他文件中使用