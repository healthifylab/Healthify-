// firebase.js
import firebase from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js";
import "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore-compat.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDS-MJYzAB2EDNY7Hhy2RtdEkxflj2jI-A",
  authDomain: "healthify-lab.firebaseapp.com",
  projectId: "healthify-lab",
  storageBucket: "healthify-lab.firebasestorage.app",
  messagingSenderId: "297003315332",
  appId: "1:297003315332:web:49f6ed6fc61cce4a74d2d1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore (compat for v8 API)
const db = firebase.firestore();

// Expose to window for booking.html
window.firestore = db;
