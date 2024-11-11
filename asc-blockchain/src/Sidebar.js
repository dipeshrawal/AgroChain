// Sidebar.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const [isLoginHovered, setIsLoginHovered] = useState(false);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleSidebar(); // Close sidebar
      }
    };

    // Only add event listener if sidebar is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Cleanup event listener on component unmount
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, toggleSidebar]);

  const handleNavigation = (path) => {
    navigate(path);
    toggleSidebar(); // Close sidebar after navigation
  };

  return (
    <div ref={sidebarRef} className={`sidebar ${isOpen ? 'open' : ''}`}>
      <ul>
        <li onClick={() => handleNavigation('/')}>Home</li>
        <li onClick={() => handleNavigation('/about')}>About Us</li>
        <li onClick={() => handleNavigation('/contact')}>Contact Us</li>

        {/* Login with dropdown on hover */}
        <li
          className="login-dropdown"
          onMouseEnter={() => setIsLoginHovered(true)}
          onMouseLeave={() => setIsLoginHovered(false)}
        >
          Login
          {isLoginHovered && (
            <div className="login-options">
              <button onClick={() => handleNavigation('/login/farmer')}>Farmer Login</button>
              <button onClick={() => handleNavigation('/login/customer')}>Customer Login</button>
              <button onClick={() => handleNavigation('/login/distributor')}>Distributor Login</button>
              <button onClick={() => handleNavigation('/login/retailer')}>Retailer Login</button>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
