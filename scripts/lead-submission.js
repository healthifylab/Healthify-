// scripts/lead-submission.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDS-MJYzAB2EDNY7Hhy2RtdEkxflj2jI-A",
    authDomain: "healthify-lab.firebaseapp.com",
    projectId: "healthify-lab",
    storageBucket: "healthify-lab.firebasestorage.app",
    messagingSenderId: "297003315332",
    appId: "1:297003315332:web:49f6ed6fc61cce4a74d2d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// EmailJS Initialization (using the public key from booking.html)
import emailjs from '@emailjs/browser';
emailjs.init('dJE_JHAoNTxxzTxiT');

document.getElementById("bookingForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    // Form field values
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const age = document.getElementById("age").value.trim();
    const gender = document.getElementById("gender").value.trim();
    const address = document.getElementById("address").value.trim();
    const pincode = document.getElementById("pincode").value.trim();
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const submissionStatus = document.getElementById("bookingMessage");

    // Validate form fields
    if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
        submissionStatus.className = "error";
        submissionStatus.textContent = "❌ Please enter a valid name (letters only).";
        return;
    }
    if (!phone.match(/^[0-9]{10}$/) || phone.length !== 10) {
        submissionStatus.className = "error";
        submissionStatus.textContent = "❌ Please enter a valid 10-digit phone number.";
        return;
    }
    if (!age || age < 1 || age > 120) {
        submissionStatus.className = "error";
        submissionStatus.textContent = "❌ Please enter a valid age (1-120).";
        return;
    }
    if (!gender || gender === "") {
        submissionStatus.className = "error";
        submissionStatus.textContent = "❌ Please select a gender.";
        return;
    }
    if (!address) {
        submissionStatus.className = "error";
        submissionStatus.textContent = "❌ Please enter your address.";
        return;
    }
    if (!pincode.match(/^[0-9]{6}$/)) {
        submissionStatus.className = "error";
        submissionStatus.textContent = "❌ Please enter a valid 6-digit pincode.";
        return;
    }
    if (!date || !time) {
        submissionStatus.className = "error";
        submissionStatus.textContent = "❌ Please select a date and time.";
        return;
    }

    // Access selected tests and profiles from the global Sets (defined in booking.html)
    const selectedTests = window.selectedTests || new Set();
    const selectedProfiles = window.selectedProfiles || new Set();
    const testDetails = window.testDetails || {};
    const profileDetails = window.profileDetails || {};

    // Prepare data for Firebase
    const leadData = {
        name,
        phone: `+91${phone}`, // Format phone with country code
        age: parseInt(age),
        gender,
        address,
        pincode,
        appointmentDate: date,
        appointmentTime: time,
        tests: Array.from(selectedTests).map(test => ({
            name: testDetails[test]?.name || test,
            offerPrice: testDetails[test]?.offerPrice || 0
        })),
        profiles: Array.from(selectedProfiles).map(profile => ({
            name: profileDetails[profile]?.name || profile,
            offerPrice: profileDetails[profile]?.offerPrice || 0
        })),
        totalOfferPrice: Array.from(selectedTests).reduce((sum, test) => sum + (testDetails[test]?.offerPrice || 0), 0) +
                        Array.from(selectedProfiles).reduce((sum, profile) => sum + (profileDetails[profile]?.offerPrice || 0), 0),
        timestamp: new Date().toISOString(),
        status: "New Enquiry"
    };

    submissionStatus.textContent = "📞 Submitting your request...";

    try {
        // Submit to Firebase
        const docRef = await addDoc(collection(db, "leads"), leadData);
        console.log("Document written with ID: ", docRef.id);

        // Send confirmation email via EmailJS
        const emailParams = {
            to_email: "report@healthifylab.com", // Replace with dynamic user email if available
            from_name: "Healthify Lab",
            user_name: name,
            appointment_date: date,
            appointment_time: time,
            tests: leadData.tests.map(t => t.name).join(", ") || "None",
            profiles: leadData.profiles.map(p => p.name).join(", ") || "None",
            total_amount: `₹${leadData.totalOfferPrice.toFixed(2)}`
        };

        await emailjs.send('service_6k0v6gn', 'template_7z4z7nq', emailParams);
        console.log("Email sent successfully");

        submissionStatus.className = "success";
        submissionStatus.textContent = "✅ Request submitted! We’ll call you soon. Confirmation email sent.";
        document.getElementById("bookingForm").reset();

        // Clear selected items
        selectedTests.clear();
        selectedProfiles.clear();
        updateSelectedItems('test', 'selectedTests');
        updateSelectedItems('profile', 'selectedProfiles');
        updateSummaryCard();

        setTimeout(() => window.close(), 2000); // Close window after 2 seconds
    } catch (error) {
        console.error("Error submitting lead:", error);
        submissionStatus.className = "error";
        submissionStatus.textContent = `❌ Failed to submit: ${error.message}. Try again or contact support.`;
    }
});

