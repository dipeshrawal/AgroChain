// Contact.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './Contact.css';

const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="contact-page">
      <div className="hamburger-icon" onClick={toggleSidebar}>
        &#9776; {/* Hamburger icon */}
      </div>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className="contact-container">
        <h1>Contact Us</h1>
        <p>
          If you have any questions or inquiries, feel free to reach out to us using the information below.
        </p>
        <ul>
          <li><strong>Email:</strong> agricultureschain@gmail.com</li>
          <li><strong>Phone:</strong> +977 9863087926</li>
          <li><strong>Address:</strong> Ratopul, Kathmandu, Nepal</li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;
