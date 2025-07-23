// scripts/ai-features.js
document.addEventListener('DOMContentLoaded', () => {
    // Load test and profile data
    const tests = fetch('/public/tests.json').then(res => res.json());
    const profiles = fetch('/public/profiles.json').then(res => res.json());

    // AI Symptom Checker
    const symptomInput = document.getElementById('symptomInput');
    const checkSymptomsBtn = document.getElementById('checkSymptoms');
    const symptomResult = document.getElementById('symptomResult');

    checkSymptomsBtn?.addEventListener('click', () => {
        const symptoms = symptomInput.value.trim().toLowerCase();
        if (!symptoms) {
            symptomResult.innerHTML = '<p class="error">❌ Please enter your symptoms.</p>';
            return;
        }
        symptomResult.innerHTML = '<p>📋 Analyzing symptoms...</p>';
        setTimeout(() => {
            const possibleTests = [];
            if (symptoms.includes('fever') || symptoms.includes('cough')) {
                possibleTests.push('Complete Blood Count (CBC)', 'RT-PCR for COVID-19');
            }
            if (symptoms.includes('fatigue') || symptoms.includes('weakness')) {
                possibleTests.push('Healthify Anemia Shield', 'Vitamin D (25-OH)');
            }
            if (possibleTests.length) {
                symptomResult.innerHTML = `<p class="success">✅ Possible tests: ${possibleTests.join(', ')}. Consult a doctor for confirmation.</p>`;
            } else {
                symptomResult.innerHTML = '<p class="info">ℹ️ No specific tests matched. Please consult a doctor.</p>';
            }
        }, 1000); // Simulated AI processing delay
    });

    // AI Health Prediction
    const ageInput = document.getElementById('age');
    const genderInput = document.getElementById('gender');
    const predictHealthBtn = document.getElementById('predictHealth');
    const healthPrediction = document.getElementById('healthPrediction');

    predictHealthBtn?.addEventListener('click', () => {
        const age = parseInt(ageInput.value);
        const gender = genderInput.value;
        if (!age || age < 1 || age > 120) {
            healthPrediction.innerHTML = '<p class="error">❌ Please enter a valid age (1-120).</p>';
            return;
        }
        healthPrediction.innerHTML = '<p>📊 Calculating health risks...</p>';
        setTimeout(() => {
            let prediction = 'Your health looks good based on age and gender.';
            if (age > 50) {
                prediction = 'Consider a Healthify Senior Care or Healthify Cardiac Advance due to age-related risks.';
            } else if (age > 30 && gender === 'female') {
                prediction = 'Consider Healthify Women’s Wellness for hormonal health.';
            } else if (age > 30 && gender === 'male') {
                prediction = 'Consider Healthify Heart Guard for cardiovascular health.';
            }
            healthPrediction.innerHTML = `<p class="success">✅ ${prediction} Consult a doctor for a detailed checkup.</p>`;
        }, 1000); // Simulated AI processing delay
    });

    // AI App Recommendation
    const aiAppRecommendation = document.getElementById('aiAppRecommendation');
    const refreshRecommendationBtn = document.getElementById('refreshRecommendation');

    refreshRecommendationBtn?.addEventListener('click', () => {
        aiAppRecommendation.innerHTML = '<p>🔄 Generating recommendations...</p>';
        setTimeout(async () => {
            const testData = await tests;
            const profileData = await profiles;
            const recommended = [...testData, ...profileData]
                .filter(item => ['Healthify Vital Check', 'Healthify Diabetes Care', 'Healthify Thyroid Balance'].includes(item.Test_Name))
                .map(item => `${item.Test_Name} (Offer: ₹${item.Healthify_Offer_Price})`);
            aiAppRecommendation.innerHTML = `<p class="success">✅ Recommended tests for your area: ${recommended.join(', ')}. Download the app for more!</p>`;
        }, 1000); // Simulated AI processing delay
    });

    // AI Chat Support
    const chatInput = document.getElementById('chatInput');
    const sendChatBtn = document.getElementById('sendChat');
    const chatResponse = document.getElementById('chatResponse');

    sendChatBtn?.addEventListener('click', () => {
        const query = chatInput.value.trim().toLowerCase();
        if (!query) {
            chatResponse.innerHTML = '<p class="error">❌ Please enter a question.</p>';
            return;
        }
        chatResponse.innerHTML = '<p>🤖 Thinking...</p>';
        setTimeout(() => {
            let response = 'Sorry, I couldn’t understand your query. Please try again or contact support.';
            if (query.includes('test') || query.includes('package')) {
                response = 'You can book tests like Healthify Vital Check or Healthify Comprehensive Wellness. Visit /booking.html for details.';
            } else if (query.includes('report') || query.includes('result')) {
                response = 'Check your reports via the app or contact us at report@healthifylab.com.';
            } else if (query.includes('price')) {
                response = 'Prices vary by test. Download the app or visit /booking.html for offers.';
            }
            chatResponse.innerHTML = `<p class="success">🤖 ${response}</p>`;
            chatInput.value = '';
        }, 1000); // Simulated AI processing delay
    });
});
