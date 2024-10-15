// src/firebase-config.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBkheB6AIhi3ex8_HE28omuOUK5dJYrkWw",
    authDomain: "streamify-d393e.firebaseapp.com",
    projectId: "streamify-d393e",
    storageBucket: "streamify-d393e.appspot.com",
    messagingSenderId: "443222072818",
    appId: "1:443222072818:web:3bf0df0948847fc4af5f6b"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
