// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize firestore
// export const authentication = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const authentication = getAuth(app);
