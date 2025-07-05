import React from 'react';
import VideoCard from './VideoCard';
import { Video } from '../types';
import { Bell, CheckCircle } from 'lucide-react';

interface SubscriptionsPageProps {
  videos: Video[];
  onVideoSelect: (video: Video) => void;
}

const SubscriptionsPage: React.FC<SubscriptionsPageProps> = ({ videos, onVideoSelect }) => {
  const subscribedChannels = [
    {
      name: 'Nature Explorer',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      subscribers: '1.2M',
      verified: true,
      latestVideo: 'Epic Mountain Adventure | 4K Nature Documentary',
      uploadTime: '2 days ago'
    },
    {
      name: 'Chef\'s Kitchen',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      subscribers: '890K',
      verified: true,
      latestVideo: 'Cooking the Perfect Pasta | Italian Masterclass',
      uploadTime: '5 days ago'
    },
    {
      name: 'Design Studio',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100',
      subscribers: '345K',
      verified: false,
      latestVideo: 'Modern Architecture Tour | Glass House Design',
      uploadTime: '1 week ago'
    },
    {
      name: 'Space Channel',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      subscribers: '2.1M',
      verified: true,
      latestVideo: 'Space Exploration | Mars Mission Documentary',
      uploadTime: '3 days ago'
    }
  ];

  return (
    <div className="bg-black min-h-screen">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-white mb-8">Subscriptions</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Your Channels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {subscribedChannels.map((channel) => (
              <div key={channel.name} className="bg-gray-900 rounded-xl p-4 hover:bg-gray-800 transition-colors">
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={channel.avatar}
                    alt={channel.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-1">
                      <h3 className="font-semibold text-white text-sm">{channel.name}</h3>
                      {channel.verified && (
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                    <p className="text-xs text-gray-400">{channel.subscribers} subscribers</p>
                  </div>
                </div>
                <div className="mb-3">
                  <p className="text-sm text-gray-300 line-clamp-2">{channel.latestVideo}</p>
                  <p className="text-xs text-gray-400 mt-1">{channel.uploadTime}</p>
                </div>
                <button className="w-full flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors">
                  <Bell className="w-4 h-4" />
                  <span className="text-sm">Subscribed</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Latest from your subscriptions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onClick={() => onVideoSelect(video)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsPage;