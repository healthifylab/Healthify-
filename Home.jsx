// Home.jsx – Healthians-style Homepage without Tailwind
import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-text">
          <h1>Full Body Checkup @ ₹499</h1>
          <p>Home Sample Collection | Same-Day Report</p>
          <button onClick={() => navigate('/booking')}>Book Now</button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search Tests or Profiles" />
      </div>

      {/* Promo Cards */}
      <div className="promo-cards">
        <div className="card">
          <img src="/images/home-collection.png" alt="Home" />
          <p>Free Home Collection</p>
        </div>
        <div className="card">
          <img src="/images/lab-certified.png" alt="Certified" />
          <p>Certified Diagnostics Lab</p>
        </div>
        <div className="card">
          <img src="/images/fast-report.png" alt="Report" />
          <p>Same-Day Reports</p>
        </div>
      </div>

      {/* Why Choose Healthify */}
      <div className="why-healthify">
        <h2>Why Choose Healthify</h2>
        <ul>
          <li>🔬 Trusted Partner in Preventive Healthcare</li>
          <li>💉 Hassle-free Sample Collection at Home</li>
          <li>🧪 Advanced Diagnostics & Accurate Reports</li>
          <li>🚚 Fast Turnaround | ✅ Happy Customers</li>
          <li>📞 Book your test today — your health deserves the best</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
