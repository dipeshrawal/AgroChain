// index.js main
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
import FarmerSignup from './FarmerSignup';
import FarmerDashboard from './Pages/Farmer/FarmerDashboard';
import ProductList from './Pages/Farmer/ProductList';
import DistributorDashboard from './Pages/Distributor/DistributorDashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<FarmerDashboard />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login/farmer" element={<FarmerLogin />} />
      <Route path="/login/customer" element={<CustomerLogin />} />
      <Route path="/login/distributor" element={<DistributorLogin />} />
      <Route path="/login/retailer" element={<RetailerLogin />} />
      <Route path="/customer/signup" element={<CustomerSignup />} />
      <Route path="/farmer/signup" element={<FarmerSignup />} />
      
      <Route path="/productlist" element={<ProductList />} />
      <Route path="/distributordashboard" element={<DistributorDashboard />} />
    </Routes>
  </Router>
);
