import React from 'react';
import VideoCard from './VideoCard';
import { Video } from '../types';
import { ThumbsUp, Heart } from 'lucide-react';

interface LikedVideosPageProps {
  videos: Video[];
  onVideoSelect: (video: Video) => void;
}

const LikedVideosPage: React.FC<LikedVideosPageProps> = ({ videos, onVideoSelect }) => {
  return (
    <div className="bg-black min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
            <ThumbsUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Liked Videos</h1>
            <p className="text-gray-400">
              {videos.length} {videos.length === 1 ? 'video' : 'videos'} you've liked
            </p>
          </div>
        </div>

        {videos.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-gray-600" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">No liked videos yet</h2>
            <p className="text-gray-400 mb-6">
              Videos you like will appear here. Start exploring and like videos you enjoy!
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Discover Videos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
              <div key={video.id} className="relative">
                <VideoCard
                  video={video}
                  onClick={() => onVideoSelect(video)}
                />
                <div className="absolute top-2 left-2 bg-red-600 rounded-full p-1">
                  <ThumbsUp className="w-3 h-3 text-white" />
                </div>
              </div>
            ))}
          </div>
        )}

        {videos.length > 0 && (
          <div className="mt-8 p-4 bg-gray-900 rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-2">About Liked Videos</h3>
            <p className="text-gray-400 text-sm">
              Your liked videos are private and only visible to you. You can unlike videos at any time by clicking the thumbs up button again.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LikedVideosPage;