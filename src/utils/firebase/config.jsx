import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyB6LEwlBXGzDIJF2UHruA_LNOZAVLd1FCA",
  authDomain: "socialmedia-2c800.firebaseapp.com",
  projectId: "socialmedia-2c800",
  storageBucket: "socialmedia-2c800.appspot.com",
  messagingSenderId: "945161392580",
  appId: "1:945161392580:web:ed27a6492e2a8857a8d491",
  measurementId: "G-6NTKF1G3Z2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export {auth, provider}