// scripts/ai-features.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';

// Firebase Config (Replace with your actual config)
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

document.addEventListener('DOMContentLoaded', () => {
    // Load test and profile data (simulated fetch)
    const tests = [
        { Test_Name: "CBC", Description: "Checks for fever, infections", Price: 480 },
        { Test_Name: "Lipid Profile", Description: "Assesses cholesterol levels", Price: 800 },
        { Test_Name: "Diabetes Care", Description: "Monitors blood sugar", Price: 1200 }
    ];

    // Symptom Checker
    document.getElementById('checkSymptoms').addEventListener('click', () => {
        const symptoms = document.getElementById('symptomInput').value.trim().toLowerCase();
        if (!symptoms) {
            document.getElementById('symptomResult').innerHTML = '<p class="error">❌ Please enter symptoms.</p>';
            return;
        }
        document.getElementById('symptomResult').innerHTML = '<p>🤖 Analyzing...</p>';
        setTimeout(() => {
            const recommendations = [];
            if (symptoms.includes('fever') || symptoms.includes('cough')) recommendations.push('CBC', 'RT-PCR');
            if (symptoms.includes('fatigue') || symptoms.includes('weakness')) recommendations.push('Iron Profile', 'Vitamin D');
            if (symptoms.includes('chest pain')) recommendations.push('ECG', 'Lipid Profile');
            document.getElementById('symptomResult').innerHTML = recommendations.length
                ? `<p class="success">✅ Recommended tests: ${recommendations.join(', ')}. Book at /booking.html. Consult a doctor.</p>`
                : '<p class="info">ℹ️ No specific tests matched. Consult a doctor.</p>';
        }, 1500);
    });

    // Health Prediction & Risk Assessment
    document.getElementById('predictHealth').addEventListener('click', () => {
        const age = document.getElementById('age').value;
        const gender = document.getElementById('gender').value;
        const history = document.getElementById('medicalHistory').value.toLowerCase();
        if (!age || !gender) {
            document.getElementById('healthPrediction').innerHTML = '<p class="error">❌ Please enter age and select gender.</p>';
            return;
        }
        document.getElementById('healthPrediction').innerHTML = '<p>🤖 Assessing...</p>';
        setTimeout(() => {
            let prediction = `✅ For a ${age}-year-old ${gender}, your general health looks good.`;
            if (age > 50) prediction += ' Consider Healthify Senior Care for age-related risks.';
            if (history.includes('diabetes')) prediction += ' Monitor with Diabetes Care regularly.';
            if (history.includes('hypertension')) prediction += ' Check Heart Guard for heart health.';
            document.getElementById('healthPrediction').innerHTML = `<p>${prediction} Consult a doctor.</p>`;
        }, 1500);
    });

    // Result Upload & Analysis
    document.getElementById('analyzeResults').addEventListener('click', () => {
        const fileInput = document.getElementById('resultUpload');
        if (fileInput.files.length === 0) {
            document.getElementById('resultAnalysis').innerHTML = '<p class="error">❌ Please upload a file (PDF/JPG/PNG).</p>';
            return;
        }
        document.getElementById('resultAnalysis').innerHTML = '<p>🤖 Analyzing uploaded results...</p>';
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            // Simulate text extraction (in real scenario, use OCR like Tesseract.js)
            const text = reader.result.includes('cholesterol') ? 'High cholesterol detected' : 'Normal results';
            setTimeout(() => {
                document.getElementById('resultAnalysis').innerHTML = `<p class="success">✅ ${text}. Consider Lipid Profile if needed. Consult a doctor.</p>`;
                // Save to Firebase (optional)
                addDoc(collection(db, "ai_analyses"), {
                    fileName: file.name,
                    analysis: text,
                    timestamp: new Date().toISOString()
                }).catch(error => console.error("Firebase error:", error));
            }, 2000);
        };
        reader.readAsText(file); // Simplified; use OCR for images
    });

    // App Recommendation with Location
    document.getElementById('refreshRecommendation').addEventListener('click', () => {
        const location = document.getElementById('locationInput').value.toLowerCase();
        document.getElementById('aiAppRecommendation').innerHTML = '<p>🤖 Fetching recommendations...</p>';
        setTimeout(() => {
            let recommendations = ['Healthify Vital Check', 'Diabetes Care'];
            if (location.includes('mumbai') || location.includes('navi mumbai') || location.includes('thane')) {
                recommendations.push('Healthify Heart Guard', 'Thyroid Balance');
            }
            document.getElementById('aiAppRecommendation').innerHTML = `<p class="success">✅ Recommended tests for ${location || 'your area'}: ${recommendations.join(', ')}. Download app for more!</p>`;
        }, 1500);
    });

    // Chat Support with Voice (Basic Simulation)
    document.getElementById('sendChat').addEventListener('click', () => {
        const question = document.getElementById('chatInput').value.trim();
        if (!question) {
            document.getElementById('chatResponse').innerHTML = '<p class="error">❌ Please enter a question.</p>';
            return;
        }
        document.getElementById('chatResponse').innerHTML = '<p>🤖 Thinking...</p>';
        setTimeout(() => {
            let response = 'Sorry, I couldn’t understand. Please try again or contact support.';
            if (question.includes('price')) response = 'Prices vary: e.g., CBC ₹480, Lipid Profile ₹800. Visit /booking.html.';
            if (question.includes('report')) response = 'Check reports via app or email report@healthifylab.com.';
            if (question.includes('cholesterol')) response = 'High cholesterol may indicate heart risk. Consider Lipid Profile and consult a doctor.';
            document.getElementById('chatResponse').innerHTML = `<p class="success">🤖 ${response}</p>`;
            document.getElementById('chatInput').value = '';
        }, 1500);
    });

    document.getElementById('voiceChat').addEventListener('click', () => {
        document.getElementById('chatResponse').innerHTML = '<p class="info">🎙️ Voice feature in beta. Use text input for now.</p>';
        // In real implementation, integrate Web Speech API (e.g., SpeechRecognition)
    });
});
