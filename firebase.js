// firebase.js — CDN modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getAuth, GoogleAuthProvider, signInWithPopup, RecaptchaVerifier,
  signInWithPhoneNumber, onAuthStateChanged, signOut,
  createUserWithEmailAndPassword, signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

import { getFirestore, doc, setDoc, addDoc, getDoc, getDocs,
  updateDoc, deleteDoc, serverTimestamp, collection, query, where, orderBy, limit
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
// ✅ Analytics (GA4 via Firebase)
import { getAnalytics, logEvent, isSupported } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";

  const firebaseConfig = {
    apiKey: "AIzaSyCNZP2MqREyefSh6Hd5aDNoE5Ao9ctMDvQ",
    authDomain: "hisablink-web.firebaseapp.com",
    projectId: "hisablink-web",
    storageBucket: "hisablink-web.firebasestorage.app",
    messagingSenderId: "646463308956",
    appId: "1:646463308956:web:bbd5e9c6644ff474495959",
    measurementId: "G-X9DRKR8KS4"
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); auth.useDeviceLanguage();
export const db = getFirestore(app);

// Analytics can be conditionally enabled (it fails on some environments)
export let analytics = null;
try {
  if (firebaseConfig.measurementId && (await isSupported())) {
    analytics = getAnalytics(app);
  }
} catch(e){ /* ignore if blocked */ }

// Handy re-export
export {
  GoogleAuthProvider, signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber,
  onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  doc, setDoc, addDoc, getDoc, getDocs, updateDoc, deleteDoc, serverTimestamp,
  collection, query, where, orderBy, limit, logEvent
};

