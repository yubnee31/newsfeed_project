import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5mgTMNNO9NneCfuk8phN1HTH_OsWOk18",
  authDomain: "newfeedproject-af3e2.firebaseapp.com",
  projectId: "newfeedproject-af3e2",
  storageBucket: "newfeedproject-af3e2.appspot.com",
  messagingSenderId: "146673318915",
  appId: "1:146673318915:web:468603d4766b35c3f6a236",
  measurementId: "G-23ERT9825B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
