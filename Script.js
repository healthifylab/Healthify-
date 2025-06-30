// ✅ Booking script: Firebase + EmailJS + UI logic
import { saveBooking } from './firebase.js';

window.onload = function () {
  emailjs.init("E4ASdX9FG6gKnzEYF"); // Your actual EmailJS user ID

  const form = document.getElementById("bookingForm");
  const successDiv = document.getElementById("successMessage");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      if (data[key]) {
        data[key] += `, ${value}`;
      } else {
        data[key] = value;
      }
    });

    // Save to Firebase
    saveBooking(data)
      .then(() => {
        console.log("Saved to Firebase");
      })
      .catch((err) => {
        console.error("Firebase Error:", err);
      });

    // Send Email via EmailJS
    emailjs.send("service_mh0mc3m", "template_yxxr7kc", data)
      .then(() => {
        console.log("Email sent");
        form.reset();
        successDiv.style.display = "block";
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
      });
  });

  // Amount Calculation
  const testSelect = document.getElementById("testSelect");
  const profileSelect = document.getElementById("profileSelect");
  const summary = document.getElementById("summary");

  function updateSummary() {
    let mrp = 0;
    let offer = 0;

    const selectedOptions = [
      ...testSelect.selectedOptions,
      ...profileSelect.selectedOptions
    ];

    selectedOptions.forEach((opt) => {
      const text = opt.textContent;
      const priceMatch = text.match(/₹(\d+)/g);
      if (priceMatch && priceMatch.length >= 2) {
        const realMRP = parseInt(priceMatch[1].replace("₹", ""));
        const offerPrice = parseInt(priceMatch[0].replace("₹", ""));
        mrp += realMRP;
        offer += offerPrice;
      }
    });

    summary.innerHTML = `
      <p><strong>Total MRP:</strong> ₹${mrp}</p>
      <p><strong>Healthify Offer:</strong> ₹${offer}</p>
      <p><strong>You Save:</strong> ₹${mrp - offer}</p>
    `;
  }

  testSelect.addEventListener("change", updateSummary);
  profileSelect.addEventListener("change", updateSummary);
}
