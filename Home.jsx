import React from "react";

const Home = () => {
  return (
    <div className="home">
      <header className="hero">
        <img src="/logo.png" alt="Healthify Logo" className="logo" />
        <h1>Welcome to Healthify Lab</h1>
        <p>Home Sample Collection | Accurate Reports | Fast Turnaround</p>
        <button onClick={() => window.location.href='/booking'}>Book a Test</button>
      </header>

      <nav className="menu">
        <input type="checkbox" id="menu-toggle" />
        <label htmlFor="menu-toggle" className="menu-icon">☰</label>
        <div className="menu-items">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact Us</a>
          <a href="/booking">Booking</a>
        </div>
      </nav>

      <section className="promo-swiper">
        <h2>Promotions</h2>
        <div className="swiper">
          <div className="slide">🩺 Full Body Checkup @ ₹499</div>
          <div className="slide">🧬 Thyroid Panel @ ₹399</div>
          <div className="slide">🩸 Vitamin Profile @ ₹699</div>
        </div>
      </section>

      <section className="why-choose">
        <h2>Why Choose Healthify?</h2>
        <ul>
          <li>🔬 Trusted Partner in Preventive Healthcare</li>
          <li>💉 Hassle-free Sample Collection</li>
          <li>🧪 Accurate & Advanced Diagnostics</li>
          <li>🚚 Fast Turnaround Time</li>
          <li>✅ Happy Customers Across India</li>
        </ul>
      </section>

      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <strong>How do I book a test?</strong>
          <p>Click on “Book a Test”, choose your tests or packages, fill in your details, and we’ll handle the rest!</p>
        </div>
        <div className="faq-item">
          <strong>Is home sample collection free?</strong>
          <p>Yes, we offer complimentary home sample collection.</p>
        </div>
      </section>

      <section className="testimonials">
  <h2>What Our Customers Say</h2>
  <div className="testimonial-cards">
    <div className="testimonial">
      <p>"Excellent home collection service and fast reports!"</p>
      <strong>- Priya S., Pune</strong>
    </div>
    <div className="testimonial">
      <p>"Affordable pricing and accurate results. Thank you Healthify!"</p>
      <strong>- Rahul M., Mumbai</strong>
    </div>
    <div className="testimonial">
      <p>"Best lab experience ever. Hassle-free and reliable."</p>
      <strong>- Neha R., Delhi</strong>
    </div>
  </div>
</section>


      <footer>
        <p>📞 Contact: 9876543210 | ✉️ Email: support@healthifylab.in</p>
      </footer>

      <a
        href="https://wa.me/919876543210"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
      >
        💬 WhatsApp
      </a>
    </div>
  );
};

export default Home;
