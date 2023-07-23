import React from 'react';
import { DiEnvato } from 'react-icons/di';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Header = () => {
  return (
    <header className="header-container">
      <h1>
        <DiEnvato size={40} />
        <Link to="/create-url" className='ul-container'>URL Shortener</Link>
      </h1>
      <Navbar />
    </header>
  );
};

export default Header;
