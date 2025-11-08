// firebase.js — CDN modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getAuth, GoogleAuthProvider, signInWithPopup, RecaptchaVerifier,
  signInWithPhoneNumber, onAuthStateChanged, signOut,
  createUserWithEmailAndPassword, signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

import {
  getFirestore, doc, setDoc, addDoc, getDoc, getDocs,
  updateDoc, deleteDoc, serverTimestamp, collection, query, where, orderBy, limit
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

import {
  getStorage, ref, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js";

import {
  getAnalytics, logEvent, isSupported
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";


// ✅ Your Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNZP2MqREyefSh6Hd5aDNoE5Ao9ctMDvQ",
  authDomain: "hisablink-web.firebaseapp.com",
  projectId: "hisablink-web",
  storageBucket: "hisablink-web.firebasestorage.app", // ✅ FIXED: correct bucket domain
  messagingSenderId: "646463308956",
  appId: "1:646463308956:web:bbd5e9c6644ff474495959",
  measurementId: "G-X9DRKR8KS4"
};


// ✅ Initialize App
export const app = initializeApp(firebaseConfig);

// ✅ Core Firebase Services
export const auth = getAuth(app);
auth.useDeviceLanguage();

export const db = getFirestore(app);
export const storage = getStorage(app); // ✅ Added for uploads (logos, docs, etc.)


// ✅ Conditionally Enable Analytics
export let analytics = null;
try {
  if (firebaseConfig.measurementId && (await isSupported())) {
    analytics = getAnalytics(app);
  }
} catch (e) {
  console.warn("Analytics not supported:", e.message);
}


// ✅ Export Common Firebase Functions
export {
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  doc,
  setDoc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  collection,
  query,
  where,
  orderBy,
  limit,
  ref,
  uploadBytes,
  getDownloadURL,
  logEvent
};

