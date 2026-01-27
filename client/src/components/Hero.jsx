import React from 'react';
import { Search, MapPin } from 'lucide-react';

export default function Hero() {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <div className="bg-white rounded-2xl shadow-soft p-12 mb-8">
      <div className="flex items-center justify-between">
        {/* Left Content */}
        <div className="flex-1 max-w-2xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Track & Reclaim Your Lost Items!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Easily search for lost and found items or report lost items with FindIt.
          </p>

          {/* Search Bar and Button */}
          <div className="flex gap-3">
            <div className="flex-1 max-w-md flex items-center bg-white border-2 border-gray-300 rounded-xl px-4 py-3 hover:border-primary transition-colors">
              <Search size={20} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search lost & found items…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ml-3 flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
            <button className="bg-primary hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors">
              Search
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="flex items-center gap-2 bg-secondary hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              <span>📌</span>
              Post Lost Item
            </button>
            <button className="flex items-center gap-2 bg-primary hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              <span>✓</span>
              Post Found Item
            </button>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="flex-1 flex items-center justify-end">
          <div className="relative">
            <div className="w-80 h-64 bg-gradient-to-br from-blue-100 to-green-100 rounded-3xl flex items-center justify-center">
              <MapPin size={120} className="text-blue-400 opacity-40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
