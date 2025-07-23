// scripts/ai-features.js
document.addEventListener('DOMContentLoaded', () => {
    // Load test and profile data
    let tests = [];
    let profiles = [];
    Promise.all([
        fetch('/public/tests.json').then(res => res.json()),
        fetch('/public/profiles.json').then(res => res.json())
    ]).then(([testData, profileData]) => {
        tests = testData.map(test => ({
            name: test.Test_Name,
            offerPrice: test.Healthify_Offer_Price,
            mrp: test.MRP || test.Healthify_Offer_Price * 1.5,
            description: test.Description || 'No description available'
        }));
        profiles = profileData.map(profile => ({
            name: profile.Test_Name,
            offerPrice: profile.Healthify_Offer_Price,
            mrp: profile.MRP || 0,
            description: profile.Description || 'No description available',
            tests: profile.Tests || [] // Assuming profiles include a Tests array
        }));
    }).catch(error => console.error('Error loading data:', error));

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
                possibleTests.push(...tests.filter(t => ['Complete Blood Count (CBC)', 'RT-PCR for COVID-19'].includes(t.name)).map(t => `${t.name} (₹${t.offerPrice})`));
            }
            if (symptoms.includes('fatigue') || symptoms.includes('weakness')) {
                possibleTests.push(...tests.filter(t => ['Healthify Anemia Shield', 'Vitamin D (25-OH)'].includes(t.name)).map(t => `${t.name} (₹${t.offerPrice})`));
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
            let recommendedTests = [];
            if (age > 50) {
                prediction = 'Consider a senior health check due to age-related risks.';
                recommendedTests = tests.filter(t => ['Healthify Senior Care', 'Healthify Cardiac Advance'].includes(t.name)).map(t => `${t.name} (₹${t.offerPrice})`);
            } else if (age > 30 && gender === 'female') {
                prediction = 'Consider a women’s health check for hormonal health.';
                recommendedTests = tests.filter(t => ['Healthify Women’s Wellness'].includes(t.name)).map(t => `${t.name} (₹${t.offerPrice})`);
            } else if (age > 30 && gender === 'male') {
                prediction = 'Consider a cardiovascular health check.';
                recommendedTests = tests.filter(t => ['Healthify Heart Guard'].includes(t.name)).map(t => `${t.name} (₹${t.offerPrice})`);
            }
            healthPrediction.innerHTML = `<p class="success">✅ ${prediction} ${recommendedTests.length ? `Recommended: ${recommendedTests.join(', ')}.` : ''} Consult a doctor for a detailed checkup.</p>`;
        }, 1000); // Simulated AI processing delay
    });

    // AI App Recommendation
    const aiAppRecommendation = document.getElementById('aiAppRecommendation');
    const refreshRecommendationBtn = document.getElementById('refreshRecommendation');

    refreshRecommendationBtn?.addEventListener('click', () => {
        aiAppRecommendation.innerHTML = '<p>🔄 Generating recommendations...</p>';
        setTimeout(() => {
            const recommended = [...tests, ...profiles]
                .filter(item => ['Healthify Vital Check', 'Healthify Diabetes Care', 'Healthify Thyroid Balance'].includes(item.name))
                .map(item => `${item.name} (Offer: ₹${item.offerPrice})`);
            aiAppRecommendation.innerHTML = `<p class="success">✅ Recommended tests/profiles for your area: ${recommended.join(', ')}. Download the app for more!</p>`;
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
                const testOptions = tests.map(t => `${t.name} (₹${t.offerPrice})`).slice(0, 3);
                response = `You can book tests like ${testOptions.join(', ')}. Visit /booking.html for details.`;
            } else if (query.includes('report') || query.includes('result')) {
                response = 'Check your reports via the app or contact us at report@healthifylab.com.';
            } else if (query.includes('price')) {
                const priceExamples = tests.map(t => `${t.name}: ₹${t.offerPrice}`).slice(0, 3);
                response = `Prices vary by test. Examples: ${priceExamples.join(', ')}. Download the app or visit /booking.html for offers.`;
            }
            chatResponse.innerHTML = `<p class="success">🤖 ${response}</p>`;
            chatInput.value = '';
        }, 1000); // Simulated AI processing delay
    });
});