// Placeholder functions (to be called from booking.html's inline script)
window.removeSelection = (type, item) => {
    if (type === 'test') {
        window.selectedTests.delete(item);
        updateSelectedItems('test', 'selectedTests');
    } else if (type === 'profile') {
        window.selectedProfiles.delete(item);
        updateSelectedItems('profile', 'selectedProfiles');
    }
    updateSummaryCard();
};

window.addSelection = (type, item) => {
    if (type === 'test') {
        window.selectedTests.add(item);
        updateSelectedItems('test', 'selectedTests');
    } else if (type === 'profile') {
        window.selectedProfiles.add(item);
        updateSelectedItems('profile', 'selectedProfiles');
    }
    updateSummaryCard();
};

window.updateSelectedItems = (type, selectId) => {
    const selectedDiv = document.getElementById(selectId);
    const selectedSet = type === 'test' ? window.selectedTests : window.selectedProfiles;
    const details = type === 'test' ? window.testDetails : window.profileDetails;
    selectedDiv.innerHTML = '';
    selectedSet.forEach(item => {
        if (type === 'test') {
            const test = details[item];
            selectedDiv.innerHTML += `
                <span class="selected-tag">${test.name} (MRP: <s><span class="total-amount">₹${test.mrp || test.offerPrice * 1.5}</span></s>, Offer: <span class="discounted-amount">₹${test.offerPrice}</span>)
                    <button type="button" onclick="removeSelection('${type}', '${item}')">×</button>
                </span>
                <div class="item-details">
                    <p><strong>Description:</strong> ${test.description}</p>
                </div>
            `;
        } else if (type === 'profile') {
            const profile = details[item];
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
};

window.updateSummaryCard = () => {
    const summaryCard = document.getElementById('summaryCard');
    if (window.selectedTests.size === 0 && window.selectedProfiles.size === 0) {
        summaryCard.style.display = 'none';
        return;
    }

    const totalMRP = Array.from(window.selectedTests).reduce((sum, test) => sum + (window.testDetails[test].mrp || window.testDetails[test].offerPrice * 1.5), 0) +
                    Array.from(window.selectedProfiles).reduce((sum, profile) => sum + (window.profileDetails[profile].mrp || 0), 0);
    const totalOffer = Array.from(window.selectedTests).reduce((sum, test) => sum + (window.testDetails[test].offerPrice || 0), 0) +
                      Array.from(window.selectedProfiles).reduce((sum, profile) => sum + (window.profileDetails[profile].offerPrice || 0), 0);
    const savings = totalMRP - totalOffer;
    const savingsPercentage = totalMRP > 0 ? ((savings / totalMRP) * 100).toFixed(2) : 0;

    summaryCard.style.display = 'block';
    summaryCard.innerHTML = `
        <div class="summary-item"><strong>Total Amount:</strong> <span class="total-amount">₹${totalMRP.toFixed(2)}</span></div>
        <div class="summary-item"><strong>Discounted Amount:</strong> <span class="discounted-amount">₹${totalOffer.toFixed(2)}</span></div>
        <div class="summary-item"><strong>Saved with Healthify:</strong> <span class="saved-amount">₹${savings.toFixed(2)}</span> (<span class="discounted-amount">${savingsPercentage}% off</span>)</div>
    `;
};

// Initial load of tests and profiles
window.addEventListener('load', () => {
    loadTests();
    loadProfiles();
});
