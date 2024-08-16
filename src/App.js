import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/home/Home';
import './App.css';
import ImportPage from './components/ImportPage/ImportPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Error404 from './components/ErrorPage/Error404';
import ExportPage from './components/ExportPage/ExportPage';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Feedback from './components/FeedbackPage/Feedback';
import QuotationPage from './components/QoutationPage/QuotationPage';
import Checkout from './components/CheckoutPage/Checkout';
import Navbar from './components/navbar/Navbar';

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/sessions');
        const data = await response.json();
        setUser(data.user || null);
      } catch (error) {
        console.error("Error fetching the session:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/logout', { method: 'DELETE' });
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const updateUser = async () => {
    try {
      const response = await fetch('/sessions');
      const data = await response.json();
      setUser(data.user || null);
    } catch (error) {
      console.error("Error fetching the session:", error);
      setUser(null);
    }
  };

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<div>About Page</div>} />
        <Route path="/imports" element={<ImportPage />} />
        <Route path="/exports" element={<ExportPage />} />
        <Route path="/contact" element={<div>Contact Page</div>} />
        <Route path="/login" element={<Login updateUser={updateUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/quotation" element={<QuotationPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default App;
