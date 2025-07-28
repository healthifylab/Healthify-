import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import { getFirestore, doc, getDoc, setDoc } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';

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
const db = getFirestore(app);

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
            box.innerHTML = '<p class="error">❌ Failed to load data. Please try again or contact support.</p>';
        });
        return { tests: [], profiles: [] };
    }
}

const symptomWeights = {
    'fever': { tests: ['CBC', 'CRP'], weight: 0.8 },
    'fatigue': { tests: ['Vitamin D', 'Thyroid Profile'], weight: 0.7 },
    'high blood sugar': { tests: ['HbA1c', 'Diabetes Care'], weight: 0.9 },
    'chest pain': { tests: ['Cardiac Risk Markers', 'Lipid Profile'], weight: 0.9 },
    'weight loss': { tests: ['Thyroid Profile', 'Diabetes Care'], weight: 0.6 }
};

document.addEventListener('DOMContentLoaded', () => {
    onAuthStateChanged(auth, user => {
        if (!user) {
            document.querySelectorAll('.ai-section').forEach(section => {
                section.innerHTML = '<p class="error">❌ Please log in to use AI features. <a href="/reports.html">Log in</a></p>';
            });
        }
    });

    document.getElementById('checkSymptoms')?.addEventListener('click', async () => {
        const symptoms = document.getElementById('symptomInput')?.value.trim().toLowerCase();
        const result = document.getElementById('symptomResult');
        if (!symptoms || !result) {
            result.innerHTML = '<p class="error">❌ Please enter symptoms.</p>';
            return;
        }
        result.innerHTML = '<p>🤖 Analyzing symptoms...</p>';
        const { tests, profiles } = await getData();
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

    document.getElementById('predictHealth')?.addEventListener('click', async () => {
        const age = parseInt(document.getElementById('age')?.value);
        const gender = document.getElementById('gender')?.value;
        const history = document.getElementById('medicalHistory')?.value.toLowerCase();
        const result = document.getElementById('healthPrediction');
        if (!age || !gender || !result) {
            result.innerHTML = '<p class="error">❌ Please enter age and gender.</p>';
            return;
        }
        result.innerHTML = '<p>🤖 Assessing risks...</p>';
        const { tests, profiles } = await getData();
        const allTests = [...tests, ...profiles.map(p => ({ Test_Name: p.Profile_Name, ...p }))];
        let recommendations = [];
        let advice = `For a ${age}-year-old ${gender}: `;
        
        if (age > 50) recommendations.push('Senior Health Checkup');
        if (gender === 'female' && age > 40) recommendations.push('Women Wellness');
        if (history.includes('diabetes')) recommendations.push('Diabetes Care', 'HbA1c');
        if (history.includes('heart') || history.includes('chest pain')) recommendations.push('Cardiac Risk Markers', 'Lipid Profile');
        if (history.includes('thyroid')) recommendations.push('Thyroid Profile');
        
        if (auth.currentUser) {
            await setDoc(doc(db, 'userProfiles', auth.currentUser.uid), { age, gender, history, recommendations }, { merge: true });
        }
        
        setTimeout(() => {
            result.innerHTML = recommendations.length
                ? `<p class="success">✅ ${advice}Recommended tests: ${recommendations.join(', ')}. <a href="/booking.html?tests=${recommendations.join(',')}">Book now</a>.</p>`
                : `<p class="info">ℹ️ No specific risks identified. Consider a general checkup. <a href="/booking.html">Book now</a>.</p>`;
        }, 1500);
    });

    document.getElementById('analyzeResults')?.addEventListener('click', async () => {
        const fileInput = document.getElementById('resultUpload');
        const result = document.getElementById('resultAnalysis');
        if (!fileInput?.files.length || !result) {
            result.innerHTML = '<p class="error">❌ Please upload a file.</p>';
            return;
        }
        result.innerHTML = '<p>🤖 Analyzing results...</p>';
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = async () => {
            const text = reader.result.toLowerCase();
            const { tests } = await getData();
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

    document.getElementById('refreshRecommendation')?.addEventListener('click', async () => {
        const location = document.getElementById('locationInput')?.value.toLowerCase();
        const result = document.getElementById('aiAppRecommendation');
        if (!result) return;
        result.innerHTML = '<p>🤖 Fetching recommendations...</p>';
        const { profiles } = await getData();
        let recommendations = profiles.slice(0, 3).map(p => p.Profile_Name);
        if (location.includes('mumbai') || location.includes('thane') || location.includes('pune')) {
            recommendations = profiles.filter(p => ['Diabetes Care', 'Heart Guard', 'Thyroid Balance'].includes(p.Profile_Name)).map(p => p.Profile_Name);
        }
        setTimeout(() => {
            result.innerHTML = recommendations.length
                ? `<p class="success">✅ Recommended for ${location || 'your area'}: ${recommendations.join(', ')}. Download app at <a href="/app.html">app page</a>.</p>`
                : `<p class="info">ℹ️ No specific recommendations. Try a city or contact <a href="/contact.html">support</a>.</p>`;
        }, 1500);
    });

    document.getElementById('sendChat')?.addEventListener('click', async () => {
        const question = document.getElementById('chatInput')?.value.trim().toLowerCase();
        const result = document.getElementById('chatResponse');
        if (!question || !result) {
            result.innerHTML = '<p class="error">❌ Please enter a question.</p>';
            return;
        }
        result.innerHTML = '<p>🤖 Processing...</p>';
        const { tests, profiles } = await getData();
        const allTests = [...tests, ...profiles.map(p => ({ Test_Name: p.Profile_Name, ...p }))];
        let response = 'ℹ️ No specific answer found. Contact <a href="mailto:report@healthifylab.com">support</a>.';
        if (question.includes('test prices')) {
            response = `Prices: ${allTests.slice(0, 3).map(t => `${t.Test_Name} ₹${t.Healthify_Offer_Price}`).join(', ')}. <a href="/booking.html">Book now</a>.`;
        } else if (question.includes('cholesterol')) {
            response = 'High cholesterol can clog arteries. Test with Lipid Profile. <a href="/booking.html?tests=lipid-profile">Book now</a>.';
        } else if (question.includes('diabetes')) {
            response = 'Diabetes involves high blood sugar. Test with HbA1c or Diabetes Care. <a href="/booking.html?tests=diabetes-care">Book now</a>.';
        }
        setTimeout(() => {
            result.innerHTML = `<p class="success">✅ ${response}</p>`;
            document.getElementById('chatInput').value = '';
        }, 1500);
    });

    document.getElementById('voiceChat')?.addEventListener('click', () => {
        document.getElementById('chatResponse').innerHTML = '<p class="info">🎙️ Voice in beta. Use text or try our live chat.</p>';
    });
});
