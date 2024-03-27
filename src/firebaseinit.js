import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWVjHdy80dz0TqAMVRZLwh-eRuym02vz0",
  authDomain: "busybuy-store.firebaseapp.com",
  projectId: "busybuy-store",
  storageBucket: "busybuy-store.appspot.com",
  messagingSenderId: "906426319232",
  appId: "1:906426319232:web:3197197c3561056d860165"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);