// scripts/ai-features.js
document.addEventListener('DOMContentLoaded', () => {
    // Simulated Gemini API call (replace with proxy when set up)
    async function callGeminiAPI(prompt, context = {}) {
        // Replace with actual API call when proxy is ready
        // Example with Vercel AI SDK proxy: 
        // const response = await fetch('https://your-vercel-proxy.vercel.app/api/gemini', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ prompt, context })
        // });
        // const data = await response.json();
        // return data.response;

        // Simulated response for now
        return new Promise(resolve => setTimeout(() => {
            if (prompt.includes('fever')) resolve('Suggested tests: CBC, RT-PCR. Consult a doctor.');
            else if (prompt.includes('cholesterol')) resolve('Consider Lipid Profile. Consult a doctor.');
            else resolve('No specific tests found. Consult a doctor.');
        }, 1500));
    }

    // Load test data from your site
    const tests = [
        { Test_Name: "CBC", Description: "Checks for fever, infections", Price: 480 },
        { Test_Name: "Lipid Profile", Description: "Assesses cholesterol levels", Price: 800 },
        { Test_Name: "Diabetes Care", Description: "Monitors blood sugar", Price: 1200 }
    ]; // Replace with fetch('/public/tests.json') when accessible

    // Symptom Checker
    document.getElementById('checkSymptoms').addEventListener('click', async () => {
        const symptoms = document.getElementById('symptomInput').value.trim();
        if (!symptoms) {
            document.getElementById('symptomResult').innerHTML = '<p class="error">❌ Please enter symptoms.</p>';
            return;
        }
        document.getElementById('symptomResult').innerHTML = '<p>🤖 Analyzing...</p>';
        const response = await callGeminiAPI(`Suggest tests for: ${symptoms}`, { tests });
        document.getElementById('symptomResult').innerHTML = `<p class="success">✅ ${response}</p>`;
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
        const response = await callGeminiAPI(`Predict health for ${age}-year-old ${gender} with history: ${history || 'none'}`, { tests });
        document.getElementById('healthPrediction').innerHTML = `<p class="success">✅ ${response}</p>`;
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
            const response = await callGeminiAPI(`Analyze health report: ${text}`, { tests });
            document.getElementById('resultAnalysis').innerHTML = `<p class="success">✅ ${response}</p>`;
        };
        reader.readAsText(file);
    });

    // App Recommendation with Location
    document.getElementById('refreshRecommendation').addEventListener('click', async () => {
        const location = document.getElementById('locationInput').value;
        document.getElementById('aiAppRecommendation').innerHTML = '<p>🤖 Fetching...</p>';
        const response = await callGeminiAPI(`Recommend tests for ${location || 'general'} location`, { tests });
        document.getElementById('aiAppRecommendation').innerHTML = `<p class="success">✅ ${response}</p>`;
    });

    // Chat Support with Voice
    document.getElementById('sendChat').addEventListener('click', async () => {
        const question = document.getElementById('chatInput').value.trim();
        if (!question) {
            document.getElementById('chatResponse').innerHTML = '<p class="error">❌ Please enter a question.</p>';
            return;
        }
        document.getElementById('chatResponse').innerHTML = '<p>🤖 Thinking...</p>';
        const response = await callGeminiAPI(question, { tests });
        document.getElementById('chatResponse').innerHTML = `<p class="success">🤖 ${response}</p>`;
        document.getElementById('chatInput').value = '';
    });

    document.getElementById('voiceChat').addEventListener('click', () => {
        document.getElementById('chatResponse').innerHTML = '<p class="info">🎙️ Voice in beta. Use text for now.</p>';
        // Add Web Speech API later: window.SpeechRecognition
    });
});
