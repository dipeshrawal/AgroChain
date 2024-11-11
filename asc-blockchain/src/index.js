// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import FarmerLogin from './FarmerLogin';
import CustomerLogin from './CustomerLogin';
import DistributorLogin from './DistributorLogin';
import RetailerLogin from './RetailerLogin';
import './index.css';
import CustomerSignup from './CustomerSignup';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login/farmer" element={<FarmerLogin />} />
      <Route path="/login/customer" element={<CustomerLogin />} />
      <Route path="/login/distributor" element={<DistributorLogin />} />
      <Route path="/login/retailer" element={<RetailerLogin />} />
      <Route path="/customer/signup" element={<CustomerSignup />} />
    </Routes>
  </Router>
);
