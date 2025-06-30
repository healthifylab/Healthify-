// ✅ This is the updated App.jsx with working components, footer, header and correct contact info

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Hero from './Hero';
import BookingForm from './BookingForm';
import SearchBar from './SearchBar';
import WhatsApp from './WhatsApp';
import PromoPopup from './PromoPopup';

function App() {
  return (
    <div>
      <Header />
      <SearchBar />
      <Hero />
      <PromoPopup />
      <BookingForm />
      <Footer />
      <WhatsApp />
    </div>
  );
}

export default App;
