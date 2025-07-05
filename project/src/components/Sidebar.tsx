import React from 'react';
import { Home, Compass, PlaySquare, Clock, ThumbsUp, Download, Settings, HelpCircle, Flag, User } from 'lucide-react';

interface SidebarProps {
  currentPage: 'home' | 'subscriptions' | 'account' | 'liked';
  onPageChange: (page: 'home' | 'subscriptions' | 'account' | 'liked') => void;
  likedVideosCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange, likedVideosCount }) => {
  const menuItems = [
    { icon: Home, label: 'Home', page: 'home' as const },
    { icon: Compass, label: 'Explore', page: 'home' as const },
    { icon: PlaySquare, label: 'Subscriptions', page: 'subscriptions' as const },
  ];

  const libraryItems = [
    { icon: Clock, label: 'Watch Later', page: null },
    { icon: ThumbsUp, label: 'Liked Videos', page: 'liked' as const, count: likedVideosCount },
    { icon: Download, label: 'Downloads', page: null },
  ];

  const subscriptions = [
    { name: 'Nature Explorer', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100', online: true },
    { name: 'Chef\'s Kitchen', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100', online: false },
    { name: 'Design Studio', avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100', online: true },
    { name: 'Space Channel', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100', online: true },
  ];

  return (
    <aside className="w-64 bg-black border-r border-gray-800 fixed left-0 top-16 h-full overflow-y-auto">
      <div className="p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => onPageChange(item.page)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                (currentPage === item.page) || (item.label === 'Home' && currentPage === 'home')
                  ? 'bg-red-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-6 pt-4 border-t border-gray-800">
          <h3 className="text-gray-400 text-sm font-medium mb-3">Library</h3>
          <nav className="space-y-2">
            {libraryItems.map((item) => (
              <button
                key={item.label}
                onClick={() => item.page && onPageChange(item.page)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                  item.page && currentPage === item.page
                    ? 'bg-red-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                } ${!item.page ? 'cursor-default' : ''}`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                {item.count !== undefined && item.count > 0 && (
                  <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-800">
          <h3 className="text-gray-400 text-sm font-medium mb-3">Subscriptions</h3>
          <nav className="space-y-2">
            {subscriptions.map((channel) => (
              <button
                key={channel.name}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <div className="relative">
                  <img
                    src={channel.avatar}
                    alt={channel.name}
                    className="w-6 h-6 rounded-full"
                  />
                  {channel.online && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
                  )}
                </div>
                <span className="text-sm font-medium truncate">{channel.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-800">
          <nav className="space-y-2">
            <button 
              onClick={() => onPageChange('account')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                currentPage === 'account'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <User className="w-5 h-5" />
              <span className="text-sm font-medium">Your Account</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
              <span className="text-sm font-medium">Settings</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
              <HelpCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Help</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
              <Flag className="w-5 h-5" />
              <span className="text-sm font-medium">Report</span>
            </button>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;