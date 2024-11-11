// CustomerLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './CustomerLogin.css';

function CustomerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // for navigation
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleRegister = () => {
    navigate('/customer/signup'); // navigate to Signup page
  };

  return (
    <div className="login-container">
      <div className="hamburger-icon" onClick={toggleSidebar}>
        &#9776; {/* Hamburger icon */}
      </div>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className="login-box">
        <h2>Customer Login</h2>
        <form onSubmit={handleSubmit}>
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
          <button type="button" className="register-button" onClick={handleRegister}>Register</button>
        </form>
      </div>
    </div>
  );
}

export default CustomerLogin;
