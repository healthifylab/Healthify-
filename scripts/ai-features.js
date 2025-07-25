// scripts/ai-features.js
document.addEventListener('DOMContentLoaded', () => {
    async function getData() {
        try {
            const [testsResponse, profilesResponse] = await Promise.all([
                fetch('/public/tests.json'),
                fetch('/public/profiles.json')
            ]);
            const tests = await testsResponse.json();
            const profiles = await profilesResponse.json();
            console.log('Data loaded:', { tests, profiles });
            return { tests, profiles };
        } catch (error) {
            console.error('Data fetch error:', error);
            return { tests: [], profiles: [] };
        }
    }

    // Hardcoded maximum data
    const symptomMap = {
        'fever': ['CBC', 'Fever Profile', 'Malaria Test', 'Typhoid Test'],
        'cough': ['CBC', 'RT-PCR', 'Chest X-Ray', 'Sputum Culture'],
        'fatigue': ['Iron Profile', 'Vitamin D', 'Thyroid Profile', 'CBC'],
        'chest pain': ['ECG', 'Lipid Profile', 'Cardiac Risk Markers', 'Troponin I'],
        'shortness of breath': ['PFT', 'Chest X-Ray', 'D-Dimer', 'Oxygen Saturation'],
        'high blood pressure': ['Lipid Profile', 'Kidney Function Test', 'Electrolytes', 'Urine Routine'],
        'diabetes': ['HbA1c', 'Diabetes Care', 'Glucose Fasting', 'Glucose PP'],
        'weight loss': ['Thyroid Profile', 'Liver Function Test', 'CBC', 'Tumor Markers'],
        'joint pain': ['Rheumatoid Factor', 'CRP', 'Arthritis Profile', 'ANA Test'],
        'headache': ['Vitamin B12', 'MRI Brain', 'Electrolytes', 'CT Scan'],
        'nausea': ['Liver Function Test', 'Kidney Function Test', 'H pylori Test'],
        'skin rash': ['Allergy Test', 'IgE Test', 'Skin Prick Test'],
        'abdominal pain': ['Ultrasound Abdomen', 'Liver Function Test', 'Amylase'],
        'swelling': ['Kidney Function Test', 'CRP', 'Urine Routine'],
        'dizziness': ['Vitamin B12', 'Electrolytes', 'Blood Pressure Monitor']
    };

    const profileMap = {
        'Fever Profile': ['CBC', 'Malaria Test', 'Typhoid Test', 'Widal Test'],
        'Diabetes Care': ['HbA1c', 'Glucose Fasting', 'Glucose PP', 'Insulin'],
        'Cardiac Risk Markers': ['Lipid Profile', 'Homocysteine', 'hs-CRP', 'Apolipoprotein'],
        'Thyroid Profile': ['TSH', 'T3', 'T4', 'Anti-TPO'],
        'Arthritis Profile': ['Rheumatoid Factor', 'CRP', 'ANA Test', 'Anti-CCP'],
        'Kidney Function Test': ['Creatinine', 'BUN', 'Uric Acid', 'Electrolytes'],
        'Liver Function Test': ['SGOT', 'SGPT', 'ALP', 'Bilirubin'],
        'Iron Profile': ['Serum Iron', 'TIBC', 'Ferritin', 'Transferrin']
    };

    const questionMap = {
        'test prices': 'Prices: CBC ₹480, Lipid Profile ₹800, Diabetes Care ₹1200, Thyroid Profile ₹900, Kidney Function Test ₹700. Visit /booking.html.',
        'what is high cholesterol': 'High cholesterol can clog arteries, raising heart attack risk. Test with Lipid Profile and consult a doctor.',
        'how long for results': 'Results typically take 24-48 hours. Check via app or email report@healthifylab.com.',
        'home collection': 'Yes, available in Mumbai, Navi Mumbai, Thane. Book at /booking.html.',
        'report status': 'Check via app or email report@healthifylab.com with your booking ID.',
        'what is diabetes': 'Diabetes is high blood sugar. Test with HbA1c or Glucose Fasting and consult a doctor.',
        'thyroid symptoms': 'Symptoms include fatigue, weight gain. Test with Thyroid Profile and consult a doctor.',
        'kidney health': 'Check with Kidney Function Test if you have swelling or high BP. Consult a doctor.',
        'arthritis test': 'Use Arthritis Profile for joint pain. Consult a doctor.',
        'liver test': 'Liver Function Test checks liver health. Consult a doctor.'
    };

    const healthPredictionMap = {
        'diabetes': 'Consider Diabetes Care if over 40 or with family history.',
        'hypertension': 'Monitor with Lipid Profile and Kidney Function Test.',
        'thyroid': 'Test Thyroid Profile if fatigued or weight changes.',
        'heart': 'Get Cardiac Risk Markers if chest pain or high BP.'
    };

    // Symptom Checker
    document.getElementById('checkSymptoms').addEventListener('click', async () => {
        const symptoms = document.getElementById('symptomInput').value.trim().toLowerCase();
        if (!symptoms) {
            document.getElementById('symptomResult').innerHTML = '<p class="error">❌ Please enter symptoms.</p>';
            return;
        }
        document.getElementById('symptomResult').innerHTML = '<p>🤖 Analyzing...</p>';
        const { tests, profiles } = await getData();
        const allTests = [...tests, ...profiles.map(p => ({ Test_Name: p.Profile_Name, ...p }))];
        const matchedSymptoms = Object.keys(symptomMap).filter(s => symptoms.includes(s));
        const recommendedTests = matchedSymptoms.length
            ? matchedSymptoms.flatMap(s => symptomMap[s]).filter(test => allTests.some(t => t.Test_Name === test))
            : [];
        setTimeout(() => {
            document.getElementById('symptomResult').innerHTML = recommendedTests.length
                ? `<p class="success">✅ Suggested tests: ${recommendedTests.join(', ')}. Consult a doctor.</p>`
                : `<p class="info">ℹ️ No specific tests matched. Consult a doctor or try more details.</p>`;
        }, 1500);
    });

    // Health Prediction & Risk Assessment
    document.getElementById('predictHealth').addEventListener('click', async () => {
        const age = document.getElementById('age').value;
        const gender = document.getElementById('gender').value;
        const history = document.getElementById('medicalHistory').value.toLowerCase();
        if (!age || !gender) {
            document.getElementById('healthPrediction').innerHTML = '<p class="error">❌ Please enter age and gender.</p>';
            return;
        }
        document.getElementById('healthPrediction').innerHTML = '<p>🤖 Assessing...</p>';
        const { tests, profiles } = await getData();
        const allTests = [...tests, ...profiles.map(p => ({ Test_Name: p.Profile_Name, ...p }))];
        let prediction = `For a ${age}-year-old ${gender}, general health looks good.`;
        const matchedHistory = Object.keys(healthPredictionMap).find(h => history.includes(h));
        if (matchedHistory) {
            const recommendedTests = profileMap[healthPredictionMap[matchedHistory].split(' ')[1]] || [];
            prediction += ` ${healthPredictionMap[matchedHistory]} Tests: ${recommendedTests.filter(t => allTests.some(at => at.Test_Name === t)).join(', ')}.`;
        }
        if (age > 50) prediction += ' Consider Senior Health Checkup.';
        setTimeout(() => {
            document.getElementById('healthPrediction').innerHTML = `<p class="success">✅ ${prediction} Consult a doctor.</p>`;
        }, 1500);
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
            const text = reader.result.toLowerCase();
            const { tests, profiles } = await getData();
            const allTests = [...tests, ...profiles.map(p => ({ Test_Name: p.Profile_Name, ...p }))];
            let response = 'ℹ️ No specific issues detected. ';
            if (text.includes('cholesterol') && allTests.some(t => t.Test_Name === 'Lipid Profile')) response = '✅ High cholesterol detected. Suggest Lipid Profile. ';
            else if (text.includes('glucose') && allTests.some(t => t.Test_Name === 'Diabetes Care')) response = '✅ High glucose detected. Suggest Diabetes Care. ';
            else if (text.includes('thyroid') && allTests.some(t => t.Test_Name === 'Thyroid Profile')) response = '✅ Thyroid issue detected. Suggest Thyroid Profile. ';
            setTimeout(() => {
                document.getElementById('resultAnalysis').innerHTML = `<p>${response} Consult a doctor.</p>`;
            }, 1500);
        };
        reader.readAsText(file);
    });

    // App Recommendation with Location
    document.getElementById('refreshRecommendation').addEventListener('click', async () => {
        const location = document.getElementById('locationInput').value.toLowerCase();
        document.getElementById('aiAppRecommendation').innerHTML = '<p>🤖 Fetching...</p>';
        const { tests, profiles } = await getData();
        const allTests = [...tests, ...profiles.map(p => ({ Test_Name: p.Profile_Name, ...p }))];
        let recommendations = ['Vital Check', 'Diabetes Care'];
        if (location.includes('mumbai') || location.includes('navi mumbai') || location.includes('thane')) {
            recommendations = recommendations.concat(['Heart Guard', 'Thyroid Balance']);
        }
        const availableRecs = recommendations.filter(r => allTests.some(t => t.Test_Name === r));
        setTimeout(() => {
            document.getElementById('aiAppRecommendation').innerHTML = availableRecs.length
                ? `<p class="success">✅ Recommended tests for ${location || 'your area'}: ${availableRecs.join(', ')}. Download app!</p>`
                : `<p class="info">ℹ️ No specific recommendations. Try a city or consult a doctor.</p>`;
        }, 1500);
    });

    // Chat Support with Voice
    document.getElementById('sendChat').addEventListener('click', () => {
        const question = document.getElementById('chatInput').value.trim().toLowerCase();
        if (!question) {
            document.getElementById('chatResponse').innerHTML = '<p class="error">❌ Please enter a question.</p>';
            return;
        }
        document.getElementById('chatResponse').innerHTML = '<p>🤖 Thinking...</p>';
        const response = questionMap[question] || `ℹ️ No answer for "${question}". Try: test prices, cholesterol, etc. Consult a doctor.`;
        setTimeout(() => {
            document.getElementById('chatResponse').innerHTML = `<p class="success">✅ ${response}</p>`;
            document.getElementById('chatInput').value = '';
        }, 1500);
    });

    document.getElementById('voiceChat').addEventListener('click', () => {
        document.getElementById('chatResponse').innerHTML = '<p class="info">🎙️ Voice in beta. Use text for now.</p>';
    });
});
