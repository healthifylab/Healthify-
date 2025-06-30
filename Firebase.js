// ✅ Firebase config using your linked project (assuming setup via gag92gag92@gmail.com)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDuFwOlDp-nYiHgAaA0sXXXXXX",
  authDomain: "healthifylive.firebaseapp.com",
  databaseURL: "https://healthifylive-default-rtdb.firebaseio.com",
  projectId: "healthifylive",
  storageBucket: "healthifylive.appspot.com",
  messagingSenderId: "445554000111",
  appId: "1:445554000111:web:123abc456def"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export function saveBooking(data) {
  const bookingsRef = ref(database, "bookings");
  return push(bookingsRef, data);
}
