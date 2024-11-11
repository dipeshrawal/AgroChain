// About.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './About.css';

const About = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="about-page">
      <div className="hamburger-icon " onClick={toggleSidebar}>
        &#9776; {/* Hamburger icon */}
      </div>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className="about-container">
        <h1>About Us</h1>
        <p>
          Welcome to our agriculture platform. We are dedicated to supporting farmers and agricultural professionals with resources, tools, and insights to grow and sustain their businesses.
        </p>
        <p>
          Our mission is to improve the tracability and the transarency in the agriculture supply chain.
        </p>
      </div>
    </div>
  );
};

export default About;
