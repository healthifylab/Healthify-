// Booking.jsx – Simple Healthians-style Booking Page
import React, { useState } from 'react';
import './Home.css';

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '', age: '', sex: '', mobile: '', address: '', pincode: '', date: '', time: '',
    tests: '', profiles: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Booking Submitted Successfully!");
    // Add Firebase or EmailJS logic here
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

        <textarea name="tests" placeholder="Select Blood Tests (CBC, LFT...)" onChange={handleChange}></textarea>
        <textarea name="profiles" placeholder="Select Test Profiles (Full Body, Vitamin...)" onChange={handleChange}></textarea>

        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default Booking;
