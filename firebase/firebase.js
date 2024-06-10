import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBpM6pMzoh-QtYEvnBPv9I7XFlFmQe8bC8",
  authDomain: "medx-fd8b7.firebaseapp.com",
  projectId: "medx-fd8b7",
  storageBucket: "medx-fd8b7.appspot.com",
  messagingSenderId: "108118664251",
  appId: "1:108118664251:web:c1aebcb1ccf9d4c8d6e81e",
  measurementId: "G-E3444NCD5S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);