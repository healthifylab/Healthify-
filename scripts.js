// Firebase and EmailJS Setup
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
emailjs.init('dJE_JHAoNTxxzTxiT');

let selectedTests = new Set();
let selectedProfiles = new Set();
let testDetails = {};
let profileDetails = {};

// Load Tests (Inspired by GD Franchise disciplines)
async function loadTests() {
    const response = await fetch('tests.json');
    const tests = await response.json();
    const select = document.getElementById('test');
    select.innerHTML = '<option value="" disabled>Select test(s)</option>';
    tests.forEach(test => {
        const value = test.Test_Name.toLowerCase().replace(/\s/g, '-');
        const option = document.createElement('option');
        option.value = value;
        option.textContent = `${test.Test_Name} (₹${test.Healthify_Offer_Price})`;
        select.appendChild(option);
        testDetails[value] = { name: test.Test_Name, offerPrice: test.Healthify_Offer_Price, description: test.Description };
    });
    setupSearch('test', 'testSearch', selectedTests);
}

// Load Profiles (Inspired by GD Franchise wellness profiles)
async function loadProfiles() {
    const response = await fetch('profiles.json');
    const profiles = await response.json();
    const select = document.getElementById('profile');
    select.innerHTML = '<option value="" disabled>Select profile(s)</option>';
    profiles.forEach(profile => {
        const value = profile.Test_Name.toLowerCase().replace(/\s/g, '-');
        const option = document.createElement('option');
        option.value = value;
        option.textContent = `${profile.Test_Name} (₹${profile.Healthify_Offer_Price})`;
        select.appendChild(option);
        profileDetails[value] = { name: profile.Test_Name, offerPrice: profile.Healthify_Offer_Price, description: profile.Description, tests: profile.Tests_Included.split(', ') };
    });
    setupSearch('profile', 'profileSearch', selectedProfiles);
}

// Search and Selection
function setupSearch(selectId, searchId, selectedSet) {
    const select = document.getElementById(selectId);
    const searchInput = document.getElementById(searchId);
    const selectedDiv = selectId === 'test' ? document.getElementById('selectedTests') : document.getElementById('selectedProfiles');

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        Array.from(select.options).forEach(option => {
            if (option.value === '' || option.value === 'disabled') return;
            option.style.display = option.textContent.toLowerCase().includes(searchTerm) && !selectedSet.has(option.value) ? 'block' : 'none';
        });
    });

    select.addEventListener('change', () => {
        const selectedOptions = Array.from(select.selectedOptions).filter(option => option.value && !selectedSet.has(option.value));
        selectedOptions.forEach(option => {
            selectedSet.add(option.value);
            option.style.display = 'none';
        });
        updateSelectedItems(selectId);
    });
}

function updateSelectedItems(selectId) {
    const selectedDiv = selectId === 'test' ? document.getElementById('selectedTests') : document.getElementById('selectedProfiles');
    selectedDiv.innerHTML = '';
    (selectId === 'test' ? selectedTests : selectedProfiles).forEach(item => {
        const itemData = selectId === 'test' ? testDetails[item] : profileDetails[item];
        selectedDiv.innerHTML += `<span class="selected-tag">${itemData.name} (₹${itemData.offerPrice})</span>`;
    });
    document.getElementById(selectId).value = '';
}

// Booking Submission
document.getElementById('bookingForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const address = document.getElementById('address').value;
    const pincode = document.getElementById('pincode').value;
    const location = document.getElementById('location').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const bookingMessage = document.getElementById('bookingMessage');

    if (!name || !phone.match(/^[0-9]{10}$/) || !age || !gender || !address || !pincode.match(/[0-9]{6}/) || (selectedTests.size === 0 && selectedProfiles.size === 0)) {
        bookingMessage.textContent = "Please enter valid details and select at least one test or profile.";
        bookingMessage.style.color = "red";
        return;
    }

    bookingMessage.textContent = "Submitting your request...";
    try {
        const docRef = await addDoc(collection(db, "bookings"), {
            name, phone, age, gender, address, pincode, location,
            tests: Array.from(selectedTests),
            profiles: Array.from(selectedProfiles),
            date, time,
            timestamp: new Date().toISOString(),
            status: "New Booking"
        });
        const testsList = selectedTests.size > 0 ? Array.from(selectedTests).map(t => testDetails[t].name).join(', ') : 'None';
        const profilesList = selectedProfiles.size > 0 ? Array.from(selectedProfiles).map(p => profileDetails[p].name).join(', ') : 'None';
        const message = `
New Booking Details
Tests/Profiles:  ${testsList.padEnd(40, ' ')}
Date:           ${date.padEnd(40, ' ')}
Time:           ${time.padEnd(40, ' ')}
Location:       ${location.padEnd(40, ' ')}
Name:           ${name.padEnd(40, ' ')}
Phone:          +91${phone.padEnd(40, ' ')}
Age:            ${age.padEnd(40, ' ')}
Gender:         ${gender.padEnd(40, ' ')}
Address:        ${address.padEnd(40, ' ')}
Pincode:        ${pincode.padEnd(40, ' ')}
        `.trim();
        await emailjs.send('service_z3ac4pk', 'template_5v6t6ku', { to_name: name, to_email: 'report@healthifylab.com', message });
        bookingMessage.textContent = "Booking submitted! We’ll call you soon.";
        bookingMessage.style.color = "green";
        document.getElementById('bookingForm').reset();
        selectedTests.clear();
        selectedProfiles.clear();
        updateSelectedItems('test');
        updateSelectedItems('profile');
    } catch (error) {
        bookingMessage.textContent = `Failed to submit: ${error.message}. Try again or contact support.`;
        bookingMessage.style.color = "red";
    }
});

// Load Dashboard
function loadDashboard() {
    const bookingHistory = document.getElementById('bookingHistory');
    // Placeholder for authenticated user data (replace with real query)
    getDocs(collection(db, "bookings")).then((querySnapshot) => {
        bookingHistory.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            bookingHistory.innerHTML += `<div class="booking">
                <p>Date: ${data.date}</p>
                <p>Time: ${data.time}</p>
                <p>Tests: ${data.tests ? data.tests.map(t => testDetails[t]?.name).join(', ') : 'None'}</p>
                <p>Profiles: ${data.profiles ? data.profiles.map(p => profileDetails[p]?.name).join(', ') : 'None'}</p>
            </div>`;
        });
    });
}

window.onload = () => {
    loadTests();
    loadProfiles();
    loadDashboard();
};
