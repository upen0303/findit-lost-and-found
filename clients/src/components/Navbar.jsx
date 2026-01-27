import React from 'react';
import { Bell, Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <div className="fixed top-0 left-64 right-0 h-16 bg-white shadow-navShadow flex items-center justify-between px-8 z-40">
      {/* Left - Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">F</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Findit</h2>
      </div>

      {/* Right - Icons */}
      <div className="flex items-center gap-6">
        <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
          <Bell size={24} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-full hover:shadow-lg transition-shadow"></button>
        <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
          <Menu size={24} />
        </button>
      </div>
    </div>
  );
}
