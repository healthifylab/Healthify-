// Optional: Fetch test profiles from Firebase and populate All Tests section
document.addEventListener('DOMContentLoaded', () => {
    // Example: Replace with your Firebase configuration
    /*
    const firebaseConfig = {
        // Your Firebase config here
    };
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    db.collection('tests').get().then((querySnapshot) => {
        const allTestsGrid = document.getElementById('all-tests-grid');
        querySnapshot.forEach((doc) => {
            const test = doc.data();
            const testCard = document.createElement('div');
            testCard.className = 'test-card';
            testCard.innerHTML = `
                <h3>${test.name}</h3>
                <p>₹${test.price}</p>
                <p>${test.description}</p>
                <a href="booking.html?profile=${test.id}" class="test-button">Book Now</a>
            `;
            allTestsGrid.appendChild(testCard);
        });
    });
    */
});
