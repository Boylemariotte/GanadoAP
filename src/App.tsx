import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Marketplace from './components/Marketplace';
import ProductDetail from './components/ProductDetail';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import SalesRecords from './components/SalesRecords';
import './App.css';

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <Routes>
      <Route path="/" element={<Marketplace />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/sales-records" element={<SalesRecords />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
