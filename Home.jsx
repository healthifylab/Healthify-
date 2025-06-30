import React from "react";

const Home = () => {
  return (
    <div className="home">
      <header className="hero">
        <h1>Welcome to Healthify Lab</h1>
        <p>Home Sample Collection | Accurate Reports | Fast Turnaround</p>
        <button onClick={() => window.location.href='/booking'}>Book a Test</button>
      </header>

      <section className="promo">
        <h2>Promotional Offers</h2>
        <div className="cards">
          <div className="card">Full Body Checkup @ ₹499</div>
          <div className="card">Thyroid Panel @ ₹399</div>
          <div className="card">Diabetes Screening @ ₹299</div>
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
