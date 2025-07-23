// search.js
async function fetchTests() {
    try {
        const response = await fetch('/public/tests.json');
        if (!response.ok) throw new Error('Network response was not ok: ' + response.status);
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        document.getElementById('errorMessage').innerText = 'Error fetching tests: ' + error.message;
        document.getElementById('errorMessage').style.display = 'block';
        return [];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const summaryCard = document.getElementById('summaryCard');
    const selectedTests = document.getElementById('selectedTests');
    const bookNowBtn = document.getElementById('bookNowBtn');
    const promoSlides = document.getElementById('promoSlides');
    const featuredSlides = document.getElementById('featuredSlides');

    let tests = [];
    let selected = [];

    // Fetch and populate initial data
    fetchTests().then(data => {
        tests = data;
        populateSearchResults('');
        populateSlides(promoSlides, tests.filter(test => test.Category === "Health Checkup Profiles").slice(0, 6));
        populateSlides(featuredSlides, tests.filter(test => test.Category === "Individual Tests").slice(0, 6));
    }).catch(error => console.error('Initial fetch failed:', error));

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        populateSearchResults(query);
    });

    function populateSearchResults(query) {
        searchResults.innerHTML = '';
        const filteredTests = tests.filter(test =>
            test.Test_Name.toLowerCase().includes(query) ||
            test.Description.toLowerCase().includes(query)
        );
        if (filteredTests.length === 0 && query) {
            searchResults.innerHTML = '<p>No results found.</p>';
            return;
        }
        filteredTests.forEach(test => {
            const div = document.createElement('div');
            div.innerHTML = `<input type="checkbox" id="test-${test.Test_Name.replace(/\s+/g, '-').toLowerCase()}" 
                data-name="${test.Test_Name}" data-price="${test.Healthify_Offer_Price}">
                <label for="test-${test.Test_Name.replace(/\s+/g, '-').toLowerCase()}">${test.Test_Name} - ₹${test.Healthify_Offer_Price}</label>`;
            searchResults.appendChild(div);
        });

        document.querySelectorAll('#searchResults input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const testName = checkbox.getAttribute('data-name');
                if (checkbox.checked) {
                    if (!selected.some(t => t.name === testName)) {
                        selected.push({ name: testName, price: parseFloat(checkbox.getAttribute('data-price')) });
                    }
                } else {
                    selected = selected.filter(t => t.name !== testName);
                }
                updateSummary();
            });
        });
    }

    function populateSlides(wrapper, tests) {
        if (!wrapper) return;
        wrapper.innerHTML = '';
        tests.forEach(test => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.innerHTML = `<div class="card"><h3>${test.Test_Name}</h3><p>${test.Description}</p><p>₹${test.Healthify_Offer_Price}</p></div>`;
            wrapper.appendChild(slide);
        });
    }

    function updateSummary() {
        selectedTests.innerHTML = '';
        const total = selected.reduce((sum, t) => sum + t.price, 0);
        selected.forEach(test => {
            const li = document.createElement('li');
            li.textContent = `${test.name} - ₹${test.price}`;
            selectedTests.appendChild(li);
        });
        if (selected.length > 0) {
            summaryCard.style.display = 'block';
            bookNowBtn.href = `?test=${selected.map(t => t.name.replace(/\s+/g, '-').toLowerCase()).join(',')}&total=${total.toFixed(2)}`;
        } else {
            summaryCard.style.display = 'none';
        }
    }
});
