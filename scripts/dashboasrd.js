import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import { getFirestore, collection, getDocs, query, where } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';

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
const db = getFirestore(app);

async function loadDashboard() {
    try {
        const userInfo = document.getElementById('userInfo');
        const bookingList = document.getElementById('bookingList');
        const reportList = document.getElementById('reportList');
        const recommendedTests = document.getElementById('recommendedTests');

        onAuthStateChanged(auth, async (user) => {
            if (user) {
                userInfo.innerHTML = `<p>Welcome, ${user.email || user.phoneNumber}</p>`;

                // Fetch bookings
                const bookingsQuery = query(collection(db, 'bookings'), where('userId', '==', user.uid));
                const bookingsSnapshot = await getDocs(bookingsQuery);
                bookingList.innerHTML = bookingsSnapshot.empty ? '<p>No bookings found.</p>' : '';
                bookingsSnapshot.forEach(doc => {
                    const booking = doc.data();
                    const card = document.createElement('div');
                    card.className = 'dashboard-card';
                    card.innerHTML = `
                        <h4>Booking: ${booking.profile}</h4>
                        <p><strong>Date:</strong> ${new Date(booking.timestamp).toLocaleDateString()}</p>
                        <p><strong>Status:</strong> ${booking.status}</p>
                    `;
                    bookingList.appendChild(card);
                });

                // Fetch reports (placeholder; assumes reports are stored in Firebase Storage or Firestore)
                reportList.innerHTML = '<p>Reports feature coming soon. Contact support for access.</p>';

                // Recommend tests based on history
                const responseProfiles = await fetch('/public/profiles.json');
                if (!responseProfiles.ok) throw new Error(`HTTP error! Status: ${responseProfiles.status}`);
                const profiles = await responseProfiles.json();
                const responseDiseases = await fetch('/public/diseases.json');
                if (!responseDiseases.ok) throw new Error(`HTTP error! Status: ${responseDiseases.status}`);
                const diseases = await responseDiseases.json();

                const userTests = bookingsSnapshot.docs.map(doc => doc.data().profile);
                const recommended = diseases
                    .filter(disease => disease.relatedTests.some(test => !userTests.includes(test)))
                    .map(disease => disease.relatedTests)
                    .flat()
                    .slice(0, 3); // Limit to 3 recommendations

                recommendedTests.innerHTML = recommended.length > 0 ? `
                    <ul>
                        ${recommended.map(test => `
                            <li>
                                <strong>${test}</strong>
                                <br><a href="/booking.html?profile=${encodeURIComponent(test.toLowerCase().replace(/ /g, '-'))}">Book Now</a>
                            </li>
                        `).join('')}
                    </ul>
                ` : '<p>No new test recommendations.</p>';
            } else {
                window.location.href = '/index.html#login';
            }
        });
    } catch (error) {
        console.error('Error loading dashboard:', error);
        document.getElementById('bookingList').innerHTML = '<p>Error loading dashboard. Please try again later.</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadDashboard);
