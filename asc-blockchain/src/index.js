// index.js main
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Login from './Login';
import './index.css';
import FarmerDashboard from './Pages/Farmer/FarmerDashboard';
import DistributorDashboard from './Pages/Distributor/DistributorDashboard';
import ProductList from './Pages/Farmer/ProductList';
import Register from './Register';
import UserDashboard from './Pages/Customer/UserDashboard';
import FarmerData from './Components/FarmerData';
import RetailerData from './Components/RetailerData';
import DistributorProductInfo from './Pages/Distributor/DistributorProductInfo';
import DistributorFarmerInfo from './Pages/Distributor/DistributorFarmerInfo';
import DistributorRetailerInfo from './Pages/Distributor/DistributorRetailerInfo';
import AddProduct from './Pages/Farmer/AddProduct';
import RetailerDashboard from './Pages/Retailer/RetailerDashboard';
import RetailerFarmerdata from './Pages/Retailer/RetailerFarmerdata';
import RetailerProductInfo from './Pages/Retailer/RetailerProductInfo';
import FarmerProfile from "./Pages/Farmer/FarmerProfile";
// import CustomerProfile from './Pages/Customer/CustomerProfile'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/distributordashboard" element={<DistributorDashboard />} />
      <Route path="/productlist" element={<ProductList />} />
      <Route path="/farmerdashboard" element={<FarmerDashboard />} />      
      <Route path="/register" element={<Register />} />      
      <Route path="/userdashboard" element={<UserDashboard />} />      
      <Route path="/farmerdata" element={<FarmerData />} />      
      <Route path="/retailerdata" element={<RetailerData />} />      
      <Route path="/distributorproductinfo" element={<DistributorProductInfo />} />      
      <Route path="/distributorfarmerinfo" element={<DistributorFarmerInfo />} />      
      <Route path="/distributorretailerinfo" element={<DistributorRetailerInfo />} />      
      <Route path="/addfarmerproducts" element={<AddProduct />} />      
      <Route path="/retailerdashboard" element={<RetailerDashboard />} />      
      <Route path="/retailerfarmerdata" element={<RetailerFarmerdata />} />      
      <Route path="/retailerproductinfo" element={<RetailerProductInfo />} />      
      <Route path="/farmerprofile" element={<FarmerProfile />} />      
      {/* <Route path="/customerprofile" element={<CustomerProfile />} />       */}

    </Routes>
  </Router>
);
