// scripts/Firebase-auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier, sendSignInLinkToEmail } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDS-MJYzAB2EDNY7Hhy2RtdEkxflj2jI-A",
    authDomain: "healthify-lab.firebaseapp.com",
    projectId: "healthify-lab",
    storageBucket: "healthify-lab.firebasestorage.app",
    messagingSenderId: "297003315332",
    appId: "1:297003315332:web:49f6ed6fc61cce4a74d2d1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container", {
    size: "invisible"
}, auth);

export function sendOTP(phoneNumber) {
    return signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
}

export function sendEmailLink(email) {
    const actionCodeSettings = {
        url: "https://healthifylive.vercel.app/booking.html",
        handleCodeInApp: true
    };
    return sendSignInLinkToEmail(auth, email, actionCodeSettings);
}
