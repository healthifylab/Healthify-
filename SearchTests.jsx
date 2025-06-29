// SearchTests.jsx – Only Blood Tests
import React, { useState } from 'react';

const bloodTests = [
  { name: 'CBC', mrp: '250', offer: '199', desc: 'Complete Blood Count', tat: 'Same Day' },
  { name: 'LFT', mrp: '500', offer: '399', desc: 'Liver Function Test', tat: 'Same Day' },
  { name: 'KFT', mrp: '400', offer: '320', desc: 'Kidney Function Test', tat: 'Same Day' },
  { name: 'Blood Glucose Fasting', mrp: '100', offer: '80', desc: 'Blood Sugar Level', tat: 'Same Day' },
  { name: 'TSH', mrp: '200', offer: '160', desc: 'Thyroid Stimulating Hormone', tat: 'Same Day' },
  { name: 'T3', mrp: '180', offer: '144', desc: 'Thyroid Hormone', tat: 'Same Day' },
  { name: 'T4', mrp: '180', offer: '144', desc: 'Thyroxine Test', tat: 'Same Day' },
  { name: 'HbA1c', mrp: '350', offer: '280', desc: '3-Month Avg Blood Sugar', tat: 'Same Day' },
  { name: 'Vitamin D', mrp: '900', offer: '720', desc: '25-OH D', tat: '24 Hours' },
  { name: 'Vitamin B12', mrp: '700', offer: '560', desc: 'Cobalamin Level', tat: '24 Hours' },
  { name: 'Iron', mrp: '300', offer: '240', desc: 'Serum Iron', tat: 'Same Day' },
  { name: 'Uric Acid', mrp: '150', offer: '120', desc: 'Checks Gout Risk', tat: 'Same Day' },
  { name: 'Calcium', mrp: '200', offer: '160', desc: 'Serum Calcium', tat: 'Same Day' },
  { name: 'CRP', mrp: '400', offer: '320', desc: 'C-Reactive Protein', tat: 'Same Day' },
  { name: 'LDL Cholesterol', mrp: '250', offer: '200', desc: 'Bad Cholesterol', tat: 'Same Day' },
  { name: 'HDL Cholesterol', mrp: '250', offer: '200', desc: 'Good Cholesterol', tat: 'Same Day' },
  { name: 'Triglycerides', mrp: '300', offer: '240', desc: 'Fat in Blood', tat: 'Same Day' },
  { name: 'Total Cholesterol', mrp: '300', offer: '240', desc: 'Lipid Overview', tat: 'Same Day' },
  { name: 'ESR', mrp: '100', offer: '80', desc: 'Inflammation Marker', tat: 'Same Day' },
  { name: 'Prolactin', mrp: '400', offer: '320', desc: 'Hormone Check', tat: '24 Hours' }
];

const SearchTests = ({ onAdd }) => {
  const [query, setQuery] = useState('');
  const filtered = bloodTests.filter((t) => t.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <h3 style={{ marginTop: 30 }}>Search Blood Tests</h3>
      <input
        type="text"
        placeholder="Search Tests..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="promo-cards">
        {filtered.map((t, i) => (
          <div key={i} className="card">
            <h4>{t.name}</h4>
            <p><span style={{ textDecoration: 'line-through', color: 'red' }}>₹{t.mrp}</span> <b style={{ color: 'green' }}>₹{t.offer}</b></p>
            <p>{t.desc}</p>
            <p style={{ fontSize: '0.8rem' }}>TAT: {t.tat}</p>
            <button onClick={() => onAdd(t.name)}>Add</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchTests;
