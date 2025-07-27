import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
import emailjs from 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';

emailjs.init('dJE_JHAoNTxxzTxiT');
const firebaseConfig = {
    apiKey: "AIzaSyDS-MJYzAB2EDNY7Hhy2RtdEkxflj2jI-A",
    authDomain: "healthify-lab.firebaseapp.com",
    projectId: "healthify-lab",
    storageBucket: "healthify-lab.firebasestorage.app",
    messagingSenderId: "297003315332",
    appId: "1:297003315332:web:49f6ed6fc61cce4a74d2d1"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function sendReminders() {
    const bookings = await getDocs(collection(db, "leads"));
    bookings.forEach(doc => {
        const { appointmentDate, appointmentTime, phone, name } = doc.data();
        const appointment = new Date(`${appointmentDate}T${appointmentTime}`);
        const now = new Date();
        const timeDiff = (appointment - now) / (1000 * 60 * 60); // Hours
        if (timeDiff > 23 && timeDiff < 25) {
            emailjs.send('service_z3ac4pk', 'template_5v6t6ku', {
                to_name: name,
                to_email: 'report@healthifylab.com',
                message: `Reminder: ${name}, your Healthify Lab test is on ${appointmentDate} at ${appointmentTime}. Fast for 8 hours if required.`
            }).then(() => console.log('Reminder sent to', phone));
        }
    });
}
setInterval(sendReminders, 3600000); // Check hourly
