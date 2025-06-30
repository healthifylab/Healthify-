// ✅ Firebase Config with your actual keys

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCl0M3gDb7my6X_lYo78QSDYfRSKRD88H8",
  authDomain: "healthifylive.firebaseapp.com",
  databaseURL: "https://healthifylive-default-rtdb.firebaseio.com",
  projectId: "healthifylive",
  storageBucket: "healthifylive.appspot.com",
  messagingSenderId: "479006264516",
  appId: "1:479006264516:web:0d2d33c98fc238f7d2878e"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export function saveBooking(data) {
  const bookingsRef = ref(database, "bookings");
  const newBookingRef = push(bookingsRef);
  return set(newBookingRef, {
    ...data,
    status: "Pending",
    timestamp: new Date().toISOString()
  });
}
