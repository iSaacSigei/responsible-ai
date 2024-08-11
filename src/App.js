import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import './App.css';
import ImportPage from './components/ImportPage/ImportPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Error404 from './components/ErrorPage/Error404';
const App = () => (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Add other routes as needed */}
      <Route path="/about" element={<div>About Page</div>} />
      <Route path="/imports" element={<ImportPage/>} />
      <Route path="/resources" element={<div>Resources Page</div>} />
      <Route path="/contact" element={<div>Contact Page</div>} />
        {/* Catch all undefined routes and render Error404 component */}
        <Route path='*' element={<Error404 />} />
    </Routes>
);

export default App;
