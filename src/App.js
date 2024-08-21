import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
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
import MyOrdersPage from './components/myOrders/MyOrdersPage';
import Error500Page from './components/ServerError/Error500Page';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('https://mysite-vqs1.onrender.com/sessions', {
          method: 'GET',
          credentials: 'include'  // Ensure cookies are sent with the request
        });
        
        if (!response.ok) {
          console.error("Response not OK:", response.status);
          setUser(null);
          return;
        }
    
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setUser(data.user || null);
        } else {
          const errorText = await response.text();  // Read error text if response is not JSON
          console.error("Unexpected response type:", contentType, errorText);
          setUser(null);
        }
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
        <Route path="/imports" element={<ImportPage user={user} />} />
        <Route path="/exports" element={<ExportPage user={user} />} />
        <Route path="/contact" element={<div>Contact Page</div>} />
        <Route path="/login" element={<Login updateUser={updateUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/order_received" element={<Feedback />} />
        <Route path="/quotation" element={<QuotationPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<Error404 />} />
        <Route path='/my_orders' element={<MyOrdersPage/>}/>
        <Route path="/error500" element={<Error500Page />} />
      </Routes>
    </>
  );
};

export default App;
