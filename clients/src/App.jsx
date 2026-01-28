import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesSection from './components/FeaturesSection';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import PostLostItem from './pages/PostLostItem';
import PostFoundItem from './pages/PostFoundItem';
import ItemDetail from './pages/ItemDetail';

import './index.css';

// Protected Route Component
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

// Public Route (redirect to dashboard if already logged in)
function PublicRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? <Navigate to="/dashboard" /> : children;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

        {/* Landing Page */}
        <Route path="/" element={
          <div className="flex bg-light-100 min-h-screen">
            <Sidebar />
            <div className="flex-1 ml-64 pt-16">
              <Navbar />
              <div className="p-8">
                <Hero />
                <FeaturesSection />
              </div>
            </div>
          </div>
        } />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <div className="flex bg-light-100 min-h-screen">
              <Sidebar />
              <div className="flex-1 ml-64 pt-16">
                <Navbar />
                <Dashboard />
              </div>
            </div>
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute>
            <div className="flex bg-light-100 min-h-screen">
              <Sidebar />
              <div className="flex-1 ml-64 pt-16">
                <Navbar />
                <Profile />
              </div>
            </div>
          </ProtectedRoute>
        } />

        <Route path="/post-lost" element={
          <ProtectedRoute>
            <div className="flex bg-light-100 min-h-screen">
              <Sidebar />
              <div className="flex-1 ml-64 pt-16">
                <Navbar />
                <PostLostItem />
              </div>
            </div>
          </ProtectedRoute>
        } />

        <Route path="/post-found" element={
          <ProtectedRoute>
            <div className="flex bg-light-100 min-h-screen">
              <Sidebar />
              <div className="flex-1 ml-64 pt-16">
                <Navbar />
                <PostFoundItem />
              </div>
            </div>
          </ProtectedRoute>
        } />

        <Route path="/item/:type/:id" element={
          <ProtectedRoute>
            <div className="flex bg-light-100 min-h-screen">
              <Sidebar />
              <div className="flex-1 ml-64 pt-16">
                <Navbar />
                <ItemDetail />
              </div>
            </div>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}
