import React from 'react';
import { LayoutDashboard, User, Package, LogOut } from 'lucide-react';

export default function Sidebar() {
  const [activeItem, setActiveItem] = React.useState('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'manage', label: 'Manage Items', icon: Package },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-dark-800 to-dark-900 fixed left-0 top-0 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-dark-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <h1 className="text-white text-2xl font-bold">Findit</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-8 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          return (
            <div
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className="relative mb-6 cursor-pointer group"
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
      </nav>

      {/* User Card */}
      <div className="px-4 pb-6 border-t border-dark-700 pt-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full"></div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm">Amar Patel</p>
            <p className="text-light-200 text-xs truncate">amar@example.com</p>
          </div>
        </div>
        <button className="w-full mt-4 flex items-center gap-2 px-3 py-2 text-light-200 hover:text-white transition-colors text-sm">
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
