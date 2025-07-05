export interface Channel {
  name: string;
  avatar: string;
  verified: boolean;
  subscribers: string;
}

export interface Comment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  likes: number;
  timestamp: string;
  replies: Comment[];
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  uploadTime: string;
  channel: Channel;
  likes: number;
  dislikes: number;
  description: string;
  comments: Comment[];
}