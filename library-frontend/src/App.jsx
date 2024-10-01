import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BookList from './components/BookList';
import AdminDashboard from './components/AdminDashboard';
import TransactionHistory from './components/TransactionHistory';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';

const App = () => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Set auth state if token exists in localStorage
      setAuth({ token, role: 'admin' });
    }
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/admin/login" element={<AdminLogin setAuth={setAuth} />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route
              path="/admin/dashboard"
              element={auth && auth.role === 'admin' ? <AdminDashboard /> : <Navigate to="/admin/login" />}
            />
            <Route
              path="/admin/transactions"
              element={auth && auth.role === 'admin' ? <TransactionHistory /> : <Navigate to="/admin/login" />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
