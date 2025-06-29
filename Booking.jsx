// Booking.jsx – Booking with Firebase + EmailJS + Add from Search
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "bookings"), {
        ...formData,
        status: 'Pending',
        createdAt: Timestamp.now()
      });

      emailjs.send('service_z3ac4pk', 'template_5v6t6ku', {
        name: formData.name,
        age: formData.age,
        sex: formData.sex,
        mobile: formData.mobile,
        address: formData.address,
        pincode: formData.pincode,
        date: formData.date,
        time: formData.time,
        tests: formData.tests,
        profiles: formData.profiles
      }, 'dJE_JHAoNTxxzTxiT');

      alert("Booking Confirmed!");
    } catch (err) {
      console.error("Error saving booking:", err);
      alert("Failed to book. Try again.");
    }
  };

  const handleAddTest = (testName) => {
    setFormData(prev => ({
      ...prev,
      tests: prev.tests ? `${prev.tests}, ${testName}` : testName
    }));
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

        <textarea name="tests" placeholder="Select Blood Tests (CBC, LFT...)" value={formData.tests} onChange={handleChange}></textarea>
        <textarea name="profiles" placeholder="Select Test Profiles (Full Body, Vitamin...)" value={formData.profiles} onChange={handleChange}></textarea>

        <button type="submit">Confirm Booking</button>
      </form>

      <div style={{ marginTop: '30px' }}>
        <Search onAdd={handleAddTest} />
      </div>
    </div>
  );
};

export default Booking;
