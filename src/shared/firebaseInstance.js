import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAIhtECnODBteWPcEIOxJMxXn8gdvit_N8",
  authDomain: "nomad-twitter-b34b7.firebaseapp.com",
  projectId: "nomad-twitter-b34b7",
  storageBucket: "nomad-twitter-b34b7.appspot.com",
  messagingSenderId: "213646258997",
  appId: "1:213646258997:web:07cd34ce0e7fc87571527c",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firedb = getFirestore(app);
export const storage = getStorage(app);
