import React from "react";

const SearchProfiles = ({ onAdd }) => {
  const profiles = [
    { name: "Healthify Full Body Checkup", mrp: 1499, price: 999 },
    { name: "Healthify Thyroid Panel", mrp: 799, price: 499 },
    { name: "Healthify Vitamin Profile", mrp: 899, price: 699 },
  ];

  return (
    <div>
      <h3>Available Profiles</h3>
      {profiles.map((profile, idx) => (
        <div key={idx} className="card">
          <strong>{profile.name}</strong><br />
          <span style={{ color: 'red', textDecoration: 'line-through' }}>MRP: ₹{profile.mrp}</span><br />
          <span style={{ color: 'green' }}>Offer: ₹{profile.price}</span><br />
          <button onClick={() => onAdd(profile.name)}>+ Add</button>
        </div>
      ))}
    </div>
  );
};

export default SearchProfiles;