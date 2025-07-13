// scripts/Search.js
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

document.addEventListener("DOMContentLoaded", async () => {
  const input = document.getElementById("searchInput");
  const results = document.getElementById("searchResults");
  if (!input || !results) return;

  const allTests = await fetchTests();

  input.addEventListener("input", () => {
    const query = input.value.toLowerCase();
    results.innerHTML = "";

    if (!query || query.length < 2) return;

    const filtered = allTests.filter(t =>
      t.Test_Name.toLowerCase().includes(query) ||
      t.Description.toLowerCase().includes(query)
    ).slice(0, 10);

    filtered.forEach(test => {
      const item = document.createElement("div");
      item.className = "result-item";
      item.innerHTML = `
        <strong>${test.Category === "Health Checkup Profiles" ? '📁' : '🧪'} ${test.Test_Name}</strong><br/>
        <span class="strike">₹${test.MRP}</span> <strong>₹${test.Healthify_Offer_Price}</strong><br/>
        <small>🧬 ${test.Tests_Included || "N/A"} | 🕒 ${test.TAT}</small>
        <br/><em>${test.Description}</em>
        <br/><button onclick='cartUI.addToCart("${test.Test_Name}")'>➕ Add to Cart</button>
      `;
      results.appendChild(item);
    });
  });
});
