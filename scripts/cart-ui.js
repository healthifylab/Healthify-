// scripts/cart-ui.js
async function fetchTests() {
  try {
    const response = await fetch('/tests.json');
    if (!response.ok) throw new Error('Failed to fetch tests');
    return await response.json();
  } catch (error) {
    console.error('Error fetching tests:', error);
    return [];
  }
}

export async function displayCart() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  const cartDiv = document.getElementById("cartItems");
  const totalPriceDiv = document.getElementById("totalPrice");

  if (!cartDiv || !totalPriceDiv) return;

  if (!cartItems.length) {
    cartDiv.innerHTML = "<p>Your cart is empty.</p>";
    totalPriceDiv.textContent = "💰 Total: ₹0";
    return;
  }

  cartDiv.innerHTML = cartItems.map(item => `
    <div class="card" style="margin: 10px 0;">
      <h4>${item.Test_Name}</h4>
      <p>₹${item.Healthify_Offer_Price}</p>
      <button onclick="cartUI.removeFromCart('${item.Test_Name}')">Remove</button>
    </div>
  `).join("");

  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.Healthify_Offer_Price), 0);
  totalPriceDiv.textContent = `💰 Total: ₹${total.toFixed(2)}`;
}

export async function addToCart(testName) {
  const tests = await fetchTests();
  const test = tests.find(t => t.Test_Name === testName);
  if (!test) return;

  let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  if (!cartItems.find(item => item.Test_Name === testName)) {
    cartItems.push({
      Test_Name: test.Test_Name,
      Healthify_Offer_Price: test.Healthify_Offer_Price
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    alert("✅ Added to cart");
  } else {
    alert("⚠️ Already in cart");
  }
  await displayCart();
}

export async function removeFromCart(testName) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  cartItems = cartItems.filter(item => item.Test_Name !== testName);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  await displayCart();
}

document.addEventListener("DOMContentLoaded", displayCart);

// Floating Cart Icon
const cartBtn = document.createElement("div");
cartBtn.innerHTML = `
  <a href="/cart.html" style="position: fixed; bottom: 90px; right: 20px; background-color: #00a884; padding: 10px 15px; border-radius: 50%; box-shadow: 0 2px 8px rgba(0,0,0,0.2); z-index: 999;">
    <i class="fas fa-shopping-cart" style="color:white; font-size: 20px;"></i>
  </a>
`;
document.body.appendChild(cartBtn);
