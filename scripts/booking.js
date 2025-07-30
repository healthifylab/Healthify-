// scripts/booking.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';

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

function updateSummaryCard() {
    const summaryCard = document.getElementById('summaryCard');
    if (selectedTests.size === 0 && selectedProfiles.size === 0) {
        summaryCard.style.display = 'none';
        return;
    }

    const totalMRP = Array.from(selectedTests).reduce((sum, test) => sum + (testDetails[test]?.mrp || testDetails[test]?.offerPrice * 1.5 || 0), 0) +
                     Array.from(selectedProfiles).reduce((sum, profile) => sum + (profileDetails[profile]?.mrp || profileDetails[profile]?.offerPrice * 1.5 || 0), 0);
    const totalOffer = Array.from(selectedTests).reduce((sum, test) => sum + (testDetails[test]?.offerPrice || 0), 0) +
                       Array.from(selectedProfiles).reduce((sum, profile) => sum + (profileDetails[profile]?.offerPrice || 0), 0);
    const savings = totalMRP - totalOffer;
    const savingsPercentage = totalMRP > 0 ? ((savings / totalMRP) * 100).toFixed(2) : 0;

    summaryCard.style.display = 'block';
    summaryCard.innerHTML = `
        <div class="summary-item"><strong>Total Amount:</strong> <span class="total-amount">₹${totalMRP.toFixed(2)}</span></div>
        <div class="summary-item"><strong>Discounted Amount:</strong> <span class="discounted-amount">₹${totalOffer.toFixed(2)}</span></div>
        <div class="summary-item"><strong>Saved with Healthify:</strong> <span class="saved-amount">₹${savings.toFixed(2)}</span> (<span class="discounted-amount">${savingsPercentage}% off</span>)</div>
    `;
}

window.removeSelection = function(type, item) {
    if (type === 'test') selectedTests.delete(item);
    else selectedProfiles.delete(item);
    updateSelectedItems(type);
};

