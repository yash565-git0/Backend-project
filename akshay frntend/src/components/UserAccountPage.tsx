import React, { useState } from 'react';
import { User, Settings, Bell, Shield, HelpCircle, LogOut, Edit, Camera, Video, Eye, ThumbsUp, Clock } from 'lucide-react';

const UserAccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'videos' | 'settings'>('profile');

  const userStats = [
    { label: 'Videos', value: '24', icon: Video },
    { label: 'Views', value: '1.2M', icon: Eye },
    { label: 'Likes', value: '45K', icon: ThumbsUp },
    { label: 'Watch Time', value: '2.3K hrs', icon: Clock },
  ];

  const userVideos = [
    {
      id: '1',
      title: 'My First Video Upload',
      thumbnail: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=400',
      views: '12K',
      uploadTime: '2 weeks ago',
      duration: '5:23'
    },
    {
      id: '2',
      title: 'Travel Vlog - Mountain Adventure',
      thumbnail: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400',
      views: '8.5K',
      uploadTime: '1 month ago',
      duration: '12:45'
    },
    {
      id: '3',
      title: 'Cooking Tutorial - Homemade Pizza',
      thumbnail: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=400',
      views: '15K',
      uploadTime: '2 months ago',
      duration: '8:12'
    }
  ];

  return (
    <div className="bg-black min-h-screen">
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="bg-gray-900 rounded-xl p-6 mb-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=200"
                  alt="Profile"
                  className="w-24 h-24 rounded-full"
                />
                <button className="absolute bottom-0 right-0 bg-red-600 hover:bg-red-700 p-2 rounded-full transition-colors">
                  <Camera className="w-4 h-4 text-white" />
                </button>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-2xl font-bold text-white">John Doe</h1>
                  <button className="text-gray-400 hover:text-white">
                    <Edit className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-gray-400 mb-2">@johndoe • Joined March 2023</p>
                <p className="text-gray-300">Content creator passionate about technology, travel, and cooking.</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">1.2M</div>
                <div className="text-gray-400">Total Views</div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 mb-6 bg-gray-900 rounded-lg p-1">
            {[
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'videos', label: 'My Videos', icon: Video },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors flex-1 justify-center ${
                  activeTab === tab.id
                    ? 'bg-red-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {userStats.map((stat) => (
                  <div key={stat.label} className="bg-gray-900 rounded-xl p-4 text-center">
                    <stat.icon className="w-8 h-8 text-red-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-900 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                    <ThumbsUp className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-white">Liked "Epic Mountain Adventure"</p>
                      <p className="text-gray-400 text-sm">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                    <Video className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-white">Uploaded "My First Video Upload"</p>
                      <p className="text-gray-400 text-sm">2 weeks ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                    <Bell className="w-5 h-5 text-yellow-500" />
                    <div>
                      <p className="text-white">Subscribed to Nature Explorer</p>
                      <p className="text-gray-400 text-sm">1 month ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'videos' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">My Videos ({userVideos.length})</h2>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Upload Video
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userVideos.map((video) => (
                  <div key={video.id} className="bg-gray-900 rounded-xl overflow-hidden hover:bg-gray-800 transition-colors">
                    <div className="relative">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-white mb-2 line-clamp-2">{video.title}</h3>
                      <div className="text-sm text-gray-400">
                        {video.views} views • {video.uploadTime}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-gray-900 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Account Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <Bell className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-white">Notifications</p>
                        <p className="text-gray-400 text-sm">Manage your notification preferences</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-white">
                      <Settings className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-white">Privacy & Security</p>
                        <p className="text-gray-400 text-sm">Control your privacy settings</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-white">
                      <Settings className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <HelpCircle className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-white">Help & Support</p>
                        <p className="text-gray-400 text-sm">Get help and contact support</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-white">
                      <Settings className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Danger Zone</h2>
                <button className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAccountPage;