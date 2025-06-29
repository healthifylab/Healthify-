// Search.jsx – Shared Search for Tests/Profiles (linked with Booking)
import React, { useState } from 'react';
import './Home.css';

const allTests = [
  { name: 'Complete Blood Count (CBC)', mrp: '200', offer: '160', desc: 'RBC/WBC/Platelets etc.', tat: 'Same Day' },
  { name: 'Liver Function Test (LFT)', mrp: '550', offer: '440', desc: 'Liver enzymes & proteins.', tat: 'Same Day' },
  { name: 'Kidney Function Test (KFT)', mrp: '450', offer: '360', desc: 'Urea, creatinine and more.', tat: 'Same Day' },
  { name: 'Fasting Blood Sugar (FBS)', mrp: '100', offer: '80', desc: 'Measures blood sugar after fasting.', tat: 'Same Day' },
  { name: 'HbA1c (Glycated Hemoglobin)', mrp: '400', offer: '320', desc: 'Long-term glucose levels.', tat: 'Same Day' },
  { name: 'TSH (Thyroid Stimulating Hormone)', mrp: '200', offer: '160', desc: 'Thyroid function marker.', tat: 'Same Day' },
  { name: 'Lipid Profile', mrp: '400', offer: '320', desc: 'Cholesterol & triglycerides.', tat: 'Same Day' },
  { name: 'Vitamin D (25-OH)', mrp: '900', offer: '720', desc: 'Vitamin D3 levels in blood.', tat: '24 Hours' },
  { name: 'Vitamin B12', mrp: '750', offer: '600', desc: 'Checks Vitamin B12 levels.', tat: '24 Hours' },
  { name: 'Iron Studies', mrp: '650', offer: '520', desc: 'Serum iron, TIBC, % saturation.', tat: '24 Hours' },
  { name: 'Thyroid Profile (T3, T4, TSH)', mrp: '500', offer: '400', desc: 'Comprehensive thyroid panel.', tat: 'Same Day' },
  { name: 'Diabetes Profile', mrp: '900', offer: '720', desc: 'FBS, PPBS, HbA1c & more.', tat: 'Same Day' },
  { name: 'Calcium Test', mrp: '200', offer: '160', desc: 'Blood calcium level.', tat: 'Same Day' },
  { name: 'Uric Acid Test', mrp: '150', offer: '120', desc: 'Detect gout or kidney issues.', tat: 'Same Day' },
  { name: 'CRP (C-Reactive Protein)', mrp: '350', offer: '280', desc: 'Inflammation indicator.', tat: 'Same Day' }
];

const Search = ({ onAdd }) => {
  const [query, setQuery] = useState('');
  const filtered = allTests.filter((t) => t.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="home-container">
      <h2 style={{ textAlign: 'center', marginTop: '20px', color: '#0077cc' }}>Search Tests & Profiles</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for tests or profiles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="promo-cards">
        {filtered.length === 0 && <p>No results found.</p>}
        {filtered.map((t, i) => (
          <div key={i} className="card">
            <h3>{t.name}</h3>
            <p>
              <span style={{ textDecoration: 'line-through', color: 'red' }}>₹{t.mrp}</span>{' '}
              <span style={{ color: 'green', fontWeight: 'bold' }}>₹{t.offer}</span>
            </p>
            <p style={{ fontSize: '0.9rem' }}>{t.desc}</p>
            <p style={{ fontSize: '0.8rem', color: '#666' }}>TAT: {t.tat}</p>
            {onAdd && <button onClick={() => onAdd(t.name)}>Add</button>}
          </div>
        ))}
      </div>
    </div>
  );
};

export { allTests };
export default Search;
