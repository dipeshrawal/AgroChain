// Home.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './Home.css';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="home">
      <div className="hamburger-icon" onClick={toggleSidebar}>
        &#9776; {/* Hamburger icon */}
      </div>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className="content">
        <h1>Welcome to Our Agriculture Platform</h1>
        <p>Explore resources and tools to grow your business.</p>
      </div>
    </div>
  );
};

export default Home;
