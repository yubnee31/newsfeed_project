// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9uX-3vjnwi_iqLXQJyYG5IVNu-yG_KW0",
  authDomain: "newsfeed-project-9700b.firebaseapp.com",
  projectId: "newsfeed-project-9700b",
  storageBucket: "newsfeed-project-9700b.appspot.com",
  messagingSenderId: "274936408011",
  appId: "1:274936408011:web:22a595434abe3e3332784e"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);