import React, { useState } from 'react';
import { Play, Clock, Eye, CheckCircle } from 'lucide-react';
import { Video } from '../types';

interface VideoCardProps {
  video: Video;
  onClick: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="cursor-pointer transition-transform duration-300 hover:scale-105 bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative group">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-48 object-cover"
        />
        
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
          {isHovered && (
            <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300">
              <Play className="w-12 h-12 text-white" fill="white" />
            </div>
          )}
        </div>

        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>

        <div className="absolute top-2 left-2 flex items-center space-x-1">
          <Eye className="w-4 h-4 text-white" />
          <span className="text-white text-xs">{video.views}</span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start space-x-3">
          <img
            src={video.channel.avatar}
            alt={video.channel.name}
            className="w-10 h-10 rounded-full"
          />
          
          <div className="flex-1">
            <h3 className="font-semibold text-sm leading-tight line-clamp-2 text-white">
              {video.title}
            </h3>
            
            <div className="flex items-center space-x-1 mt-1">
              <span className="text-sm text-gray-400">
                {video.channel.name}
              </span>
              {video.channel.verified && (
                <CheckCircle className="w-4 h-4 text-blue-500" />
              )}
            </div>
            
            <div className="text-xs mt-1 text-gray-400">
              {video.views} views • {video.uploadTime}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;