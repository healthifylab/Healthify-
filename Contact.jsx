import React from "react";

const Contact = () => {
  return (
    <div className="contact-page">
      <h2>Contact Us</h2>
      <p>📞 Mobile: 91 9593832889</p>
      <p>✉️ Email: report@healthifylab.com</p>
      <p>📍 Healthify, Navi Mumbai, Thane, Mumbai</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("Thanks for contacting us!");
        }}
      >
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" required />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
