// src/pages/UserHome.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const UserHome = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Library</h1>
      <div className="flex flex-col space-y-4">
        <Link to="/books" className="text-blue-500">Browse Books</Link>
        <Link to="/profile" className="text-blue-500">My Profile</Link>
        <Link to="/transactions" className="text-blue-500">Transaction History</Link>
      </div>
    </div>
  );
};

export default UserHome;
