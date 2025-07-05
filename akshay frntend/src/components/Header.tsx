import React, { useState } from 'react';
import { Search, Menu, Bell, User, Settings, Home } from 'lucide-react';

interface HeaderProps {
  onHomeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHomeClick }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-black border-b border-gray-800 px-4 py-3 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Menu className="w-5 h-5 text-gray-300" />
          </button>
          
          <button 
            onClick={onHomeClick}
            className="flex items-center space-x-2 hover:bg-gray-800 rounded-lg p-2 transition-colors"
          >
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">VT</span>
            </div>
            <span className="text-white text-xl font-semibold">vi-TUBE</span>
          </button>
        </div>

        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-l-full py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-red-600"
            />
            <button className="absolute right-0 top-0 h-full px-6 bg-gray-800 border border-gray-700 rounded-r-full hover:bg-gray-700 transition-colors">
              <Search className="w-5 h-5 text-gray-300" />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={onHomeClick}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            title="Home"
          >
            <Home className="w-5 h-5 text-gray-300" />
          </button>
          
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-gray-300" />
          </button>
          
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors relative">
            <Bell className="w-5 h-5 text-gray-300" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
          </button>
          
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <User className="w-5 h-5 text-gray-300" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;