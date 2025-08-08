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

    const totalMRP = Array.from(selectedTests).reduce((sum, test) => sum + (testDetails[test].mrp || testDetails[test].offerPrice * 1.5), 0) +
                     Array.from(selectedProfiles).reduce((sum, profile) => sum + (profileDetails[profile].mrp || 0), 0);
    const totalOffer = Array.from(selectedTests).reduce((sum, test) => sum + (testDetails[test].offerPrice || 0), 0) +
                       Array.from(selectedProfiles).reduce((sum, profile) => sum + (profileDetails[profile].offerPrice || 0), 0);
    const savings = totalMRP - totalOffer;
    const savingsPercentage = totalMRP > 0 ? ((savings / totalMRP) * 100).toFixed(2) : 0;

    summaryCard.style.display = 'block';
    summaryCard.innerHTML = `
        <div class="summary-item"><strong>Total Amount:</strong> <span class="total-amount">₹${totalMRP.toFixed(2)}</span></div>
        <div class="summary-item"><strong>Discounted Amount:</strong> <span class="discounted-amount">₹${totalOffer.toFixed(2)}</span></div>
        <div class="summary-item"><strong>Saved with Healthify:</strong> <span class="saved-amount">₹${savings.toFixed(2)}</span> (<span class="discounted-amount">${savingsPercentage}% off</span>)</div>
    `;
}

