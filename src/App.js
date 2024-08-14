import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
const App = () => (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Add other routes as needed */}
      <Route path="/about" element={<div>About Page</div>} />
      <Route path="/imports" element={<ImportPage/>} />
      <Route path="/exports" element={<ExportPage/>} />
      <Route path="/contact" element={<div>Contact Page</div>} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path="/feedback" element={<Feedback/>}/>
      <Route path='/quotation' element={<QuotationPage/>}/>
      <Route path='/checkout' element={<Checkout/>}/>
        {/* Catch all undefined routes and render Error404 component */}
        <Route path='*' element={<Error404 />} />
    </Routes>
);

export default App;
