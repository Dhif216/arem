// Firebase initialization
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Provided config
const firebaseConfig = {
  apiKey: "AIzaSyD2N3ekoVGQqBGw2ME3L4BvHBJAXxfp2iU",
  authDomain: "tunisian-sweets-3d860.firebaseapp.com",
  projectId: "tunisian-sweets-3d860",
  storageBucket: "tunisian-sweets-3d860.firebasestorage.app",
  messagingSenderId: "286297710207",
  appId: "1:286297710207:web:b8bd4319a50a71c19a294a",
  measurementId: "G-ZFBM6Z011C"
};

// Initialize Firebase app (only once)
const app = initializeApp(firebaseConfig);

// Export Firestore and Storage
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
