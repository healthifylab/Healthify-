import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

const ThankYou = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state || {};

  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: 'G-XXXXXXXXXX', // Replace with your real GA ID if tracking
        value: 1.0,
        currency: 'INR',
      });
    }
  }, []);

  const downloadReceipt = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Healthify Lab – Booking Receipt", 20, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${booking.name || "Guest"}`, 20, 40);
    doc.text("Selected Tests:", 20, 60);
    (booking.tests || []).forEach((test, i) => {
      doc.text(`- ${test}`, 30, 70 + i * 10);
    });
    const startY = 70 + (booking.tests?.length || 0) * 10 + 10;
    doc.text("Selected Profiles:", 20, startY);
    (booking.profiles || []).forEach((profile, i) => {
      doc.text(`- ${profile}`, 30, startY + 10 + i * 10);
    });
    doc.save("Healthify_Receipt.pdf");
  };

  return (
    <div className="thank-you-page">
      <h2>✅ Booking Confirmed!</h2>
      <p>Thank you, <strong>{booking.name || 'Guest'}</strong>.</p>
      <p>We’ve received your booking details.</p>

      {booking.tests && booking.tests.length > 0 && (
        <>
          <h4>Selected Tests:</h4>
          <ul>
            {booking.tests.map((test, i) => (
              <li key={i} title="Click to copy">
                {test}
                <button onClick={() => navigator.clipboard.writeText(test)}>📋</button>
              </li>
            ))}
          </ul>
        </>
      )}

      {booking.profiles && booking.profiles.length > 0 && (
        <>
          <h4>Selected Profiles:</h4>
          <ul>
            {booking.profiles.map((profile, i) => (
              <li key={i} title="Click to copy">
                {profile}
                <button onClick={() => navigator.clipboard.writeText(profile)}>📋</button>
              </li>
            ))}
          </ul>
        </>
      )}

      <button onClick={() => navigate("/")}>🏠 Go to Home</button>
      <button onClick={() => navigate("/booking")}>📋 Book Another Test</button>
      <button onClick={downloadReceipt}>📄 Download Receipt</button>
    </div>
  );
};

export default ThankYou;
