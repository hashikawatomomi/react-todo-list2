import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyA8nAkmWNYdgfme9aQtdkHuZrYI4QedTqY",
  authDomain: "react-todo-list2-6f5da.firebaseapp.com",
  projectId: "react-todo-list2-6f5da",
  storageBucket: "react-todo-list2-6f5da.appspot.com",
  messagingSenderId: "501883063930",
  appId: "1:501883063930:web:6ee8ca24e0bc2cd4d7b5c3"
});

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { db, auth };