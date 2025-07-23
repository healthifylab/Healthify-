// scripts/search.js
async function fetchTests() {
    try {
        const response = await fetch('/public/tests.json');
        if (!response.ok) throw new Error('Failed to fetch tests');
        return await response.json();
    } catch (error) {
        console.error('Error fetching tests:', error);
        const errorMessage = document.getElementById('errorMessage');
        if (errorMessage) {
            errorMessage.textContent = 'Error loading tests. Please try again later.';
            errorMessage.style.display = 'block';
        }
        return [];
    }
}

// Debounce function to limit search calls
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

document.addEventListener('DOMContentLoaded', async () => {
    const input = document.getElementById('searchInput');
    const results = document.getElementById('searchResults');
    const bookNowBtn = document.getElementById('bookNowBtn');
    const summaryCard = document.createElement('div');
    summaryCard.id = 'summaryCard';
    summaryCard.style.display = 'none';
    summaryCard.innerHTML = '<h3>Selected Tests</h3><ul id="selectedTests"></ul><p>Total: ₹<span id="totalPrice">0</span></p>';
    document.querySelector('.search-section').appendChild(summaryCard);

    if (!input || !results || !bookNowBtn) return;

    const allTests = await fetchTests();
    let selectedTests = [];

    const debouncedSearch = debounce(() => {
        const query = input.value.toLowerCase();
        results.innerHTML = '';

        if (!query || query.length < 2) {
            summaryCard.style.display = 'none';
            return;
        }

        const filtered = allTests.filter(test =>
            test.Test_Name.toLowerCase().includes(query) ||
            test.Description.toLowerCase().includes(query)
        ).slice(0, 10);

        if (filtered.length === 0) {
            results.innerHTML = '<p>No results found.</p>';
            return;
        }

        filtered.forEach(test => {
            const item = document.createElement('div');
            item.className = 'result-item';
            item.innerHTML = `
                <strong>${test.Category === "Health Checkup Profiles" ? '📁' : '🧪'} ${test.Test_Name}</strong><br/>
                <span class="strike">₹${test.MRP}</span> <strong>₹${test.Healthify_Offer_Price}</strong><br/>
                <small>🧬 ${test.Tests_Included || "N/A"} | 🕒 ${test.TAT}</small>
                <br/><em>${test.Description}</em>
                <br/><input type="checkbox" name="selectedTests" value="${test.Test_Name.replace(/ /g, '-').toLowerCase()}" data-price="${test.Healthify_Offer_Price}">
            `;
            results.appendChild(item);
        });

        // Update checkbox listeners
        document.querySelectorAll('#searchResults input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const testName = checkbox.value;
                const price = parseFloat(checkbox.getAttribute('data-price'));
                if (checkbox.checked) {
                    if (!selectedTests.some(t => t.name === testName)) {
                        selectedTests.push({ name: testName, price });
                    }
                } else {
                    selectedTests = selectedTests.filter(t => t.name !== testName);
                }
                updateSummary();
            });
        });
    }, 300);

    input.addEventListener('input', debouncedSearch);

    function updateSummary() {
        const selectedList = document.getElementById('selectedTests');
        const totalPrice = document.getElementById('totalPrice');
        selectedList.innerHTML = '';
        const total = selectedTests.reduce((sum, t) => sum + t.price, 0);
        selectedTests.forEach(test => {
            const li = document.createElement('li');
            li.textContent = `${test.name.replace(/-/g, ' ')} - ₹${test.price}`;
            selectedList.appendChild(li);
        });
        totalPrice.textContent = total.toFixed(2);
        summaryCard.style.display = selectedTests.length > 0 ? 'block' : 'none';
    }

    bookNowBtn.addEventListener('click', () => {
        if (selectedTests.length > 0) {
            const params = selectedTests.map(t => `test=${t.name}&price=${t.price}`).join('&');
            window.location.href = `/booking.html?${params}`;
        } else {
            alert('Please select at least one test.');
        }
    });
});
