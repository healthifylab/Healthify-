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
        send_to: 'G-3SFGZXHXT9', // Replace with your Google Analytics ID
        value: 1.0,
        currency: 'INR',
      });
    }
  }, []);

  const downloadReceipt = () => {
    const doc = new jsPDF();
    const img = new Image();
    img.src = "/logo.png"; // Ensure logo.png is in public folder

    img.onload = () => {
      doc.addImage(img, "PNG", 75, 10, 60, 20); // Centered logo
      doc.setFontSize(16);
      doc.text("Healthify Lab – Booking Receipt", 20, 40);
      doc.setFontSize(12);
      doc.text(`Name: ${booking.name || "Guest"}`, 20, 55);

      let y = 70;
      if (booking.tests?.length) {
        doc.text("Selected Tests:", 20, y);
        booking.tests.forEach((test, i) => {
          doc.text(`- ${test}`, 30, y + 10 + i * 8);
        });
        y += 10 + booking.tests.length * 8;
      }

      if (booking.profiles?.length) {
        doc.text("Selected Profiles:", 20, y);
        booking.profiles.forEach((profile, i) => {
          doc.text(`- ${profile}`, 30, y + 10 + i * 8);
        });
        y += 10 + booking.profiles.length * 8;
      }

      y += 20;
      doc.setFontSize(12);
      doc.text("हेल्थिफाय लैब – बुकिंग रसीद", 20, y);
      doc.text("धन्यवाद! आपकी जांच बुक कर ली गई है।", 20, y + 10);
      doc.text("Healthify लॅब – तपासणी पावती", 20, y + 25);
      doc.text("धन्यवाद! तुमची तपासणी यशस्वीरित्या बुक झाली आहे.", 20, y + 35);

      doc.save("Healthify_Receipt.pdf");
    };
  };

  const whatsappMessage = `Hello Healthify Lab,

I have successfully booked a test.

Name: ${booking.name || ""}
Tests: ${booking.tests?.join(", ") || "-"}
Profiles: ${booking.profiles?.join(", ") || "-"}`;

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

      <div className="button-group">
        <button onClick={() => navigate("/")}>🏠 Go to Home</button>
        <button onClick={() => navigate("/booking")}>📋 Book Another Test</button>
        <button onClick={downloadReceipt}>📄 Download Receipt</button>
        <a
          href={`https://wa.me/919503832889?text=${encodeURIComponent(whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button>💬 Confirm on WhatsApp</button>
        </a>
      </div>
    </div>
  );
};

export default ThankYou;
