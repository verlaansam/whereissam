// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, limit, orderBy, query, updateDoc, deleteDoc, doc } from "firebase/firestore";


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyCSQXpSjs_VME-MHjT8FPg-BxM4t0-GDPg",

  authDomain: "whereissam-eda0a.firebaseapp.com",

  projectId: "whereissam-eda0a",

  storageBucket: "whereissam-eda0a.firebasestorage.app",

  messagingSenderId: "1099249851964",

  appId: "1:1099249851964:web:168f5c6c60fa0a48242d39"


};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, collection, addDoc, getDocs, limit, orderBy, query, updateDoc, deleteDoc, doc };