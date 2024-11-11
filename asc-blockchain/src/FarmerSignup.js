// FarmerSignup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './FarmerSignup.css';

function FarmerSignup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [products, setProducts] = useState('');
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Farmer Signup Details:', { name, email, number, address, products, password });
    // Here you would typically send the form data to the backend
  };

  return (
    <div className="signup-container">
      <div className="hamburger-icon" onClick={toggleSidebar}>
        &#9776; {/* Hamburger icon */}
      </div>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className="signup-box">
        <h2>Farmer Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="number">Number</label>
            <input
              type="text"
              id="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="products">Products</label>
            <input
              type="text"
              id="products"
              value={products}
              onChange={(e) => setProducts(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signup-button">Signup</button>
        </form>
      </div>
    </div>
  );
}

export default FarmerSignup;
