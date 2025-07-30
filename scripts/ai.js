// scripts/ai.js
async function fetchTests() {
    try {
        const response = await fetch('/public/tests.json');
        if (!response.ok) throw new Error('Failed to fetch tests');
        return await response.json();
    } catch (error) {
        console.error('Error fetching tests:', error);
        return [];
    }
}

async function fetchProfiles() {
    try {
        const response = await fetch('/public/profiles.json');
        if (!response.ok) throw new Error('Failed to fetch profiles');
        return await response.json();
    } catch (error) {
        console.error('Error fetching profiles:', error);
        return [];
    }
}

async function getAIResponse(query) {
    const tests = await fetchTests();
    const profiles = await fetchProfiles();
    const lowerQuery = query.toLowerCase().trim();

    // Search for test/profile matches
    const testMatch = tests.find(t =>
        t.Test_Name.toLowerCase().includes(lowerQuery) ||
        t.Description.toLowerCase().includes(lowerQuery)
    );
    const profileMatch = profiles.find(p =>
        p.Test_Name.toLowerCase().includes(lowerQuery) ||
        p.Description.toLowerCase().includes(lowerQuery) ||
        p.Tests_Included.toLowerCase().includes(lowerQuery)
    );

    if (testMatch) {
        return `**${testMatch.Test_Name}**: ${testMatch.Description}  
Price: ~~₹${testMatch.MRP}~~ **₹${testMatch.Healthify_Offer_Price}**  
Turnaround Time: ${testMatch.TAT}  
[Book Now](/booking.html?test=${testMatch.Test_Name.toLowerCase().replace(/\s/g, '-')})`;
    } else if (profileMatch) {
        return `**${profileMatch.Test_Name}**: ${profileMatch.Description}  
Tests Included: ${profileMatch.Tests_Included}  
Price: ~~₹${profileMatch.MRP}~~ **₹${profileMatch.Healthify_Offer_Price}**  
Turnaround Time: ${profileMatch.TAT}  
[Book Now](/booking.html?profile=${profileMatch.Test_Name.toLowerCase().replace(/\s/g, '-')})`;
    }

    // General health query responses (simulated Grok 3)
    if (lowerQuery.includes('cbc') || lowerQuery.includes('complete blood count')) {
        return 'A Complete Blood Count (CBC) test evaluates overall blood health, including red and white blood cells, hemoglobin, and platelets. It helps detect anemia, infections, or blood disorders. Would you like to book a CBC test? [Book Now](/booking.html?test=complete-blood-count)';
    } else if (lowerQuery.includes('diabetes')) {
        return 'Diabetes screening involves tests like HbA1c and Blood Sugar Fasting to monitor blood glucose levels. Healthify offers the "Healthify Diabetes Care" profile for comprehensive diabetes management. [Book Now](/booking.html?profile=healthify-diabetes-care)';
    } else if (lowerQuery.includes('thyroid')) {
        return 'Thyroid Function Tests (TFT) measure T3, T4, and TSH levels to diagnose hypothyroidism or hyperthyroidism. Check out the "Healthify Thyroid Balance" profile. [Book Now](/booking.html?profile=healthify-thyroid-balance)';
    } else {
        return 'I couldn’t find specific information for your query. Try asking about a specific test or profile (e.g., "CBC test" or "Healthify Vital Check"), or contact our support team at +91 9503832889.';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const aiQuery = document.getElementById('aiQuery');
    const aiResponse = document.getElementById('aiResponse');
    const submitBtn = document.querySelector('.ai-section .btn');

    if (!aiQuery || !aiResponse || !submitBtn) {
        console.error('AI elements not found');
        return;
    }

    submitBtn.addEventListener('click', async () => {
        const query = aiQuery.value.trim();
        if (!query) {
            aiResponse.className = 'error';
            aiResponse.textContent = '❌ Please enter a question.';
            return;
        }

        aiResponse.className = 'info';
        aiResponse.textContent = 'Processing...';
        try {
            const response = await getAIResponse(query);
            aiResponse.className = 'success';
            aiResponse.innerHTML = response; // Supports HTML links
        } catch (error) {
            console.error('AI Error:', error);
            aiResponse.className = 'error';
            aiResponse.textContent = '❌ Error fetching response. Please try again or contact support.';
        }
    });
});
