// src/pages/AdminHome.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AdminHome = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="flex flex-col space-y-4">
        <Link to="/admin/dashboard" className="text-blue-500">Manage Books</Link>
        <Link to="/admin/transactions" className="text-blue-500">View Transactions</Link>
      </div>
    </div>
  );
};

export default AdminHome;
