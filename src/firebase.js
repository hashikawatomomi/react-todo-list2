import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA8nAkmWNYdgfme9aQtdkHuZrYI4QedTqY",
  authDomain: "react-todo-list2-6f5da.firebaseapp.com",
  projectId: "react-todo-list2-6f5da",
  storageBucket: "react-todo-list2-6f5da.appspot.com",
  messagingSenderId: "501883063930",
  appId: "1:501883063930:web:6ee8ca24e0bc2cd4d7b5c3"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = firebase.auth();

export { db, auth };