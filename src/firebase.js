import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyDa29d7CCWfgdVGZnBdPo0kIwrP2wcpQUE",
  authDomain: "newsfeed-project-jinwoo.firebaseapp.com",
  projectId: "newsfeed-project-jinwoo",
  storageBucket: "newsfeed-project-jinwoo.appspot.com",
  messagingSenderId: "1015566740457",
  appId: "1:1015566740457:web:9852f7e7d63a8f19e07978"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
