// scripts/search.js
async function fetchTestsAndProfiles() {
    try {
        const [testResponse, profileResponse] = await Promise.all([
            fetch('/public/tests.json'),
            fetch('/public/profiles.json')
        ]);
        if (!testResponse.ok) throw new Error('Failed to fetch tests');
        if (!profileResponse.ok) throw new Error('Failed to fetch profiles');
        const tests = await testResponse.json();
        const profiles = await profileResponse.json();
        return [
            ...tests.map(test => ({
                ...test,
                type: 'test',
                Tests_Included: test.Tests_Included || 'N/A'
            })),
            ...profiles.map(profile => ({
                ...profile,
                type: 'profile',
                Tests_Included: profile.Tests ? profile.Tests.join(', ') : 'N/A'
            }))
        ];
    } catch (error) {
        console.error('Error fetching tests or profiles:', error);
        return [];
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const input = document.getElementById("searchInput");
    const results = document.getElementById("searchResults");
    const bookNowBtn = document.getElementById("bookNowBtn");
    if (!input || !results || !bookNowBtn) return;

    const allItems = await fetchTestsAndProfiles();

    input.addEventListener("input", () => {
        const query = input.value.toLowerCase();
        results.innerHTML = "";

        if (!query || query.length < 2) return;

        const filtered = allItems.filter(item =>
            item.Test_Name.toLowerCase().includes(query) ||
            item.Description.toLowerCase().includes(query)
        ).slice(0, 10);

        filtered.forEach(item => {
            const itemTypeIcon = item.type === 'profile' ? '📁' : '🧪';
            const item = document.createElement("div");
            item.className = "result-item";
            item.innerHTML = `
                <strong>${itemTypeIcon} ${item.Test_Name}</strong><br/>
                <span class="strike">₹${item.MRP || item.Healthify_Offer_Price * 1.5}</span> <strong>₹${item.Healthify_Offer_Price}</strong><br/>
                <small>🧬 ${item.Tests_Included} | 🕒 ${item.TAT || '24-48 hrs'}</small>
                <br/><em>${item.Description}</em>
                <br/><input type="checkbox" name="selectedItems" value="${item.Test_Name.replace(/ /g, '-').toLowerCase()}"> Select
            `;
            results.appendChild(item);
        });
    });

    bookNowBtn.addEventListener("click", () => {
        const selected = document.querySelectorAll('input[name="selectedItems"]:checked');
        const selectedValues = Array.from(selected).map(cb => cb.value);
        if (selectedValues.length > 0) {
            window.location.href = "/booking.html?" + selectedValues.map(v => "item=" + v).join("&");
        } else {
            alert("Please select at least one test or profile.");
        }
    });
});
