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

      <section className="testimonials fade-in">
  <h2>What Our Customers Say</h2>
  <div className="testimonial-slider">
    <div className="testimonial-card">🧬 "Very smooth home collection!"<br /><strong>– Priya S.</strong></div>
    <div className="testimonial-card">🩺 "Reliable, fast & professional!"<br /><strong>– Rahul M.</strong></div>
    <div className="testimonial-card">💉 "Affordable and accurate reports!"<br /><strong>– Neha R.</strong></div>
  </div>
</section>


<section className="why-choose fade-in">
<section className="faq fade-in">
<section className="testimonials fade-in">

      <footer>
        <footer <footer className="site-footer">
  <div className="footer-top">
    <div>
      <strong>Quick Links</strong>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/booking">Book a Test</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </div>
    <div>
      <strong>Contact</strong>
      <p>📞 +91 9503832889</p>
      <p>✉️ report@healthifylabb.com</p>
    </div>
  </div>
  <p className="footer-bottom">© 2025 Healthify Lab | All Rights Reserved</p>
</footer>

  

        href="https://wa.me/919503832889"
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
      >
        💬 WhatsApp
      </a>
    </div>
  );
};
        </div>
  <p className="footer-bottom">© 2025 Healthify Lab | All Rights Reserved</p>
</footer>

export default Home;
