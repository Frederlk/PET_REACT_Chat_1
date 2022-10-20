import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./scss/style.scss";
import App from "./App";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Initialize Firebase
const app = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "pet-react-chat-1.firebaseapp.com",
    projectId: "pet-react-chat-1",
    storageBucket: "pet-react-chat-1.appspot.com",
    messagingSenderId: "6964334324",
    appId: "1:6964334324:web:01c061a89faf37cab5d8a1",
});

const provider = new GoogleAuthProvider();
const firestore = getFirestore();
const auth = getAuth();
export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Context.Provider value={{ firestore, auth, provider }}>
        <App />
    </Context.Provider>
);
