import React, { useState, useEffect } from 'react';
import { Bell, Menu, LogOut } from 'lucide-react';
import { notificationsAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchNotifications();
      // Refresh notifications every 10 seconds
      const interval = setInterval(fetchNotifications, 10000);
      return () => clearInterval(interval);
    }
  }, [token]);

  const fetchNotifications = async () => {
    try {
      const res = await notificationsAPI.getNotifications(token);
      setNotifications(res.notifications || []);
      setUnreadCount(res.unreadCount || 0);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await notificationsAPI.markAsRead(token, id);
      fetchNotifications();
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="fixed top-0 left-64 right-0 h-16 bg-white shadow-navShadow flex items-center justify-between px-8 z-40">
      {/* Left - Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">F</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Findit</h2>
      </div>

      {/* Right - Icons */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Bell size={24} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
              </div>
              
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500">No notifications</div>
              ) : (
                notifications.map(notif => (
                  <div 
                    key={notif._id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                      !notif.isRead ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => handleMarkAsRead(notif._id)}
                  >
                    <p className="font-semibold text-gray-900 text-sm">{notif.title}</p>
                    <p className="text-gray-600 text-xs mt-1">{notif.message}</p>
                    <p className="text-gray-400 text-xs mt-2">
                      {new Date(notif.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Profile Avatar */}
        <button className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-full hover:shadow-lg transition-shadow"></button>

        {/* Logout */}
        <button 
          onClick={handleLogout}
          className="p-2 text-gray-600 hover:text-red-600 transition-colors"
          title="Logout"
        >
          <LogOut size={24} />
        </button>
      </div>
    </div>
  );
}
