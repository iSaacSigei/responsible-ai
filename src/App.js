import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/home/Home';
import './App.css';
import ImportPage from './components/ImportPage/ImportPage';
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
// import AdminLogin from "./components/Admin/Login";
import AdminDashboard from './components/Admin/AdminDashboard';
import Tenders from './components/Tenders'
import AboutUs from './components/About/AboutUs';
import ServicePage from './components/ServiceComponent/Service';
import Jobs from './components/JobOpeningsPage/JobOpeningsPage';
import ContactPage from './components/ContactPage/ContactPage';
const App = () => {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setUser(null);
          return;
        }

        const response = await fetch('http://127.0.0.1:3000/user', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
          console.error("Response not OK:", response.status);
          localStorage.removeItem('token'); // Remove invalid token
          setUser(null);
          return;
        }

        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setUser(data.user || null);
        } else {
          const errorText = await response.text();
          console.error("Unexpected response type:", contentType, errorText);
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    if (user) {
      const fetchCounts = async () => {
        try {
          const token = localStorage.getItem('token');
          const headers = { 'Authorization': `Bearer ${token}` };

          const [exportOrders, importOrders, quotations] = await Promise.all([
            fetch('http://127.0.0.1:3000/export_orders', { headers }),
            fetch('http://127.0.0.1:3000/import_orders', { headers }),
            fetch('http://127.0.0.1:3000/quotations', { headers }),
          ]);

          if (!exportOrders.ok || !importOrders.ok || !quotations.ok) {
            console.error("Error fetching counts");
            return;
          }

          const exportData = await exportOrders.json();
          const importData = await importOrders.json();
          const quotationsData = await quotations.json();

          setCartCount(exportData.length + importData.length);
          setMessageCount(quotationsData.length);
        } catch (error) {
          console.error("Error fetching counts:", error);
        }
      };

      fetchCounts();
    }
  }, [user]); // Runs only when the user state changes and is not null

  const handleLogout = async () => {
    try {
      await fetch('http://127.0.0.1:3000/logout', { method: 'DELETE' });
      localStorage.removeItem('token');
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const updateUser = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/user', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (!response.ok) {
        console.error("Response not OK:", response.status);
        setUser(null);
        return;
      }
      const data = await response.json();
      setUser(data.user || null);
    } catch (error) {
      console.error("Error updating user:", error);
      setUser(null);
    }
  };

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} cartCount={cartCount} messageCount={messageCount} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/imports" element={<ImportPage user={user} />} />
        <Route path="/exports" element={<ExportPage user={user} />} />
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/login" element={<Login updateUser={updateUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/order_received" element={<Feedback />} />
        <Route path="/quotation" element={<QuotationPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<Error404 />} />
        <Route path='/my_orders' element={<MyOrdersPage />} />
        <Route path="/error500" element={<Error500Page />} />
        <Route path='/tenders' element={<Tenders/>}/>
        <Route path='/services' element={<ServicePage/>}/>
        <Route path='/admin_panel' element={<AdminDashboard/>}/>
        <Route path='/job_openings' element={<Jobs/>}/>

      </Routes>
    </>
  );
};

export default App;
