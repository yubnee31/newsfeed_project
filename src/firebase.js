// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBBK3TtcA3QDJsCFnuYWBfIwUpKhdXUBA",
  authDomain: "sparta-94cc1.firebaseapp.com",
  projectId: "sparta-94cc1",
  storageBucket: "sparta-94cc1.appspot.com",
  messagingSenderId: "167155166663",
  appId: "1:167155166663:web:736361a294232365d2bde2",
  measurementId: "G-HWRHWVLHG0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);