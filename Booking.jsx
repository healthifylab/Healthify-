// Booking.jsx – with Search & Cart Visual for Tests and Profiles
import React, { useState } from 'react';
import './Home.css';
import { db } from './firebase';
import { collection, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import emailjs from '@emailjs/browser';
import Search, { allTests } from './Search';

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '', age: '', sex: '', mobile: '', address: '', pincode: '', date: '', time: '',
    tests: '', profiles: ''
  });
  const [testCart, setTestCart] = useState([]);
  const [profileCart, setProfileCart] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "bookings"), {
        ...formData,
        tests: testCart.join(', '),
        profiles: profileCart.join(', '),
        status: 'Pending',
        createdAt: Timestamp.now()
      });

      emailjs.send('service_z3ac4pk', 'template_5v6t6ku', {
        ...formData,
        tests: testCart.join(', '),
        profiles: profileCart.join(', ')
      }, 'dJE_JHAoNTxxzTxiT');

      alert("Booking Confirmed!");
    } catch (err) {
      console.error("Error saving booking:", err);
      alert("Failed to book. Try again.");
    }
  };

  const handleAddTest = (testName) => {
    if (!testCart.includes(testName)) {
      setTestCart([...testCart, testName]);
    }
  };

  const handleAddProfile = (profileName) => {
    if (!profileCart.includes(profileName)) {
      setProfileCart([...profileCart, profileName]);
    }
  };

  return (
    <div className="home-container">
      <h2 style={{ textAlign: 'center', marginTop: '20px', color: '#0077cc' }}>Book a Test</h2>
      <form className="booking-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
        <input type="number" name="age" placeholder="Age" required onChange={handleChange} />
        <select name="sex" onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input type="tel" name="mobile" placeholder="Mobile Number" required onChange={handleChange} />
        <input type="text" name="address" placeholder="Full Address" required onChange={handleChange} />
        <input type="text" name="pincode" placeholder="Pincode" required onChange={handleChange} />
        <input type="date" name="date" required onChange={handleChange} />
        <input type="time" name="time" required onChange={handleChange} />

        <textarea name="profiles" placeholder="Manually type profiles if any..." value={formData.profiles} onChange={handleChange}></textarea>

        <button type="submit">Confirm Booking</button>
      </form>

      <div className="cart-section">
        <h3>🧪 Selected Tests</h3>
        <ul>
          {testCart.map((item, i) => <li key={i}>{item}</li>)}
        </ul>

        <h3>📋 Selected Profiles</h3>
        <ul>
          {profileCart.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>

      <div style={{ marginTop: '30px' }}>
        <Search onAdd={handleAddTest} />
        <Search onAdd={handleAddProfile} />
      </div>
    </div>
  );
};

export default Booking;
