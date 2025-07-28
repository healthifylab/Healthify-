// Hardcoded test and profile data
const tests = [
    { Test_Name: "CBC", Healthify_Offer_Price: 300, Description: "Complete Blood Count", Reference_Range: "4.5-11.0" },
    { Test_Name: "HbA1c", Healthify_Offer_Price: 500, Description: "Glycated Hemoglobin", Reference_Range: "4.0-5.6" },
    { Test_Name: "Lipid Profile", Healthify_Offer_Price: 600, Description: "Cholesterol and triglycerides", Reference_Range: "120-200" },
    { Test_Name: "Thyroid Profile", Healthify_Offer_Price: 700, Description: "TSH, T3, T4", Reference_Range: "0.4-4.0" },
    { Test_Name: "Vitamin D", Healthify_Offer_Price: 800, Description: "Vitamin D levels", Reference_Range: "20-50" },
    { Test_Name: "CRP", Healthify_Offer_Price: 400, Description: "C-Reactive Protein", Reference_Range: "0-10" },
    { Test_Name: "Cardiac Risk Markers", Healthify_Offer_Price: 1000, Description: "Heart health markers", Reference_Range: "0-5" }
];

const profiles = [
    { Profile_Name: "Healthify Vital Check", Healthify_Offer_Price: 480, Tests: ["CBC"], Description: "Essential screening" },
    { Profile_Name: "Healthify Core Wellness", Healthify_Offer_Price: 959.2, Tests: ["CBC", "Lipid Profile"], Description: "Comprehensive screening" },
    { Profile_Name: "Healthify Diabetes Care", Healthify_Offer_Price: 800, Tests: ["HbA1c"], Description: "Diabetes management" },
    { Profile_Name: "Healthify Heart Guard", Healthify_Offer_Price: 1200, Tests: ["Lipid Profile", "Cardiac Risk Markers"], Description: "Cardiovascular health" },
    { Profile_Name: "Healthify Thyroid Balance", Healthify_Offer_Price: 640, Tests: ["Thyroid Profile"], Description: "Thyroid function" },
    { Profile_Name: "Healthify Comprehensive Wellness", Healthify_Offer_Price: 2000, Tests: ["CBC", "Lipid Profile", "Thyroid Profile"], Description: "Holistic assessment" },
    { Profile_Name: "Healthify Women’s Wellness", Healthify_Offer_Price: 1600, Tests: ["CBC", "Thyroid Profile"], Description: "Women’s health" },
    { Profile_Name: "Healthify Senior Care", Healthify_Offer_Price: 2400, Tests: ["CBC", "Lipid Profile"], Description: "Senior health" },
    { Profile_Name: "Healthify Anemia Shield", Healthify_Offer_Price: 1200, Tests: ["CBC"], Description: "Anemia screening" },
    { Profile_Name: "Healthify Arthritis Care", Healthify_Offer_Price: 1440, Tests: ["CRP"], Description: "Arthritis screening" },
    { Profile_Name: "Healthify PCOD Harmony", Healthify_Offer_Price: 2000, Tests: ["Thyroid Profile"], Description: "PCOD evaluation" },
    { Profile_Name: "Healthify Vitamin Boost", Healthify_Offer_Price: 1600, Tests: ["Vitamin D"], Description: "Vitamin levels" },
    { Profile_Name: "Healthify Basic Wellness", Healthify_Offer_Price: 799.2, Tests: ["CBC"], Description: "Basic health check" },
    { Profile_Name: "Healthify Active Lifestyle", Healthify_Offer_Price: 1440, Tests: ["CBC", "Vitamin D"], Description: "Fitness health check" },
    { Profile_Name: "Healthify Prenatal Care", Healthify_Offer_Price: 8000, Tests: ["CBC", "Thyroid Profile"], Description: "Pregnancy health" },
    { Profile_Name: "Healthify Cardiac Advance", Healthify_Offer_Price: 2800, Tests: ["Cardiac Risk Markers"], Description: "Advanced heart check" },
    { Profile_Name: "Healthify Liver Health", Healthify_Offer_Price: 1600, Tests: ["CBC"], Description: "Liver health check" },
    { Profile_Name: "Healthify Kidney Care", Healthify_Offer_Price: 1200, Tests: ["CBC"], Description: "Kidney health check" },
    { Profile_Name: "Healthify Allergy Screen", Healthify_Offer_Price: 1200, Tests: ["CBC"], Description: "Allergy test" },
    { Profile_Name: "Healthify Cancer Screen", Healthify_Offer_Price: 3200, Tests: ["CBC"], Description: "Cancer screening" },
    { Profile_Name: "Healthify Metabolic Balance", Healthify_Offer_Price: 1600, Tests: ["CBC"], Description: "Metabolic health" },
    { Profile_Name: "Healthify Bone Health", Healthify_Offer_Price: 1440, Tests: ["Vitamin D"], Description: "Bone health check" },
    { Profile_Name: "Healthify Fertility Check", Healthify_Offer_Price: 2400, Tests: ["Thyroid Profile"], Description: "Fertility evaluation" },
    { Profile_Name: "Healthify Executive Wellness", Healthify_Offer_Price: 4000, Tests: ["CBC", "Lipid Profile", "Thyroid Profile"], Description: "Premium health check" }
];

