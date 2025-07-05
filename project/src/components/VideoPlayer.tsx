import React, { useState } from 'react';
import { X, ThumbsUp, ThumbsDown, Share, Download, MoreHorizontal, Bell, CheckCircle, ArrowLeft } from 'lucide-react';
import { Video } from '../types';
import Comments from './Comments';

interface VideoPlayerProps {
  video: Video;
  onClose: () => void;
  onBackToHome: () => void;
  isLiked: boolean;
  onLikeToggle: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  video, 
  onClose, 
  onBackToHome, 
  isLiked, 
  onLikeToggle 
}) => {
  const [disliked, setDisliked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const handleLike = () => {
    onLikeToggle();
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (isLiked) onLikeToggle();
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBackToHome}
              className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Back to Home</span>
            </button>
            <h1 className="text-2xl font-bold text-white">
              Now Playing
            </h1>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="aspect-video bg-black rounded-xl overflow-hidden relative group">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[20px] border-l-white border-y-[12px] border-y-transparent ml-1"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h2 className="text-xl font-bold text-white">
                {video.title}
              </h2>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={video.channel.avatar}
                      alt={video.channel.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <div className="flex items-center space-x-1">
                        <span className="font-semibold text-white">
                          {video.channel.name}
                        </span>
                        {video.channel.verified && (
                          <CheckCircle className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                      <span className="text-sm text-gray-400">
                        {video.channel.subscribers} subscribers
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSubscribed(!subscribed)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-colors ${
                      subscribed
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                  >
                    <Bell className="w-4 h-4" />
                    <span>{subscribed ? 'Subscribed' : 'Subscribe'}</span>
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center bg-gray-800 rounded-full">
                    <button
                      onClick={handleLike}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-l-full transition-colors ${
                        isLiked
                          ? 'text-blue-500 bg-gray-700'
                          : 'text-gray-300 hover:text-white hover:bg-gray-700'
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm">{(video.likes + (isLiked ? 1 : 0)).toLocaleString()}</span>
                    </button>
                    <div className="w-px h-6 bg-gray-600"></div>
                    <button
                      onClick={handleDislike}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-r-full transition-colors ${
                        disliked
                          ? 'text-red-500 bg-gray-700'
                          : 'text-gray-300 hover:text-white hover:bg-gray-700'
                      }`}
                    >
                      <ThumbsDown className="w-4 h-4" />
                      <span className="text-sm">{(video.dislikes + (disliked ? 1 : 0)).toLocaleString()}</span>
                    </button>
                  </div>

                  <button className="p-2 rounded-full transition-colors text-gray-300 hover:text-white hover:bg-gray-800">
                    <Share className="w-5 h-5" />
                  </button>

                  <button className="p-2 rounded-full transition-colors text-gray-300 hover:text-white hover:bg-gray-800">
                    <Download className="w-5 h-5" />
                  </button>

                  <button className="p-2 rounded-full transition-colors text-gray-300 hover:text-white hover:bg-gray-800">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-xl bg-gray-900">
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-gray-300">
                    {video.views} views
                  </span>
                  <span className="text-gray-300">
                    {video.uploadTime}
                  </span>
                </div>
                <p className={`mt-2 ${
                  showDescription ? '' : 'line-clamp-2'
                } text-gray-300`}>
                  {video.description}
                </p>
                <button
                  onClick={() => setShowDescription(!showDescription)}
                  className="mt-2 text-sm font-medium text-gray-400 hover:text-white"
                >
                  {showDescription ? 'Show less' : 'Show more'}
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Comments video={video} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;