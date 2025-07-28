// scripts/search.js
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

document.addEventListener('DOMContentLoaded', async () => {
    const input = document.getElementById('searchInput');
    const results = document.getElementById('searchResults');
    const bookNowBtn = document.getElementById('bookNowBtn');
    if (!input || !results || !bookNowBtn) return;

    const allTests = await fetchTests();
    const allProfiles = await fetchProfiles();

    input.addEventListener('input', () => {
        const query = input.value.toLowerCase();
        results.innerHTML = '';

        if (!query || query.length < 2) return;

        const filteredTests = allTests.filter(t =>
            t.Test_Name.toLowerCase().includes(query) ||
            t.Description.toLowerCase().includes(query)
        ).slice(0, 10);

        const filteredProfiles = allProfiles.filter(p =>
            p.Test_Name.toLowerCase().includes(query) ||
            p.Description.toLowerCase().includes(query)
        ).slice(0, 10);

        filteredTests.forEach(test => {
            const item = document.createElement('div');
            item.className = 'result-item';
            item.innerHTML = `
                <strong>🧪 ${test.Test_Name}</strong><br/>
                <span class="strike">₹${test.MRP}</span> <strong>₹${test.Healthify_Offer_Price}</strong><br/>
                <small>🧬 ${test.Tests_Included || 'N/A'} | 🕒 ${test.TAT}</small>
                <br/><em>${test.Description}</em>
                <br/><input type="checkbox" name="selectedTests" value="${test.Test_Name.replace(/ /g, '-').toLowerCase()}"> Select
            `;
            results.appendChild(item);
        });

        filteredProfiles.forEach(profile => {
            const item = document.createElement('div');
            item.className = 'result-item';
            item.innerHTML = `
                <strong>📁 ${profile.Test_Name}</strong><br/>
                <span class="strike">₹${profile.MRP}</span> <strong>₹${profile.Healthify_Offer_Price}</strong><br/>
                <small>🧬 ${profile.Tests_Included || 'N/A'} | 🕒 ${profile.TAT}</small>
                <br/><em>${profile.Description}</em>
                <br/><input type="checkbox" name="selectedProfiles" value="${profile.Test_Name.replace(/ /g, '-').toLowerCase()}"> Select
            `;
            results.appendChild(item);
        });
    });

    bookNowBtn.addEventListener('click', () => {
        const selectedTests = document.querySelectorAll('input[name="selectedTests"]:checked');
        const selectedProfiles = document.querySelectorAll('input[name="selectedProfiles"]:checked');
        const testValues = Array.from(selectedTests).map(cb => `test=${cb.value}`);
        const profileValues = Array.from(selectedProfiles).map(cb => `profile=${cb.value}`);
        const params = [...testValues, ...profileValues];
        if (params.length > 0) {
            window.location.href = `/booking.html?${params.join('&')}`;
        } else {
            alert('Please select at least one test or profile.');
        }
    });
});
