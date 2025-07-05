import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import VideoPlayer from './components/VideoPlayer';
import SubscriptionsPage from './components/SubscriptionsPage';
import UserAccountPage from './components/UserAccountPage';
import LikedVideosPage from './components/LikedVideosPage';
import { Video } from './types';

const sampleVideos: Video[] = [
  {
    id: '1',
    title: 'Epic Mountain Adventure | 4K Nature Documentary',
    thumbnail: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '12:34',
    views: '2.1M',
    uploadTime: '2 days ago',
    channel: {
      name: 'Nature Explorer',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      verified: true,
      subscribers: '1.2M'
    },
    likes: 89000,
    dislikes: 1200,
    description: 'Join us on an incredible journey through the world\'s most breathtaking mountain landscapes.',
    comments: [
      {
        id: '1',
        user: 'Adventure Seeker',
        avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100',
        text: 'Absolutely stunning cinematography! The drone shots are incredible.',
        likes: 234,
        timestamp: '2 hours ago',
        replies: []
      }
    ]
  },
  {
    id: '2',
    title: 'Cooking the Perfect Pasta | Italian Masterclass',
    thumbnail: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '8:45',
    views: '856K',
    uploadTime: '5 days ago',
    channel: {
      name: 'Chef\'s Kitchen',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      verified: true,
      subscribers: '890K'
    },
    likes: 45000,
    dislikes: 567,
    description: 'Learn the secrets of authentic Italian pasta making from a master chef.',
    comments: []
  },
  {
    id: '3',
    title: 'Modern Architecture Tour | Glass House Design',
    thumbnail: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '15:20',
    views: '1.5M',
    uploadTime: '1 week ago',
    channel: {
      name: 'Design Studio',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100',
      verified: false,
      subscribers: '345K'
    },
    likes: 67000,
    dislikes: 890,
    description: 'Explore the fascinating world of contemporary glass architecture.',
    comments: []
  },
  {
    id: '4',
    title: 'Space Exploration | Mars Mission Documentary',
    thumbnail: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: '22:15',
    views: '3.2M',
    uploadTime: '3 days ago',
    channel: {
      name: 'Space Channel',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      verified: true,
      subscribers: '2.1M'
    },
    likes: 125000,
    dislikes: 2100,
    description: 'Discover the latest developments in Mars exploration and future missions.',
    comments: []
  }
];

function App() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'subscriptions' | 'account' | 'liked'>('home');
  const [likedVideos, setLikedVideos] = useState<Set<string>>(new Set());

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleBackToHome = () => {
    setSelectedVideo(null);
    setCurrentPage('home');
  };

  const handleLikeVideo = (videoId: string) => {
    setLikedVideos(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(videoId)) {
        newLiked.delete(videoId);
      } else {
        newLiked.add(videoId);
      }
      return newLiked;
    });
  };

  const getLikedVideosList = () => {
    return sampleVideos.filter(video => likedVideos.has(video.id));
  };

  const renderContent = () => {
    if (selectedVideo) {
      return (
        <VideoPlayer 
          video={selectedVideo} 
          onClose={() => setSelectedVideo(null)}
          onBackToHome={handleBackToHome}
          isLiked={likedVideos.has(selectedVideo.id)}
          onLikeToggle={() => handleLikeVideo(selectedVideo.id)}
        />
      );
    }

    switch (currentPage) {
      case 'subscriptions':
        return <SubscriptionsPage videos={sampleVideos} onVideoSelect={handleVideoSelect} />;
      case 'account':
        return <UserAccountPage />;
      case 'liked':
        return <LikedVideosPage videos={getLikedVideosList()} onVideoSelect={handleVideoSelect} />;
      default:
        return <MainContent videos={sampleVideos} onVideoSelect={handleVideoSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header onHomeClick={handleBackToHome} />
      
      <div className="flex">
        <Sidebar 
          currentPage={currentPage} 
          onPageChange={setCurrentPage}
          likedVideosCount={likedVideos.size}
        />
        
        <main className="flex-1 ml-64">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;