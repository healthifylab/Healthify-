// SearchProfiles.jsx – Only Health Profiles with Healthify branding
import React, { useState } from 'react';

const healthProfiles = [
  { name: 'Healthify Full Body Checkup Basic', mrp: '1499', offer: '999', desc: 'Includes CBC, LFT, KFT, Lipid, Thyroid', tat: '24 Hours' },
  { name: 'Healthify Full Body Checkup Advanced', mrp: '2499', offer: '1799', desc: 'Includes CBC, LFT, KFT, Lipid, Thyroid, Vit D & B12', tat: '24 Hours' },
  { name: 'Healthify Diabetes Profile', mrp: '999', offer: '799', desc: 'FBS, PPBS, HbA1c, Insulin', tat: 'Same Day' },
  { name: 'Healthify Heart Risk Package', mrp: '1499', offer: '1199', desc: 'Lipid, CRP, ESR, Homocysteine', tat: '24 Hours' },
  { name: 'Thyroid Profile Complete', mrp: '599', offer: '449', desc: 'T3, T4, TSH', tat: 'Same Day' },
  { name: 'Healthify Kidney Care Package', mrp: '899', offer: '699', desc: 'KFT, Urine, Uric Acid', tat: 'Same Day' },
  { name: 'Healthify Liver Care Package', mrp: '999', offer: '749', desc: 'LFT, Hepatitis markers', tat: '24 Hours' },
  { name: 'Healthify Vitamin Package', mrp: '1599', offer: '1299', desc: 'Vitamin D & B12', tat: '24 Hours' },
  { name: 'Healthify Fever Panel', mrp: '899', offer: '699', desc: 'CBC, CRP, Dengue, Malaria', tat: 'Same Day' },
  { name: 'Healthify Women Wellness Basic', mrp: '1499', offer: '1199', desc: 'CBC, Thyroid, Calcium, Iron, Vitamin D', tat: '24 Hours' },
  { name: 'Healthify Men Wellness Basic', mrp: '1499', offer: '1199', desc: 'CBC, Lipid, Liver, Kidney, Glucose', tat: '24 Hours' },
  { name: 'Healthify Allergy Profile', mrp: '1799', offer: '1499', desc: '50+ Allergen Panel', tat: '48 Hours' },
  { name: 'Healthify Arthritis Profile', mrp: '1199', offer: '999', desc: 'RA Factor, CRP, ESR, Uric Acid', tat: '24 Hours' },
  { name: 'Healthify Pre-Marital Profile', mrp: '1999', offer: '1599', desc: 'CBC, Hepatitis B, HIV, Blood Group', tat: '24 Hours' }
];

const SearchProfiles = ({ onAdd }) => {
  const [query, setQuery] = useState('');
  const filtered = healthProfiles.filter((t) => t.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <h3 style={{ marginTop: 30 }}>Search Health Profiles</h3>
      <input
        type="text"
        placeholder="Search Profiles..."
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

export default SearchProfiles;
