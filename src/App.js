import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import './App.css';
// index.js or App.js
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Add other routes as needed */}
      <Route path="/about" element={<div>About Page</div>} />
      <Route path="/courses" element={<div>Courses Page</div>} />
      <Route path="/resources" element={<div>Resources Page</div>} />
      <Route path="/contact" element={<div>Contact Page</div>} />
    </Routes>
);

export default App;
