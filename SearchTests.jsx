import React from "react";

const SearchTests = ({ onAdd }) => {
  const tests = [
    { name: "CBC", mrp: 300, price: 200 },
    { name: "Blood Sugar", mrp: 200, price: 150 },
    { name: "Lipid Profile", mrp: 600, price: 450 },
  ];

  return (
    <div>
      <h3>Available Tests</h3>
      {tests.map((test, idx) => (
        <div key={idx} className="card">
          <strong>{test.name}</strong><br />
          <span style={{ color: 'red', textDecoration: 'line-through' }}>MRP: ₹{test.mrp}</span><br />
          <span style={{ color: 'green' }}>Offer: ₹{test.price}</span><br />
          <button onClick={() => onAdd(test.name)}>+ Add</button>
        </div>
      ))}
    </div>
  );
};

export default SearchTests;