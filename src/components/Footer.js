import React from 'react';

const Footer = () => {
  return (
    <footer className="footer-container">
      <p>&copy; {new Date().getFullYear()} URL Shortener. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
