// ✅ BookingForm.jsx — connected with Firebase
import React, { useState } from 'react';
import { saveBooking } from './firebase';

function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    mobile: '',
    address: '',
    pincode: '',
    date: '',
    time: '',
    tests: [],
    profiles: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveBooking(formData)
      .then(() => {
        alert('✅ Booking confirmed! You will be contacted shortly.');
        window.location.href = 'thankyou.html';
      })
      .catch((err) => {
        console.error('Firebase Error:', err);
        alert('❌ Failed to book. Please try again.');
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
      <h2>Book a Test</h2>
      <input name="name" placeholder="Full Name" onChange={handleChange} required />
      <input name="age" type="number" placeholder="Age" onChange={handleChange} required />
      <select name="gender" onChange={handleChange} required>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <input name="mobile" placeholder="Mobile Number" onChange={handleChange} required />
      <input name="address" placeholder="Address" onChange={handleChange} required />
      <input name="pincode" placeholder="Pincode" onChange={handleChange} required />
      <input name="date" type="date" onChange={handleChange} required />
      <input name="time" type="time" onChange={handleChange} required />

      {/* Add dropdown or multiselect for tests/profiles if needed */}

      <button type="submit">Book Now</button>
    </form>
  );
}

export default BookingForm;
  
