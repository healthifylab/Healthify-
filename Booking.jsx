import React, { useState } from "react";
import SearchTests from "./SearchTests.jsx";
import SearchProfiles from "./SearchProfiles.jsx";

const Booking = () => {
  const [testCart, setTestCart] = useState([]);
  const [profileCart, setProfileCart] = useState([]);

  const handleAddTest = (name) => {
    if (!testCart.includes(name)) setTestCart([...testCart, name]);
  };

  const handleAddProfile = (name) => {
    if (!profileCart.includes(name)) setProfileCart([...profileCart, name]);
  };

  return (
    <div>
      <h2>Book Your Test</h2>
      <SearchTests onAdd={handleAddTest} />
      <SearchProfiles onAdd={handleAddProfile} />
      <div>
        <h4>Selected Tests:</h4>
        <ul>{testCart.map((t, i) => <li key={i}>{t}</li>)}</ul>
        <h4>Selected Profiles:</h4>
        <ul>{profileCart.map((p, i) => <li key={i}>{p}</li>)}</ul>
      </div>
    </div>
  );
};

export default Booking;