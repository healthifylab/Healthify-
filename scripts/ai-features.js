// scripts/ai-features.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';

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

async function getData() {
    try {
        const [testsResponse, profilesResponse] = await Promise.all([
            fetch('/public/tests.json'),
            fetch('/public/profiles.json')
        ]);
        if (!testsResponse.ok) throw new Error(`Tests fetch failed: ${testsResponse.status}`);
        if (!profilesResponse.ok) throw new Error(`Profiles fetch failed: ${profilesResponse.status}`);
        const tests = await testsResponse.json();
        const profiles = await profilesResponse.json();
        return { tests, profiles };
    } catch (error) {
        console.error('Data fetch error:', error);
        document.querySelectorAll('.result-box').forEach(box => {
            box.innerHTML = '<p class="error">❌ Failed to load data. Please try again.</p>';
        });
        return { tests: [], profiles: [] };
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Symptom Checker
    document.getElementById('checkSymptoms').addEventListener('click', async () => {
        const symptoms = document.getElementById('symptomInput').value.trim().toLowerCase();
        const result = document.getElementById('symptomResult');
        if (!symptoms) {
            result.innerHTML = '<p class="error">❌ Please enter symptoms.</p>';
            return;
        }
        result.innerHTML = '<p>🤖 Analyzing...</p>';
        const { tests, profiles } = await getData();
        const allTests = [...tests, ...profiles.map(p => ({ Test_Name: p.Profile_Name, ...p }))];
        const keywords = symptoms.split(/[,;\s]+/);
        const recommended = allTests.filter(item =>
            keywords.some(k => item.Test_Name.toLowerCase().includes(k) || item.Description.toLowerCase().includes(k))
        ).slice(0, 5);
        setTimeout(() => {
            result.innerHTML = recommended.length
                ? `<p class="success">✅ Suggested tests: ${recommended.map(r => r.Test_Name).join(', ')}. Book at <a href="/booking.html">booking page</a>.</p>`
                : `<p class="info">ℹ️ No tests matched. Try specific symptoms (e.g., fever, diabetes) or contact support.</p>`;
        }, 1500);
    });

    // Health Prediction & Risk Assessment
    document.getElementById('predictHealth').addEventListener('click', async () => {
        const age = parseInt(document.getElementById('age').value);
        const gender = document.getElementById('gender').value;
        const history = document.getElementById('medicalHistory').value.toLowerCase();
        const result = document.getElementById('healthPrediction');
        if (!age || !gender) {
            result.innerHTML = '<p class="error">❌ Please enter age and gender.</p>';
            return;
        }
        result.innerHTML = '<p>🤖 Assessing...</p>';
        const { tests, profiles } = await getData();
        const allTests = [...tests, ...profiles.map(p => ({ Test_Name: p.Profile_Name, ...p }))];
        let prediction = `For a ${age}-year-old ${gender}, consider regular checkups.`;
        if (history.includes('diabetes')) prediction += ' Recommended: Diabetes Care, HbA1c.';
        if (history.includes('heart') || history.includes('chest pain')) prediction += ' Recommended: Cardiac Risk Markers, Lipid Profile.';
        if (history.includes('thyroid')) prediction += ' Recommended: Thyroid Profile.';
        if (age > 50) prediction += ' Include Senior Health Checkup.';
        const recommended = allTests.filter(t => prediction.includes(t.Test_Name)).map(t => t.Test_Name);
        setTimeout(() => {
            result.innerHTML = `<p class="success">✅ ${prediction} Book at <a href="/booking.html">booking page</a>.</p>`;
        }, 1500);
    });

    // Result Upload & Analysis
    document.getElementById('analyzeResults').addEventListener('click', async () => {
        const fileInput = document.getElementById('resultUpload');
        const result = document.getElementById('resultAnalysis');
        if (fileInput.files.length === 0) {
            result.innerHTML = '<p class="error">❌ Please upload a file.</p>';
            return;
        }
        result.innerHTML = '<p>🤖 Analyzing...</p>';
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = async () => {
            const text = reader.result.toLowerCase();
            const { tests, profiles } = await getData();
            const allTests = [...tests, ...profiles.map(p => ({ Test_Name: p.Profile_Name, ...p }))];
            let response = 'ℹ️ No specific issues detected. Consult a doctor.';
            if (text.includes('cholesterol')) response = '✅ High cholesterol detected. Suggest Lipid Profile. Book at <a href="/booking.html">booking page</a>.';
            if (text.includes('glucose')) response = '✅ High glucose detected. Suggest Diabetes Care. Book at <a href="/booking.html">booking page</a>.';
            if (text.includes('thyroid')) response = '✅ Thyroid issue detected. Suggest Thyroid Profile. Book at <a href="/booking.html">booking page</a>.';
            setTimeout(() => {
                result.innerHTML = `<p class="success">${response}</p>`;
            }, 1500);
        };
        reader.readAsText(file);
    });

    // App Recommendation with Location
    document.getElementById('refreshRecommendation').addEventListener('click', async () => {
        const location = document.getElementById('locationInput').value.toLowerCase();
        const result = document.getElementById('aiAppRecommendation');
        result.innerHTML = '<p>🤖 Fetching...</p>';
        const { tests, profiles } = await getData();
        const allTests = [...tests, ...profiles.map(p => ({ Test_Name: p.Profile_Name, ...p }))];
        let recommendations = allTests.slice(0, 3).map(t => t.Test_Name);
        if (location.includes('mumbai') || location.includes('thane') || location.includes('pune')) {
            recommendations = allTests.filter(t => ['Diabetes Care', 'Heart Guard', 'Thyroid Balance'].includes(t.Test_Name)).map(t => t.Test_Name);
        }
        setTimeout(() => {
            result.innerHTML = recommendations.length
                ? `<p class="success">✅ Recommended tests for ${location || 'your area'}: ${recommendations.join(', ')}. Download app at <a href="/app.html">app page</a>.</p>`
                : `<p class="info">ℹ️ No specific recommendations. Try a city or contact support.</p>`;
        }, 1500);
    });

    // Chat Support
    document.getElementById('sendChat').addEventListener('click', async () => {
        const question = document.getElementById('chatInput').value.trim().toLowerCase();
        const result = document.getElementById('chatResponse');
        if (!question) {
            result.innerHTML = '<p class="error">❌ Please enter a question.</p>';
            return;
        }
        result.innerHTML = '<p>🤖 Thinking...</p>';
        const { tests, profiles } = await getData();
        const allTests = [...tests, ...profiles.map(p => ({ Test_Name: p.Profile_Name, ...p }))];
        let response = 'ℹ️ No specific answer found. Contact support at report@healthifylab.com.';
        if (question.includes('test prices')) {
            response = `Prices: ${allTests.slice(0, 3).map(t => `${t.Test_Name} ₹${t.Healthify_Offer_Price}`).join(', ')}. Book at <a href="/booking.html">booking page</a>.`;
        } else if (question.includes('cholesterol')) {
            response = 'High cholesterol can clog arteries. Test with Lipid Profile. Book at <a href="/booking.html">booking page</a>.';
        } else if (question.includes('diabetes')) {
            response = 'Diabetes involves high blood sugar. Test with HbA1c or Diabetes Care. Book at <a href="/booking.html">booking page</a>.';
        }
        setTimeout(() => {
            result.innerHTML = `<p class="success">✅ ${response}</p>`;
            document.getElementById('chatInput').value = '';
        }, 1500);
    });

    document.getElementById('voiceChat').addEventListener('click', () => {
        document.getElementById('chatResponse').innerHTML = '<p class="info">🎙️ Voice in beta. Use text for now or try our live chat.</p>';
    });
});
