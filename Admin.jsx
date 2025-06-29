// Admin.jsx – Simple Booking Viewer
import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs, updateDoc, doc } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js';

const Admin = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const querySnapshot = await getDocs(collection(db, 'bookings'));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setBookings(data);
  };

  const updateStatus = async (id, newStatus) => {
    await updateDoc(doc(db, 'bookings', id), { status: newStatus });
    fetchBookings();
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="admin">
      <h2>Admin Dashboard – Bookings</h2>
      {bookings.map((b, i) => (
        <div key={i} className="card">
          <h3>{b.name} ({b.age}/{b.sex})</h3>
          <p><b>Mobile:</b> {b.mobile}</p>
          <p><b>Address:</b> {b.address} – {b.pincode}</p>
          <p><b>Date/Time:</b> {b.date} at {b.time}</p>
          <p><b>Tests:</b> {b.tests}</p>
          <p><b>Profiles:</b> {b.profiles}</p>
          <p><b>Status:</b> {b.status}</p>
          <div>
            <button onClick={() => updateStatus(b.id, 'Confirm')}>Confirm</button>
            <button onClick={() => updateStatus(b.id, 'Hold')}>Hold</button>
            <button onClick={() => updateStatus(b.id, 'Reject')}>Reject</button>
            <button onClick={() => updateStatus(b.id, 'Reschedule')}>Reschedule</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Admin;
