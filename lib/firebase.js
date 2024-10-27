// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBgVJ_Evxjsdt6krYHtF_YmXhkfP97pu-c",
  authDomain: "uschat-2d92a.firebaseapp.com",
  projectId: "uschat-2d92a",
  storageBucket: "uschat-2d92a.appspot.com",
  messagingSenderId: "372729550737",
  appId: "1:372729550737:web:f92dc659dcb56677c1ec30",
  measurementId: "G-8B89PWMZ21"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider, signInWithPopup, signOut };
