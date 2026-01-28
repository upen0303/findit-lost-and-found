import React, { useState } from 'react';
import { LayoutDashboard, User, Package, Plus, LogOut, Shield, X, Menu } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user?.role === 'admin';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
  ];

  const adminItems = [
    { id: 'manage', label: 'Manage Items', icon: Shield, path: '/admin' },
  ];

  const postItems = [
    { id: 'lost', label: 'Post Lost Item', icon: Plus, path: '/post-lost' },
    { id: 'found', label: 'Post Found Item', icon: Plus, path: '/post-found' },
  ];

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-dark-700">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleNavigation('/dashboard')}
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <h1 className="text-white text-2xl font-bold">Findit</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-8 px-4 overflow-y-auto">
        <p className="text-light-200 text-xs font-semibold px-4 mb-4 uppercase">Main</p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <div
              key={item.id}
              onClick={() => {
                setActiveItem(item.id);
                handleNavigation(item.path);
              }}
              className="relative mb-2 cursor-pointer group"
            >
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 hover:bg-dark-700">
                <Icon size={20} className={isActive ? 'text-primary' : 'text-light-200'} />
                <span className={`text-lg font-medium transition-colors ${isActive ? 'text-primary' : 'text-light-200'}`}>
                  {item.label}
                </span>
              </div>
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"></div>
              )}
            </div>
          );
        })}

        {/* Admin Section - Only show for admins */}
        {isAdmin && (
          <>
            <p className="text-light-200 text-xs font-semibold px-4 mb-4 mt-8 uppercase">Admin</p>
            {adminItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setActiveItem(item.id);
                    handleNavigation(item.path);
                  }}
                  className="relative mb-2 cursor-pointer group"
                >
                  <div className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 hover:bg-dark-700">
                    <Icon size={20} className={isActive ? 'text-red-400' : 'text-light-200'} />
                    <span className={`text-lg font-medium transition-colors ${isActive ? 'text-red-400' : 'text-light-200'}`}>
                      {item.label}
                    </span>
                  </div>
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-400 rounded-r-full"></div>
                  )}
                </div>
              );
            })}
          </>
        )}

        {/* Post Items Section */}
        <p className="text-light-200 text-xs font-semibold px-4 mb-4 mt-8 uppercase">Post</p>
        {postItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className="relative mb-2 cursor-pointer group"
            >
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 hover:bg-dark-700 text-light-200 hover:text-primary">
                <Icon size={20} />
                <span className="text-lg font-medium">{item.label}</span>
              </div>
            </div>
          );
        })}
      </nav>

      {/* User Card */}
      <div className="px-4 pb-6 border-t border-dark-700 pt-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full"></div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm truncate">
              {user.name || 'User'}
            </p>
            <p className="text-light-200 text-xs truncate">
              {user.email || 'email@example.com'}
            </p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-light-200 hover:text-primary hover:bg-dark-700 transition-colors text-sm rounded-lg"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 bg-gradient-to-b from-dark-800 to-dark-900 fixed left-0 top-0 h-screen flex-col">
        <SidebarContent />
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-primary rounded-lg text-white"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Mobile Menu */}
          <div className="md:hidden fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-dark-800 to-dark-900 z-40 flex flex-col overflow-y-auto">
            <SidebarContent />
          </div>
        </>
      )}
    </>
  );
}