function updateSelectedItems(type, selectId) {
    const selectedDiv = type === 'test' ? document.getElementById('selectedTests') : document.getElementById('selectedProfiles');
    const selectedSet = type === 'test' ? selectedTests : selectedProfiles;
    selectedDiv.innerHTML = '';
    selectedSet.forEach(item => {
        if (type === 'test') {
            const test = testDetails[item];
            selectedDiv.innerHTML += `
                <span class="selected-tag">${test.name} (MRP: <s><span class="total-amount">₹${test.mrp || test.offerPrice * 1.5}</span></s>, Offer: <span class="discounted-amount">₹${test.offerPrice}</span>)
                    <button type="button" onclick="removeSelection('${type}', '${item}')">×</button>
                </span>
                <div class="item-details">
                    <p><strong>Description:</strong> ${test.description}</p>
                </div>
            `;
        } else if (type === 'profile') {
            const profile = profileDetails[item];
            selectedDiv.innerHTML += `
                <span class="selected-tag">${profile.name} (MRP: <s><span class="total-amount">₹${profile.mrp}</span></s>, Offer: <span class="discounted-amount">₹${profile.offerPrice}</span>)
                    <button type="button" onclick="removeSelection('${type}', '${item}')">×</button>
                </span>
                <div class="profile-details">
                    <p><strong>Description:</strong> ${profile.description}</p>
                    <ul class="included-tests">
                        <strong>Tests Included:</strong>
                        ${profile.tests.map(test => `<li>${test}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
    });
    updateSummaryCard();
}

async function loadTests() {
    try {
        console.log('Fetching tests.json...');
        const response = await fetch('/public/tests.json');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const tests = await response.json();
        const resultsDiv = document.getElementById('testResults');
        resultsDiv.style.display = 'block';
        tests.forEach(test => {
            const value = test.Test_Name.toLowerCase().replace(/\s/g, '-');
            const item = document.createElement('div');
            item.className = 'search-result';
            item.innerHTML = `
                <strong>${test.Test_Name}</strong> (₹${test.Healthify_Offer_Price})
                <button onclick="addSelection('test', '${value}')">Add</button>
            `;
            item.addEventListener('click', () => addSelection('test', value));
            resultsDiv.appendChild(item);
            testDetails[value] = {
                name: test.Test_Name,
                mrp: test.MRP || test.Healthify_Offer_Price * 1.5,
                offerPrice: test.Healthify_Offer_Price,
                description: test.Description || 'No description available'
            };
        });
        setupSearch('test', 'testSearch', 'testResults');
    } catch (error) {
        console.error('Error loading tests:', error);
        document.getElementById('testResults').innerHTML = '<div>Error loading tests. Check console.</div>';
    }
}

async function loadProfiles() {
    try {
        console.log('Fetching profiles.json...');
        const response = await fetch('/public/profiles.json');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const profiles = await response.json();
        const resultsDiv = document.getElementById('profileResults');
        resultsDiv.style.display = 'block';
        profiles.forEach(profile => {
            const value = profile.Test_Name.toLowerCase().replace(/\s/g, '-');
            const item = document.createElement('div');
            item.className = 'search-result';
            item.innerHTML = `
                <strong>${profile.Test_Name}</strong> (₹${profile.Healthify_Offer_Price})
                <button onclick="addSelection('profile', '${value}')">Add</button>
            `;
            item.addEventListener('click', () => addSelection('profile', value));
            resultsDiv.appendChild(item);
            profileDetails[value] = {
                name: profile.Test_Name,
                mrp: profile.MRP || profile.Healthify_Offer_Price * 1.5,
                offerPrice: profile.Healthify_Offer_Price,
                description: profile.Description || 'No description available',
                tests: profile.Tests_Included.split(', ')
            };
        });
        setupSearch('profile', 'profileSearch', 'profileResults');

        const urlParams = new URLSearchParams(window.location.search);
        const profile = urlParams.get('profile');
        if (profile && profileDetails[profile]) {
            selectedProfiles.add(profile);
            updateSelectedItems('profile', 'selectedProfiles');
            document.getElementById('profileDetails').innerHTML = `
                <p><strong>Description:</strong> ${profileDetails[profile].description}</p>
                <ul class="included-tests">
                    <strong>Tests Included:</strong>
                    ${profileDetails[profile].tests.map(test => `<li>${test}</li>`).join('')}
                </ul>
            `;
        }
    } catch (error) {
        console.error('Error loading profiles:', error);
        document.getElementById('profileResults').innerHTML = '<div>Error loading profiles. Check console.</div>';
    }
}

function addSelection(type, value) {
    const selectedSet = type === 'test' ? selectedTests : selectedProfiles;
    selectedSet.add(value);
    updateSelectedItems(type, type === 'test' ? 'selectedTests' : 'selectedProfiles');
}

function removeSelection(type, value) {
    const selectedSet = type === 'test' ? selectedTests : selectedProfiles;
    selectedSet.delete(value);
    updateSelectedItems(type, type === 'test' ? 'selectedTests' : 'selectedProfiles');
}

function setupSearch(type, inputId, resultsId) {
    const input = document.getElementById(inputId);
    const results = document.getElementById(resultsId);
    input.addEventListener('input', () => {
        const query = input.value.toLowerCase();
        results.style.display = query ? 'block' : 'none';
        Array.from(results.children).forEach(item => {
            item.style.display = item.textContent.toLowerCase().includes(query) ? 'block' : 'none';
        });
    });
}

document.getElementById('bookingForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        address: document.getElementById('address').value,
        pincode: document.getElementById('pincode').value,
        location: document.getElementById('location').value,
        tests: Array.from(selectedTests).map(test => testDetails[test].name),
        profiles: Array.from(selectedProfiles).map(profile => profileDetails[profile].name),
        date: document.getElementById('date').value,
        time: document.getElementById('time').value
    };
    try {
        await addDoc(collection(db, 'bookings'), formData);
        emailjs.send('service_123', 'template_456', formData)
            .then(() => {
                document.getElementById('bookingMessage').innerHTML = '<p class="success">Booking submitted successfully!</p>';
            }, (error) => {
                document.getElementById('bookingMessage').innerHTML = `<p class="error">Error submitting booking: ${error.text}</p>`;
            });
    } catch (error) {
        document.getElementById('bookingMessage').innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
});

async function loadProfileDetails() {
    try {
        const response = await fetch('/public/profiles.json');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const profiles = await response.json();
        profiles.forEach(profile => {
            const id = profile.Test_Name.toLowerCase().replace(/\s/g, '-');
            const detailsDiv = document.getElementById(id);
            if (detailsDiv) {
                detailsDiv.innerHTML = `
                    <p><strong>Description:</strong> ${profile.Description}</p>
                    <p><strong>Tests Included:</strong> ${profile.Tests_Included}</p>
                    <p><strong>Preparation:</strong> ${profile.Sample_Type.includes('Blood') ? '8-hour fasting' : 'No fasting required'}</p>
                    <p><strong>Turnaround:</strong> ${profile.TAT}</p>
                `;
            }
        });
    } catch (error) {
        console.error('Error loading profile details:', error);
    }
}

window.onload = () => {
    loadTests();
    loadProfiles();
    loadProfileDetails();
};

function toggleDetails(id) {
    const details = document.getElementById(id);
    details.style.display = details.style.display === 'none' ? 'block' : 'none';
}
