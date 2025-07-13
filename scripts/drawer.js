// scripts/Drawer.js
document.addEventListener("DOMContentLoaded", () => {
  const drawer = document.createElement('div');
  drawer.id = "swipeDrawer";
  drawer.innerHTML = `
    <div class="drawer-header">
      <span>☰  .         HEALTHIFY</span>
      <button id="closeDrawer">✖️</button>
    </div>
    <ul>
      <li><a href="/index.html">🏠 Home</a></li>
      <li><a href="/contact.html">📞 Contact</a></li>
      <li><a href="/booking.html">🧪 Book a Test</a></li>
      <li><a href="/cart.html">🛒 My Cart</a></li>
      <li><a href="/login.html">ℹ️ login</a></li>
      <li><a Healthify 2025 All rights reserved</a></li>
    </ul>
  `;
  drawer.classList.add("drawer");

  document.body.appendChild(drawer);

  const openBtn = document.createElement("button");
  openBtn.innerText = "☰";
  openBtn.id = "openDrawer";
  document.body.appendChild(openBtn);

  openBtn.onclick = () => drawer.classList.add("open");
  drawer.querySelector("#closeDrawer").onclick = () => drawer.classList.remove("open");

  const style = document.createElement("style");
  style.textContent = `
    .drawer { position: fixed; top: 0; left: -250px; width: 250px; height: 100%; background: #fff; transition: left 0.3s; z-index: 1000; box-shadow: 2px 0 5px rgba(0,0,0,0.2); }
    .drawer.open { left: 0; }
    .drawer-header { display: flex; justify-content: space-between; padding: 10px; background: #00a884; color: white; }
    .drawer ul { list-style: none; padding: 0; }
    .drawer ul li { padding: 10px; }
    .drawer ul li a { text-decoration: none; color: #2E2E2E; font-size: 16px; }
    #openDrawer { position: fixed; top: 10px; left: 10px; font-size: 24px; background: #00a884; color: white; border: none; cursor: pointer; z-index: 1001; }
  `;
  document.head.appendChild(style);
});
