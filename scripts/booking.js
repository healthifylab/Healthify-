// Populate test profiles
async function loadProfiles() {
  const profileSelect = document.getElementById('profile-select');
  if (!profileSelect) return; // Exit if no select element

  try {
    const response = await fetch('public/profiles.json');
    if (!response.ok) throw new Error('Failed to load profiles data');
    const profiles = await response.json();

    // Clear existing options
    profileSelect.innerHTML = '<option value="">Select a profile</option>';

    // Populate dropdown
    profiles.forEach(profile => {
      const option = document.createElement('option');
      option.value = profile.name;
      option.textContent = profile.name;
      profileSelect.appendChild(option);
    });

    // Pre-select profile if URL parameter exists (for booking.html)
    const urlParams = new URLSearchParams(window.location.search);
    const selectedProfile = urlParams.get('profile');
    if (selectedProfile) {
      profileSelect.value = selectedProfile;
    }
  } catch (error) {
    console.error('Error loading profiles:', error);
    profileSelect.insertAdjacentHTML('afterend', '<p class="error-message">Unable to load test profiles. Please try again later.</p>');
  }
}

// Handle booking form submission
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const profileName = document.getElementById('profile-select').value;
    const userEmail = document.getElementById('user-email').value;

    if (!profileName || !userEmail) {
      alert('Please select a profile and enter your email.');
      return;
    }

    try {
      const response = await fetch('public/profiles.json');
      if (!response.ok) throw new Error('Failed to load profiles data');
      const profiles = await response.json();
      const profile = profiles.find(p => p.name === profileName);

      if (!profile) {
        alert('Selected profile not found.');
        return;
      }

      await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        profile: profileName,
        tests: profile.tests.join(', '),
        user_email: userEmail,
      });
      alert('Booking request sent successfully!');
      bookingForm.reset();
    } catch (error) {
      console.error('Error sending booking:', error);
      alert('Failed to send booking request. Please try again later.');
    }
  });
}

// Load profiles on page load
document.addEventListener('DOMContentLoaded', loadProfiles);