const symptomWeights = {
    'fever': { tests: ['CBC', 'CRP'], weight: 0.8 },
    'fatigue': { tests: ['Vitamin D', 'Thyroid Profile'], weight: 0.7 },
    'high blood sugar': { tests: ['HbA1c', 'Healthify Diabetes Care'], weight: 0.9 },
    'chest pain': { tests: ['Cardiac Risk Markers', 'Healthify Heart Guard'], weight: 0.9 },
    'weight loss': { tests: ['Thyroid Profile', 'Healthify Thyroid Balance'], weight: 0.6 }
};

document.addEventListener('DOMContentLoaded', () => {
    // Symptom Checker
    document.getElementById('checkSymptoms')?.addEventListener('click', () => {
        const symptoms = document.getElementById('symptomInput')?.value.trim().toLowerCase();
        const result = document.getElementById('symptomResult');
        if (!symptoms || !result) {
            result.innerHTML = '<p class="error">❌ Please enter symptoms.</p>';
            return;
        }
        result.innerHTML = '<p>🤖 Analyzing symptoms...</p>';
        const allTests = [...tests, ...profiles.map(p => ({ Test_Name: p.Profile_Name, ...p }))];
        const keywords = symptoms.split(/[,;\s]+/);
        const scores = {};
        allTests.forEach(test => scores[test.Test_Name] = 0);
        keywords.forEach(keyword => {
            Object.entries(symptomWeights).forEach(([symptom, { tests, weight }]) => {
                if (keyword.includes(symptom)) {
                    tests.forEach(test => {
                        if (scores[test]) scores[test] += weight;
                    });
                }
            });
        });
        const recommended = Object.entries(scores)
            .filter(([_, score]) => score > 0)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([testName]) => testName);
        
        setTimeout(() => {
            result.innerHTML = recommended.length
                ? `<p class="success">✅ Suggested tests: ${recommended.join(', ')}. <a href="/booking.html?tests=${recommended.join(',')}">Book now</a>.</p>`
                : `<p class="info">ℹ️ No matching tests found. Try specific symptoms or contact <a href="/contact.html">support</a>.</p>`;
        }, 1500);
    });

    // Health Prediction
    document.getElementById('predictHealth')?.addEventListener('click', () => {
        const age = parseInt(document.getElementById('age')?.value);
        const gender = document.getElementById('gender')?.value;
        const history = document.getElementById('medicalHistory')?.value.toLowerCase();
        const result = document.getElementById('healthPrediction');
        if (!age || !gender || !result) {
            result.innerHTML = '<p class="error">❌ Please enter age and gender.</p>';
            return;
        }
        result.innerHTML = '<p>🤖 Assessing risks...</p>';
        let recommendations = [];
        let advice = `For a ${age}-year-old ${gender}: `;
        
        if (age > 50) recommendations.push('Healthify Senior Care');
        if (gender === 'female' && age > 40) recommendations.push('Healthify Women’s Wellness');
        if (history.includes('diabetes')) recommendations.push('Healthify Diabetes Care', 'HbA1c');
        if (history.includes('heart') || history.includes('chest pain')) recommendations.push('Healthify Heart Guard', 'Cardiac Risk Markers');
        if (history.includes('thyroid')) recommendations.push('Healthify Thyroid Balance');
        
        setTimeout(() => {
            result.innerHTML = recommendations.length
                ? `<p class="success">✅ ${advice}Recommended tests: ${recommendations.join(', ')}. <a href="/booking.html?tests=${recommendations.join(',')}">Book now</a>.</p>`
                : `<p class="info">ℹ️ No specific risks identified. Consider a general checkup. <a href="/booking.html">Book now</a>.</p>`;
        }, 1500);
    });

    // Result Analysis
    document.getElementById('analyzeResults')?.addEventListener('click', () => {
        const fileInput = document.getElementById('resultUpload');
        const result = document.getElementById('resultAnalysis');
        if (!fileInput?.files.length || !result) {
            result.innerHTML = '<p class="error">❌ Please upload a file.</p>';
            return;
        }
        result.innerHTML = '<p>🤖 Analyzing results...</p>';
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const text = reader.result.toLowerCase();
            let analysis = [];
            tests.forEach(test => {
                if (text.includes(test.Test_Name.toLowerCase()) && test.Reference_Range) {
                    const valueMatch = text.match(new RegExp(`${test.Test_Name}\\s*[:=]\\s*([\\d.]+)`, 'i'));
                    if (valueMatch) {
                        const value = parseFloat(valueMatch[1]);
                        const [min, max] = test.Reference_Range.split('-').map(Number);
                        if (value < min || value > max) {
                            analysis.push(`${test.Test_Name}: ${value} is outside normal range (${test.Reference_Range}). Consult a doctor.`);
                        }
                    }
                }
            });
            setTimeout(() => {
                result.innerHTML = analysis.length
                    ? `<p class="success">✅ Analysis: ${analysis.join('<br>')} <a href="/booking.html">Book follow-up</a>.</p>`
                    : `<p class="info">ℹ️ No issues detected in uploaded results. <a href="/contact.html">Contact support</a> for detailed analysis.</p>`;
            }, 1500);
        };
        reader.readAsText(file);
    });

    // App Recommendation
    document.getElementById('refreshRecommendation')?.addEventListener('click', () => {
        const location = document.getElementById('locationInput')?.value.toLowerCase();
        const result = document.getElementById('aiAppRecommendation');
        if (!result) return;
        result.innerHTML = '<p>🤖 Fetching recommendations...</p>';
        let recommendations = profiles.slice(0, 3).map(p => p.Profile_Name);
        if (location.includes('mumbai') || location.includes('thane') || location.includes('pune')) {
            recommendations = profiles.filter(p => ['Healthify Diabetes Care', 'Healthify Heart Guard', 'Healthify Thyroid Balance'].includes(p.Profile_Name)).map(p => p.Profile_Name);
        }
        setTimeout(() => {
            result.innerHTML = recommendations.length
                ? `<p class="success">✅ Recommended for ${location || 'your area'}: ${recommendations.join(', ')}. Download app at <a href="/app.html">app page</a>.</p>`
                : `<p class="info">ℹ️ No specific recommendations. Try a city or contact <a href="/contact.html">support</a>.</p>`;
        }, 1500);
    });

    // Chat Support
    document.getElementById('sendChat')?.addEventListener('click', () => {
        const question = document.getElementById('chatInput')?.value.trim().toLowerCase();
        const result = document.getElementById('chatResponse');
        if (!question || !result) {
            result.innerHTML = '<p class="error">❌ Please enter a question.</p>';
            return;
        }
        result.innerHTML = '<p>🤖 Processing...</p>';
        let response = 'ℹ️ No specific answer found. Contact <a href="mailto:report@healthifylab.com">support</a>.';
        if (question.includes('test prices')) {
            response = `Prices: ${profiles.slice(0, 3).map(p => `${p.Profile_Name} ₹${p.Healthify_Offer_Price}`).join(', ')}. <a href="/booking.html">Book now</a>.`;
        } else if (question.includes('cholesterol')) {
            response = 'High cholesterol can clog arteries. Test with Healthify Heart Guard. <a href="/booking.html?profile=healthify-heart-guard">Book now</a>.';
        } else if (question.includes('diabetes')) {
            response = 'Diabetes involves high blood sugar. Test with Healthify Diabetes Care. <a href="/booking.html?profile=healthify-diabetes-care">Book now</a>.';
        }
        setTimeout(() => {
            result.innerHTML = `<p class="success">✅ ${response}</p>`;
            document.getElementById('chatInput').value = '';
        }, 1500);
    });

    // Voice Chat Simulation
    document.getElementById('voiceChat')?.addEventListener('click', () => {
        const result = document.getElementById('chatResponse');
        result.innerHTML = '<p>🎙️ Simulating voice input... Please type your question for now.</p>';
        setTimeout(() => {
            result.innerHTML = '<p class="info">ℹ️ Voice feature is under development. Use text input or try our live chat for immediate assistance.</p>';
        }, 1500);
    });
});
