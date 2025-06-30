useEffect(() => {
  if (window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: 'G-3SFGZXHXT9',
      value: 1.0,
      currency: 'INR'
    });
  }
}, []);

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state || {};

  return (
    <div className="thank-you-page">
      <h2>✅ Booking Confirmed!</h2>
      <p>Thank you, <strong>{booking.name || 'Guest'}</strong>.</p>
      <p>We’ve received your booking details.</p>

      {booking.tests && (
        <>
          <h4>Selected Tests:</h4>
          <ul>
            {booking.tests.map((test, i) => <li key={i}>{test}</li>)}
          </ul>
        </>
      )}

      {booking.profiles && (
        <>
          <h4>Selected Profiles:</h4>
          <ul>
            <h4>Selected Profiles:</h4>
<ul>
  {booking.profiles?.map((profile, i) => (
    <li key={i} title="Click to copy">
      {profile}
      <button onClick={() => navigator.clipboard.writeText(profile)}>📋</button>
    </li>
  ))}
</ul>

            <h4>Selected Tests:</h4>
<ul>
  {booking.tests?.map((test, i) => (
    <li key={i} title="Click to copy">
      {test}
      <button onClick={() => navigator.clipboard.writeText(test)}>📋</button>
    </li>
  ))}
</ul>

            {booking.profiles.map((profile, i) => <li key={i}>{profile}</li>)}
          </ul>
        </>
      )}

      <button onClick={() => navigate("/")}>🏠 Go to Home</button>
      <button onClick={() => navigate("/booking")}>📋 Book Another Test</button>
    </div>
  );
};

export default ThankYou;
