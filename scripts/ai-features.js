yasync function callGeminiAPI(prompt, context = {}) {
    // Fetch test data from your site
    const testsResponse = await fetch('/public/tests.json');
    const tests = await testsResponse.json().catch(() => [{ Test_Name: "No data", Description: "Check tests.json" }]);

    // Simulated response based on prompt and tests
    return new Promise(resolve => setTimeout(() => {
        if (!prompt) resolve('❌ Please provide details.');
        if (prompt.includes('fever') && tests.some(t => t.Test_Name === "CBC")) resolve(`✅ Suggested tests: CBC. Consult a doctor.`);
        else if (prompt.includes('cholesterol') && tests.some(t => t.Test_Name === "Lipid Profile")) resolve(`✅ Suggested tests: Lipid Profile. Consult a doctor.`);
        else resolve(`ℹ️ No specific tests found. Consult a doctor.`);
    }, 1500));
}
