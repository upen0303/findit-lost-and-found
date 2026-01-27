import React from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesSection from './components/FeaturesSection';
import './index.css';

export default function App() {
  return (
    <div className="flex bg-light-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 pt-16">
        {/* Navbar */}
        <Navbar />

        {/* Content Area */}
        <div className="p-8">
          {/* Hero Section */}
          <Hero />

          {/* Features Section */}
          <FeaturesSection />
        </div>
      </div>
    </div>
  );
}
