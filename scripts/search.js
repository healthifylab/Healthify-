// Initialize Swiper
const swiper = new Swiper('.swiper-container', {
  slidesPerView: 3,
  spaceBetween: 20,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    480: {
      slidesPerView: 1,
    },
  },
});

// Fetch and display diseases
async function loadDiseases() {
  const diseaseCards = document.getElementById('disease-cards');
  try {
    const response = await fetch('public/diseases.json');
    if (!response.ok) throw new Error('Failed to load diseases data');
    const diseases = await response.json();
    
    diseaseCards.innerHTML = ''; // Clear any existing content
    diseases.forEach(disease => {
      const card = document.createElement('div');
      card.classList.add('swiper-slide');
      card.innerHTML = `
        <div class="disease-card">
          <h3>${disease.name}</h3>
          <p>Symptoms: ${disease.symptoms.join(', ')}</p>
          <button class="cta-button" onclick="bookTest('${disease.relatedTests[0]}')">Book Test</button>
        </div>
      `;
      diseaseCards.appendChild(card);
    });

    swiper.update();
  } catch (error) {
    console.error('Error loading diseases:', error);
    diseaseCards.innerHTML = '<p class="error-message">Unable to load health conditions. Please try again later.</p>';
  }
}

// Symptom search functionality
const searchInput = document.getElementById('symptom-search');
const searchResults = document.getElementById('search-results');

searchInput.addEventListener('input', async (e) => {
  const query = e.target.value.toLowerCase();
  searchResults.innerHTML = '';
  
  if (query.length < 2) return;

  try {
    const response = await fetch('public/diseases.json');
    if (!response.ok) throw new Error('Failed to load diseases data');
    const diseases = await response.json();
    const results = diseases.filter(disease =>
      disease.symptoms.some(symptom => symptom.toLowerCase().includes(query)) ||
      disease.name.toLowerCase().includes(query)
    );

    if (results.length === 0) {
      searchResults.innerHTML = '<p>No matching conditions found.</p>';
      return;
    }

    results.forEach(disease => {
      const result = document.createElement('div');
      result.innerHTML = `
        <h3>${disease.name}</h3>
        <p>Symptoms: ${disease.symptoms.join(', ')}</p>
        <button class="cta-button" onclick="bookTest('${disease.relatedTests[0]}')">Book Test</button>
      `;
      searchResults.appendChild(result);
    });
  } catch (error) {
    console.error('Error searching diseases:', error);
    searchResults.innerHTML = '<p class="error-message">Unable to search conditions. Please try again later.</p>';
  }
});

// Book test by selecting profile in the form
function bookTest(profileName) {
  const profileSelect = document.getElementById('profile-select');
  if (profileSelect) {
    profileSelect.value = profileName;
    document.getElementById('book-test').scrollIntoView({ behavior: 'smooth' });
  } else {
    console.error('Booking form not found on this page');
  }
}

// Load diseases on page load
document.addEventListener('DOMContentLoaded', loadDiseases);
