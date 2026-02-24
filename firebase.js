import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBCFdAUzwxqWdEeurbvofNXZAi76rQ5g8I",
  authDomain: "shop-8a298.firebaseapp.com",
  projectId: "shop-8a298",
  storageBucket: "shop-8a298.firebasestorage.app",
  messagingSenderId: "620245814840",
  appId: "1:620245814840:web:cb2ee06e68854091e360cd"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
