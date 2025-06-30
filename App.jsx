import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Booking from "./Booking.jsx";
import Admin from "./Admin.jsx";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  </Router>
);

export default App;
