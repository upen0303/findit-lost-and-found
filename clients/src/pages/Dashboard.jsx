import React, { useState, useEffect } from 'react';
import { itemsAPI } from '../services/api';
import { Eye, MapPin, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const [lost, found] = await Promise.all([
        itemsAPI.getLostItems(),
        itemsAPI.getFoundItems()
      ]);
      setLostItems(lost);
      setFoundItems(found);
    } catch (err) {
      console.error('Error fetching items:', err);
    } finally {
      setLoading(false);
    }
  };

  const displayItems = activeTab === 'lost' ? lostItems : activeTab === 'found' ? foundItems : [...lostItems, ...foundItems];

  const ItemCard = ({ item, type }) => (
    <Link to={`/item/${type}/${item._id}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer">
        <div className="h-48 bg-gray-200 overflow-hidden">
          {item.image ? (
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-900 text-lg">{item.title}</h3>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
              item.status === 'Lost' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}>
              {item.status}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{item.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{new Date(item.date).toLocaleDateString()}</span>
            </div>
            {item.user && (
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{item.user.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
          <p className="text-gray-600">Loading items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-sm md:text-base text-gray-600">Browse lost and found items</p>
      </div>

      {/* Tabs - Horizontal scroll on mobile */}
      <div className="flex gap-2 md:gap-4 mb-6 md:mb-8 border-b border-gray-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 md:px-6 py-3 font-semibold whitespace-nowrap transition text-sm md:text-base ${
            activeTab === 'all' ? 'text-primary border-b-2 border-primary' : 'text-gray-600'
          }`}
        >
          All ({lostItems.length + foundItems.length})
        </button>
        <button
          onClick={() => setActiveTab('lost')}
          className={`px-3 md:px-6 py-3 font-semibold whitespace-nowrap transition text-sm md:text-base ${
            activeTab === 'lost' ? 'text-primary border-b-2 border-primary' : 'text-gray-600'
          }`}
        >
          Lost ({lostItems.length})
        </button>
        <button
          onClick={() => setActiveTab('found')}
          className={`px-3 md:px-6 py-3 font-semibold whitespace-nowrap transition text-sm md:text-base ${
            activeTab === 'found' ? 'text-primary border-b-2 border-primary' : 'text-gray-600'
          }`}
        >
          Found ({foundItems.length})
        </button>
      </div>

      {/* Items Grid */}
      {displayItems.length === 0 ? (
        <div className="text-center py-12">
          <Eye size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">No items found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {displayItems.map(item => (
            <ItemCard
              key={item._id}
              item={item}
              type={lostItems.find(i => i._id === item._id) ? 'lost' : 'found'}
            />
          ))}
        </div>
      )}
    </div>
  );
}
