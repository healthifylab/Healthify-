import emailjs from '@emailjs/browser';

import React, { useState } from "react";
import SearchTests from "./SearchTests.jsx";
import SearchProfiles from "./SearchProfiles.jsx";

const Booking = () => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    sex: "",
    mobile: "",
    address: "",
    pincode: "",
    date: "",
    time: "",
  });

  const [testCart, setTestCart] = useState([]);
  const [profileCart, setProfileCart] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddTest = (name) => {
    if (!testCart.includes(name)) setTestCart([...testCart, name]);
  };

  const handleAddProfile = (name) => {
    if (!profileCart.includes(name)) setProfileCart([...profileCart, name]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookingData = {
      ...form,
      tests: testCart.join(", "),
      profiles: profileCart.join(", "),
      status: "Pending",
    };

    // ✅ Firebase + EmailJS call (to be implemented)
    console.log("Booking data:", bookingData);
    alert("Booking Submitted! ✅");

    setForm({
      name: "",
      age: "",
      sex: "",
      mobile: "",
      address: "",
      pincode: "",
      date: "",
      time: "",
    });
    setTestCart([]);
    setProfileCart([]);
  };

  return (
    <div className="booking-form">
      <h2>🧪 Book a Test with Healthify</h2>
      <form onSubmit={emailjs.send('service_z3ac4pk', 'template_5v6t6ku', {
  name: name,
  phone: phone,
  email: email,
  address: address,
  tests: testCart.join(', '),
  profiles: profileCart.join(', '),
}, 'dJE_JHAoNTxxzTxiT')
.then(() => {
  alert("Booking successful! Confirmation sent.");
})
.catch((error) => {
  console.error("Email failed", error);
});
}>
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
        <input name="age" placeholder="Age" value={form.age} onChange={handleChange} required />
        <select name="sex" value={form.sex} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input name="mobile" placeholder="Mobile Number" value={form.mobile} onChange={handleChange} required />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
        <input name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} required />
        <input name="date" type="date" value={form.date} onChange={handleChange} required />
        <input name="time" type="time" value={form.time} onChange={handleChange} required />

        <h3>🔍 Search & Add Tests</h3>
        <SearchTests onAdd={handleAddTest} />

        <h3>📋 Search & Add Profiles</h3>
        <SearchProfiles onAdd={handleAddProfile} />

        <div>
          <h4>✅ Selected Tests:</h4>
          <ul>{testCart.map((t, i) => <li key={i}>{t}</li>)}</ul>

          <h4>✅ Selected Profiles:</h4>
          <ul>{profileCart.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default Booking;
