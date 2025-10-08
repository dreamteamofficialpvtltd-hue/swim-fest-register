import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBgSj9phXV-aZpurD850F3fpf_MlB82-w8",
  authDomain: "registerhere-c91fa.firebaseapp.com",
  projectId: "registerhere-c91fa",
  storageBucket: "registerhere-c91fa.firebasestorage.app",
  messagingSenderId: "336456064749",
  appId: "1:336456064749:web:f82244eea18169054736e4",
  measurementId: "G-1CDT23DMDC"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
