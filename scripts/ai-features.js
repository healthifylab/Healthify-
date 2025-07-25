// scripts/ai-features.js
document.addEventListener('DOMContentLoaded', () => {
    async function callGeminiAPI(prompt, context = {}) {
        // Fetch test and profile data from your site
        const [testsResponse, profilesResponse] = await Promise.all([
            fetch('/public/tests.json'),
            fetch('/public/profiles.json')
        ]);
        const tests = await testsResponse.json().catch(() => []);
        const profiles = await profilesResponse.json().catch(() => []);

        // Combine data for context
        const allTests = [...tests, ...profiles.map(p => ({ Test_Name: p.Profile_Name, ...p }))];

        // Simulated response with expanded logic
        return new Promise(resolve => setTimeout(() => {
            if (!prompt) resolve('❌ Please provide details.');
            
            // Symptom to Test/Profile Mapping
            const symptomMap = {
                'fever': ['CBC', 'Fever Profile'],
                'cough': ['CBC', 'RT-PCR', 'Chest X-Ray'],
                'fatigue': ['Iron Profile', 'Vitamin D', 'Thyroid Profile'],
                'chest pain': ['ECG', 'Lipid Profile', 'Cardiac Risk Markers'],
                'shortness of breath': ['PFT', 'Chest X-Ray', 'D-Dimer'],
                'high blood pressure': ['Lipid Profile', 'Kidney Function Test', 'Electrolytes'],
                'diabetes': ['HbA1c', 'Diabetes Care', 'Glucose Fasting'],
                'weight loss': ['Thyroid Profile', 'Liver Function Test', 'CBC'],
                'joint pain': ['Rheumatoid Factor', 'CRP', 'Arthritis Profile'],
                'headache': ['Vitamin B12', 'MRI Brain', 'Electrolytes']
            };

            // Questions and Answers
            const questionMap = {
                'test prices': 'Prices vary: e.g., CBC ₹480, Lipid Profile ₹800, Diabetes Care ₹1200. Visit /booking.html.',
                'what is high cholesterol': 'High cholesterol increases heart disease risk. Consider Lipid Profile and consult a doctor.',
                'how long for results': 'Results typically take 24-48 hours. Check via app or email report@healthifylab.com.',
                'home collection': 'Yes, we offer home collection in Mumbai, Navi Mumbai, Thane. Book at /booking.html.',
                'report status': 'Check status via app or email report@healthifylab.com with your booking ID.'
            };

            // Process input
            const lowerPrompt = prompt.toLowerCase();
            const matchedSymptoms = Object.keys(symptomMap).filter(s => lowerPrompt.includes(s));
            const matchedQuestion = Object.keys(questionMap).find(q => lowerPrompt.includes(q));

            if (matchedQuestion) {
                resolve(`✅ ${questionMap[matchedQuestion]}`);
            } else if (matchedSymptoms.length > 0) {
                const recommendedTests = matchedSymptoms.flatMap(s => symptomMap[s])
                    .filter(test => allTests.some(t => t.Test_Name === test));
                resolve(recommendedTests.length
                    ? `✅ Suggested tests: ${recommendedTests.join(', ')}. Consult a doctor.`
                    : `ℹ️ No specific tests matched your input. Consult a doctor or try more details.`);
            } else {
                resolve(`ℹ️ No specific tests or answers matched your input. Consult a doctor or provide more details.`);
            }
        }, 1500));
    }

    // Symptom Checker
    document.getElementById('checkSymptoms').addEventListener('click', async () => {
        const symptoms = document.getElementById('symptomInput').value.trim();
        if (!symptoms) {
            document.getElementById('symptomResult').innerHTML = '<p class="error">❌ Please enter symptoms.</p>';
            return;
        }
        document.getElementById('symptomResult').innerHTML = '<p>🤖 Analyzing...</p>';
        const response = await callGeminiAPI(symptoms);
        document.getElementById('symptomResult').innerHTML = `<p>${response}</p>`;
    });

    // Health Prediction & Risk Assessment
    document.getElementById('predictHealth').addEventListener('click', async () => {
        const age = document.getElementById('age').value;
        const gender = document.getElementById('gender').value;
        const history = document.getElementById('medicalHistory').value;
        if (!age || !gender) {
            document.getElementById('healthPrediction').innerHTML = '<p class="error">❌ Please enter age and gender.</p>';
            return;
        }
        document.getElementById('healthPrediction').innerHTML = '<p>🤖 Assessing...</p>';
        const prompt = `Predict health for ${age}-year-old ${gender} with history: ${history || 'none'}`;
        const response = await callGeminiAPI(prompt);
        document.getElementById('healthPrediction').innerHTML = `<p>${response}</p>`;
    });

    // Result Upload & Analysis
    document.getElementById('analyzeResults').addEventListener('click', async () => {
        const fileInput = document.getElementById('resultUpload');
        if (fileInput.files.length === 0) {
            document.getElementById('resultAnalysis').innerHTML = '<p class="error">❌ Please upload a file.</p>';
            return;
        }
        document.getElementById('resultAnalysis').innerHTML = '<p>🤖 Analyzing...</p>';
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = async () => {
            const text = reader.result; // Simplified; use Tesseract.js for images later
            const response = await callGeminiAPI(`Analyze health report: ${text}`);
            document.getElementById('resultAnalysis').innerHTML = `<p>${response}</p>`;
        };
        reader.readAsText(file);
    });

    // App Recommendation with Location
    document.getElementById('refreshRecommendation').addEventListener('click', async () => {
        const location = document.getElementById('locationInput').value;
        document.getElementById('aiAppRecommendation').innerHTML = '<p>🤖 Fetching...</p>';
        const response = await callGeminiAPI(`Recommend tests for ${location || 'general'} location`);
        document.getElementById('aiAppRecommendation').innerHTML = `<p>${response}</p>`;
    });

    // Chat Support with Voice
    document.getElementById('sendChat').addEventListener('click', async () => {
        const question = document.getElementById('chatInput').value.trim();
        if (!question) {
            document.getElementById('chatResponse').innerHTML = '<p class="error">❌ Please enter a question.</p>';
            return;
        }
        document.getElementById('chatResponse').innerHTML = '<p>🤖 Thinking...</p>';
        const response = await callGeminiAPI(question);
        document.getElementById('chatResponse').innerHTML = `<p>${response}</p>`;
        document.getElementById('chatInput').value = '';
    });

    document.getElementById('voiceChat').addEventListener('click', () => {
        document.getElementById('chatResponse').innerHTML = '<p class="info">🎙️ Voice in beta. Use text for now.</p>';
    });
});
