// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Library Management System</h1>
        <nav>
          <Link to="/" className="mr-4 text-white">Home</Link>
          <Link to="/admin/login" className="mr-4 text-blue-400 hover:text-white">Admin Login</Link>
          <Link to="/admin/register" className="mr-4 text-blue-400 hover:text-white">Admin Register</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
