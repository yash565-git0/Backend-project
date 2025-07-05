import React from 'react';
import VideoCard from './VideoCard';
import { Video } from '../types';

interface MainContentProps {
  videos: Video[];
  onVideoSelect: (video: Video) => void;
}

const MainContent: React.FC<MainContentProps> = ({ videos, onVideoSelect }) => {
  const categories = ['All', 'Music', 'Gaming', 'Sports', 'News', 'Movies', 'Technology', 'Cooking', 'Travel'];

  return (
    <div className="bg-black min-h-screen">
      <div className="p-6">
        <div className="mb-6">
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  index === 0
                    ? 'bg-white text-black'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

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
  );
};

export default MainContent;