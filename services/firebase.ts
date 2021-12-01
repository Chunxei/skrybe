// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTXk9EZwAeAwOGzEt3UOP6_CWYRyqps0Q",
  authDomain: "skrybe-webapp.firebaseapp.com",
  projectId: "skrybe-webapp",
  storageBucket: "skrybe-webapp.appspot.com",
  messagingSenderId: "298190878540",
  appId: "1:298190878540:web:0d77bcc44e4191002e41e9",
  databaseURL: "https://skrybe-webapp-default-rtdb.firebaseio.com",
  measurementId: "G-STCMR1JCTG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
