// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAvBTsQLaLIKzOgNCVmguq3IDF6izcrfd4',
  authDomain: 'petifind-project.firebaseapp.com',
  projectId: 'petifind-project',
  storageBucket: 'petifind-project.appspot.com',
  messagingSenderId: '387307252059',
  appId: '1:387307252059:web:b348044f59321ebf38927e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize firestore
// export const authentication = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const authentication = getAuth(app);
