async function initSearch() {
    try {
        const responseTests = await fetch('/public/tests.json');
        const tests = await responseTests.json();
        const responseDiseases = await fetch('/public/diseases.json');
        const diseases = await responseDiseases.json();
        const responseProfiles = await fetch('/public/profiles.json');
        const profiles = await responseProfiles.json();
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');

        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase().trim();
            searchResults.innerHTML = '';

            if (query.length < 2) return;

            // Search tests
            const testMatches = tests.filter(test =>
                test.name.toLowerCase().includes(query) ||
                test.description.toLowerCase().includes(query)
            );

            // Search profiles
            const profileMatches = profiles.filter(profile =>
                profile.Test_Name.toLowerCase().includes(query) ||
                profile.Description.toLowerCase().includes(query) ||
                profile.Tests_Included.some(test => test.toLowerCase().includes(query))
            );

            // Search diseases
            const diseaseMatches = diseases.filter(disease =>
                disease.name.toLowerCase().includes(query) ||
                disease.symptoms.some(symptom => symptom.toLowerCase().includes(query)) ||
                disease.causes.some(cause => cause.toLowerCase().includes(query))
            );

            // Combine results
            if (testMatches.length > 0 || profileMatches.length > 0 || diseaseMatches.length > 0) {
                const resultBox = document.createElement('div');
                resultBox.className = 'search-result';

                if (testMatches.length > 0) {
                    resultBox.innerHTML += `
                        <h3>Test Matches</h3>
                        <ul>
                            ${testMatches.map(test => `
                                <li>
                                    <strong>${test.name}</strong>: ${test.description}
                                    <br><a href="/booking.html?profile=${encodeURIComponent(test.name.toLowerCase().replace(/ /g, '-'))}">Book Now</a>
                                </li>
                            `).join('')}
                        </ul>
                    `;
                }

                if (profileMatches.length > 0) {
                    resultBox.innerHTML += `
                        <h3>Profile Matches</h3>
                        <ul>
                            ${profileMatches.map(profile => `
                                <li>
                                    <strong>${profile.Test_Name}</strong>: ${profile.Description}
                                    <br><strong>MRP:</strong> ₹${profile.MRP} | <strong>Offer Price:</strong> ₹${profile.Healthify_Offer_Price}
                                    <br><strong>TAT:</strong> ${profile.TAT || '24-48 hours'}
                                    <br><strong>Includes:</strong> ${profile.Tests_Included.join(', ')}
                                    <br><a href="/booking.html?profile=${encodeURIComponent(profile.Test_Name.toLowerCase().replace(/ /g, '-'))}">Book Now</a>
                                </li>
                            `).join('')}
                        </ul>
                    `;
                }

                if (diseaseMatches.length > 0) {
                    resultBox.innerHTML += `
                        <h3>Disease Matches</h3>
                        <ul>
                            ${diseaseMatches.map(disease => `
                                <li>
                                    <strong>${disease.name}</strong>: ${disease.symptoms.join(', ')}
                                    <br>Recommended Tests: ${disease.relatedTests.length > 0 ? disease.relatedTests.map(test => `
                                        <a href="/booking.html?profile=${encodeURIComponent(test.toLowerCase().replace(/ /g, '-'))}">${test}</a>
                                    `).join(', ') : 'Contact us for recommendations'}
                                </li>
                            `).join('')}
                        </ul>
                    `;
                }

                searchResults.appendChild(resultBox);
            }
        });
    } catch (error) {
        console.error('Error initializing search:', error);
        document.getElementById('searchResults').innerHTML = '<p>Error loading search data. Please try again later.</p>';
    }
}

document.addEventListener('DOMContentLoaded', initSearch);
