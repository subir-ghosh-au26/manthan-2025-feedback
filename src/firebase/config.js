import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAtR0Kqll1JwZIPpuNBUwnBw6hhintAgCw",
  authDomain: "manthan-2025-e87ac.firebaseapp.com",
  projectId: "manthan-2025-e87ac",
  storageBucket: "manthan-2025-e87ac.firebasestorage.app",
  messagingSenderId: "513649570190",
  appId: "1:513649570190:web:b5d75880e94d061b8cf4df",
  measurementId: "G-F0RR1DYJ8Z"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);