function updateSelectedItems(type) {
    const selectedDiv = type === 'test' ? document.getElementById('selectedTests') : document.getElementById('selectedProfiles');
    const selectedSet = type === 'test' ? selectedTests : selectedProfiles;
    selectedDiv.innerHTML = '';
    selectedSet.forEach(item => {
        if (type === 'test' && testDetails[item]) {
            const test = testDetails[item];
            selectedDiv.innerHTML += `
                <span class="selected-tag">${test.name} (MRP: <s><span class="total-amount">₹${test.mrp || test.offerPrice * 1.5}</span></s>, Offer: <span class="discounted-amount">₹${test.offerPrice}</span>)
                    <button type="button" onclick="removeSelection('test', '${item}')">×</button>
                </span>
                <div class="item-details">
                    <p><strong>Description:</strong> ${test.description}</p>
                </div>
            `;
        } else if (type === 'profile' && profileDetails[item]) {
            const profile = profileDetails[item];
            selectedDiv.innerHTML += `
                <span class="selected-tag">${profile.name} (MRP: <s><span class="total-amount">₹${profile.mrp || profile.offerPrice * 1.5}</span></s>, Offer: <span class="discounted-amount">₹${profile.offerPrice}</span>)
                    <button type="button" onclick="removeSelection('profile', '${item}')">×</button>
                </span>
                <div class="profile-details">
                    <p><strong>Description:</strong> ${profile.description}</p>
                    <ul class="included-tests"><strong>Tests Included:</strong>
                        ${profile.tests.map(test => `<li>${test}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
    });
    updateSummaryCard();
}

window.addSelection = function(type, item) {
    if (type === 'test') selectedTests.add(item);
    else selectedProfiles.add(item);
    updateSelectedItems(type);
};

async function loadTests() {
    try {
        const response = await fetch('/public/tests.json');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const tests = await response.json();
        const resultsDiv = document.getElementById('testResults');
        resultsDiv.innerHTML = '';
        tests.forEach(test => {
            const value = test.Test_Name.toLowerCase().replace(/\s/g, '-');
            testDetails[value] = {
                name: test.Test_Name,
                mrp: test.MRP,
                offerPrice: test.Healthify_Offer_Price,
                description: test.Description || 'No description available'
            };
            const item = document.createElement('div');
            item.className = 'search-result';
            item.innerHTML = `<strong>${test.Test_Name}</strong> (₹${test.Healthify_Offer_Price})<button onclick="addSelection('test', '${value}')">Add</button>`;
            item.addEventListener('click', () => addSelection('test', value));
            resultsDiv.appendChild(item);
        });
        setupSearch('test', 'testSearch', 'testResults', tests);
    } catch (error) {
        console.error('Error loading tests:', error);
        document.getElementById('testResults').innerHTML = '<div class="error">Error loading tests. Please try again.</div>';
    }
}

async function loadProfiles() {
    try {
        const response = await fetch('/public/profiles.json');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const profiles = await response.json();
        const resultsDiv = document.getElementById('profileResults');
        resultsDiv.innerHTML = '';
        profiles.forEach(profile => {
            const value = profile.Test_Name.toLowerCase().replace(/\s/g, '-');
            profileDetails[value] = {
                name: profile.Test_Name,
                mrp: profile.MRP,
                offerPrice: profile.Healthify_Offer_Price,
                description: profile.Description || 'No description available',
                tests: profile.Tests_Included.split(', ')
            };
            const item = document.createElement('div');
            item.className = 'search-result';
            item.innerHTML = `<strong>${profile.Test_Name}</strong> (₹${profile.Healthify_Offer_Price})<button onclick="addSelection('profile', '${value}')">Add</button>`;
            item.addEventListener('click', () => addSelection('profile', value));
            resultsDiv.appendChild(item);
        });
        setupSearch('profile', 'profileSearch', 'profileResults', profiles);
    } catch (error) {
        console.error('Error loading profiles:', error);
        document.getElementById('profileResults').innerHTML = '<div class="error">Error loading profiles. Please try again.</div>';
    }
}

function setupSearch(type, inputId, resultsId, items) {
    const input = document.getElementById(inputId);
    const resultsDiv = document.getElementById(resultsId);
    if (!input || !resultsDiv) {
        console.error(`Search elements not found: ${inputId}, ${resultsId}`);
        return;
    }
    input.addEventListener('input', () => {
        const query = input.value.toLowerCase().trim();
        resultsDiv.innerHTML = '';
        resultsDiv.style.display = query.length >= 2 ? 'block' : 'none';
        if (query.length < 2) return;

        const filtered = items.filter(item =>
            item.Test_Name.toLowerCase().includes(query) ||
            item.Description.toLowerCase().includes(query)
        ).slice(0, 10);
        if (filtered.length === 0) {
            resultsDiv.innerHTML = '<div class="search-result">No results found</div>';
            return;
        }
        filtered.forEach(item => {
            const value = item.Test_Name.toLowerCase().replace(/\s/g, '-');
            const div = document.createElement('div');
            div.className = 'search-result';
            div.innerHTML = `<strong>${item.Test_Name}</strong> (₹${item.Healthify_Offer_Price})<button onclick="addSelection('${type}', '${value}')">Add</button>`;
            div.addEventListener('click', () => addSelection(type, value));
            resultsDiv.appendChild(div);
        });
    });
}

function handleQueryParams() {
    const params = new URLSearchParams(window.location.search);
    params.forEach((value, key) => {
        if (key === 'test' && testDetails[value]) selectedTests.add(value);
        if (key === 'profile' && profileDetails[value]) selectedProfiles.add(value);
    });
    if (selectedTests.size > 0) updateSelectedItems('test');
    if (selectedProfiles.size > 0) updateSelectedItems('profile');
}

document.getElementById('bookingForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const bookingMessage = document.getElementById('bookingMessage');
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        address: document.getElementById('address').value,
        pincode: document.getElementById('pincode').value,
        tests: Array.from(selectedTests).map(test => testDetails[test]?.name || test),
        profiles: Array.from(selectedProfiles).map(profile => profileDetails[profile]?.name || profile),
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        timestamp: new Date().toISOString()
    };

    if (!formData.name || !formData.phone.match(/^[0-9]{10}$/) || !formData.pincode.match(/^[0-9]{6}$/) || (formData.tests.length === 0 && formData.profiles.length === 0)) {
        bookingMessage.className = 'error';
        bookingMessage.textContent = '❌ Please fill all required fields and select at least one test or profile.';
        return;
    }

    bookingMessage.textContent = '📅 Submitting booking...';
    try {
        await addDoc(collection(db, 'bookings'), formData);
        await emailjs.send('service_p2z0x3r', 'template_1s0x3ra', {
            name: formData.name,
            phone: formData.phone,
            email: 'report@healthifylab.com',
            tests: formData.tests.join(', ') || 'None',
            profiles: formData.profiles.join(', ') || 'None',
            date: formData.date,
            time: formData.time,
            address: formData.address,
            pincode: formData.pincode
        });
        bookingMessage.className = 'success';
        bookingMessage.textContent = '✅ Booking confirmed! You’ll receive a confirmation soon.';
        document.getElementById('bookingForm').reset();
        selectedTests.clear();
        selectedProfiles.clear();
        updateSelectedItems('test');
        updateSelectedItems('profile');
    } catch (error) {
        console.error('Error submitting booking:', error);
        bookingMessage.className = 'error';
        bookingMessage.textContent = `❌ Failed to book: ${error.message}. Try again or contact support.`;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    loadTests();
    loadProfiles();
    handleQueryParams();
});
