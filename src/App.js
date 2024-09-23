import React, { useState, useEffect, Suspense, lazy } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { HelmetProvider } from 'react-helmet-async'; // Helmet for SEO
import Navbar from './components/navbar/Navbar';
import Error404 from './components/ErrorPage/Error404';
// Lazy Loading Components
const Home = lazy(() => import('./components/home/Home'));
const ImportPage = lazy(() => import('./components/ImportPage/ImportPage'));
const ExportPage = lazy(() => import('./components/ExportPage/ExportPage'));
const Login = lazy(() => import('./components/Login/Login'));
const Signup = lazy(() => import('./components/Signup/Signup'));
const Feedback = lazy(() => import('./components/FeedbackPage/Feedback'));
const QuotationPage = lazy(() => import('./components/QoutationPage/QuotationPage'));
const Checkout = lazy(() => import('./components/CheckoutPage/Checkout'));
const MyOrdersPage = lazy(() => import('./components/myOrders/MyOrdersPage'));
const Error500Page = lazy(() => import('./components/ServerError/Error500Page'));
const AdminDashboard = lazy(() => import('./components/Admin/AdminDashboard'));
const Tenders = lazy(() => import('./components/Tenders'));
const AboutUs = lazy(() => import('./components/About/AboutUs'));
const ServicePage = lazy(() => import('./components/ServiceComponent/Service'));
const Jobs = lazy(() => import('./components/JobOpeningsPage/JobOpeningsPage'));
const ContactPage = lazy(() => import('./components/ContactPage/ContactPage'));
const JobDetailsPage = lazy(() => import('./components/JobDetailsPage/JobDetailsPage'));
const SpecialOffers = lazy(() => import('./components/SpecialOffers/SpecialOffers'));
const Events = lazy(() => import('./components/Events/Events'));

const App = () => {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const navigate = useNavigate();
  const [reloadPage, setReloadPage] = useState(false);

  useEffect(() => {
    // Fetch user details
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setUser(null);
          return;
        }

        const response = await fetch('https://mysite-jr5y.onrender.com/user', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
          console.error("Response not OK:", response.status);
          localStorage.removeItem('token');
          setUser(null);
          return;
        }

        const data = await response.json();
        setUser(data.user || null);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchCounts = async () => {
        try {
          const token = localStorage.getItem('token');
          const headers = { 'Authorization': `Bearer ${token}` };

          const [exportOrders, importOrders, quotations] = await Promise.all([
            fetch('https://mysite-jr5y.onrender.com/export_orders', { headers }),
            fetch('https://mysite-jr5y.onrender.com/import_orders', { headers }),
            fetch('https://mysite-jr5y.onrender.com/quotations', { headers }),
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
  }, [user, reloadPage]);

  const handleLogout = async () => {
    try {
      await fetch('https://mysite-jr5y.onrender.com/logout', { method: 'DELETE' });
      localStorage.removeItem('token');
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const updateUser = async () => {
    try {
      const response = await fetch('https://mysite-jr5y.onrender.com/user', {
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
      <HelmetProvider>
        {/* SEO Meta Tags */}


        {/* Navbar */}
        <Navbar user={user} onLogout={handleLogout} cartCount={cartCount} messageCount={messageCount} />

        {/* Routes */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/imports" element={<ImportPage user={user} setReloadPage={setReloadPage} />} />
            <Route path="/exports" element={<ExportPage user={user} setReloadPage={setReloadPage} />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<Login updateUser={updateUser} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/order_received" element={<Feedback />} />
            <Route path="/quotation" element={<QuotationPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<Error404 />} />
            <Route path='/my_orders' element={<MyOrdersPage />} />
            <Route path="/error500" element={<Error500Page />} />
            <Route path='/tenders' element={<Tenders />} />
            <Route path='/services' element={<ServicePage />} />
            <Route path='/admin_panel' element={<AdminDashboard />} />
            <Route path='/job_openings' element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetailsPage />} />
            <Route path='/special-offers' element={<SpecialOffers/>}/>
            <Route path='/events' element={<Events/>}/>
          </Routes>
        </Suspense>
      </HelmetProvider>
    </>
  );
};

export default App;
