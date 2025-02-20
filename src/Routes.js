import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Tarefas from './pages/Tarefas';
import Header from './components/Header/Index';
import Footer from './components/Footer/Index';

// Mock authentication function (replace with real logic)
const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

// PrivateRoute component to protect private routes
const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tarefas/:projetoid" element={<Tarefas />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRoutes;
