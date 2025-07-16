// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDS-MJYzAB2EDNY7Hhy2RtdEkxflj2jI-A",
  authDomain: "healthify-lab.firebaseapp.com",
  projectId: "healthify-lab",
  storageBucket: "healthify-lab.appspot.com",
  messagingSenderId: "297003315332",
  appId: "1:297003315332:web:49f6ed6fc61cce4a74d2d1",
  measurementId: "G-R0R3RYERZW"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ Make Firestore globally available
window.firestore = db;
