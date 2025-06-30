import React from 'react';

const Header = () => {
  return (
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', backgroundColor: '#ffffff', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src="logo.png"
          alt="Healthify Lab"
          style={{ height: '90px', marginRight: '20px' }}
        />
      </div>
      <nav style={{ display: 'flex', gap: '20px', fontWeight: 'bold', fontSize: '16px' }}>
        <a href="index.html">🏠 Home</a>
        <a href="about.html">ℹ️ About</a>
        <a href="contact.html">📬 Contact</a>
        <a href="booking.html">🧾 Book Test</a>
      </nav>
    </header>
  );
};

export default Header;
