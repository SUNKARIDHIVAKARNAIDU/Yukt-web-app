import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PostsTab = ({ posts, userRole, onPostUpdate }) => {
  const [selectedPost, setSelectedPost] = useState(null);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPostTypeColor = (type) => {
    const colors = {
      announcement: 'bg-blue-100 text-blue-800',
      project: 'bg-green-100 text-green-800',
      event: 'bg-orange-100 text-orange-800',
      general: 'bg-gray-100 text-gray-800'
    };
    return colors[type] || colors.general;
  };

  const handleLike = (postId) => {
    onPostUpdate(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  return (
    <div className="space-y-6">
      {/* Create Post - Admin/Member */}
      {(userRole === 'admin' || userRole === 'member') && (
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <Icon name="User" size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Share something with the club..."
                className="w-full p-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" iconName="Image">
                Photo
              </Button>
              <Button variant="outline" size="sm" iconName="Link">
                Link
              </Button>
              <Button variant="outline" size="sm" iconName="Calendar">
                Event
              </Button>
            </div>
            <Button variant="primary" size="sm">
              Post
            </Button>
          </div>
        </div>
      )}

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-surface rounded-lg border border-border overflow-hidden">
            {/* Post Header */}
            <div className="flex items-center justify-between p-4 pb-3">
              <div className="flex items-center space-x-3">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-text-primary">{post.author.name}</span>
                    <span className="text-sm text-text-muted">•</span>
                    <span className="text-sm text-text-muted">{post.author.role}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-text-secondary">{formatDate(post.createdAt)}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getPostTypeColor(post.type)}`}>
                      {post.type}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {userRole === 'admin' && (
                  <button className="p-1 text-text-muted hover:text-text-primary">
                    <Icon name="Edit" size={16} />
                  </button>
                )}
                <button className="p-1 text-text-muted hover:text-text-primary">
                  <Icon name="MoreHorizontal" size={16} />
                </button>
              </div>
            </div>

            {/* Post Content */}
            <div className="px-4 pb-3">
              <h3 className="font-semibold text-text-primary mb-2">{post.title}</h3>
              <p className="text-text-secondary leading-relaxed">{post.content}</p>
            </div>

            {/* Post Images */}
            {post.images && post.images.length > 0 && (
              <div className="px-4 pb-3">
                <div className="grid grid-cols-2 gap-2">
                  {post.images.map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      alt={`Post image ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Post Actions */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-border">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center space-x-1 text-text-muted hover:text-error transition-colors"
                >
                  <Icon name="Heart" size={18} />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center space-x-1 text-text-muted hover:text-primary transition-colors">
                  <Icon name="MessageCircle" size={18} />
                  <span className="text-sm">{post.comments}</span>
                </button>
                <button className="flex items-center space-x-1 text-text-muted hover:text-primary transition-colors">
                  <Icon name="Share" size={18} />
                  <span className="text-sm">Share</span>
                </button>
              </div>
              <button className="text-text-muted hover:text-warning transition-colors">
                <Icon name="Bookmark" size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {posts.length === 0 && (
        <div className="text-center py-12">
          <Icon name="MessageSquare" size={48} className="text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">No posts yet</h3>
          <p className="text-text-muted mb-6">
            Be the first to share something with the club!
          </p>
          {(userRole === 'admin' || userRole === 'member') && (
            <Button variant="primary" iconName="Plus">
              Create First Post
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default PostsTab;