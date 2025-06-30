import React from 'react';

const WhatsApp = () => {
  return (
    <a
      href="https://wa.me/919503832889"
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: '999',
      }}
    >
      <img
        src="whatsapp-icon.png"
        alt="WhatsApp"
        style={{ width: '50px', height: '50px' }}
      />
    </a>
  );
};

export default WhatsApp;
