// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth ,GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  authDomain: "meetup-17c93.firebaseapp.com",
  projectId: "meetup-17c93",
  storageBucket: "meetup-17c93.appspot.com",
  messagingSenderId: "682707169755",
  appId: "1:682707169755:web:72ff4e7bbbecb53ddbf7fe",
  measurementId: "G-6HL4MB11B4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth();
export const provider=new GoogleAuthProvider();
export const storage = getStorage();
export const db = getFirestore(app);
