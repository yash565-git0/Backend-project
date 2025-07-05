import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, MessageCircle, Send } from 'lucide-react';
import { Video, Comment } from '../types';

interface CommentsProps {
  video: Video;
}

const Comments: React.FC<CommentsProps> = ({ video }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(video.comments);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        user: 'You',
        avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100',
        text: newComment,
        likes: 0,
        timestamp: 'just now',
        replies: []
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  const CommentItem: React.FC<{ comment: Comment }> = ({ comment }) => (
    <div className="flex space-x-3 mb-4">
      <img
        src={comment.avatar}
        alt={comment.user}
        className="w-10 h-10 rounded-full"
      />
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <span className="font-medium text-sm text-white">
            {comment.user}
          </span>
          <span className="text-xs text-gray-400">
            {comment.timestamp}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-300">
          {comment.text}
        </p>
        <div className="flex items-center space-x-4 mt-2">
          <button className="flex items-center space-x-1 text-xs text-gray-400 hover:text-white">
            <ThumbsUp className="w-3 h-3" />
            <span>{comment.likes}</span>
          </button>
          <button className="text-xs text-gray-400 hover:text-white">
            <ThumbsDown className="w-3 h-3" />
          </button>
          <button className="text-xs text-gray-400 hover:text-white">
            Reply
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-900 rounded-xl p-4 h-fit">
      <div className="flex items-center space-x-2 mb-4">
        <MessageCircle className="w-5 h-5 text-gray-400" />
        <h3 className="font-semibold text-white">
          Comments ({comments.length})
        </h3>
      </div>

      <div className="mb-4">
        <div className="flex space-x-3">
          <img
            src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100"
            alt="Your avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-red-600 resize-none bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              rows={3}
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Comment</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Comments;