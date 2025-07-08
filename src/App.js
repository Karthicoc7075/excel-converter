import React from 'react';
import './App.css';
import { Routes,Route,Navigate } from "react-router-dom";
import Home from "./pages/home/home";
import Vendor from "./pages/vendor/vendor";
import Salary from './pages/salary/salary';

function App() {


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/vendor" element={<Vendor />} />
      <Route path="/salary" element={<Salary />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;

