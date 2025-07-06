import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ClubHeader = ({ 
  club, 
  isFollowing, 
  userRole, 
  onFollowClick, 
  onEditClick, 
  onMessageClick 
}) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="relative h-64 lg:h-80">
        <Image
          src={club.coverImage}
          alt={`${club.name} cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        {/* Edit Cover Button - Admin only */}
        {userRole === 'admin' && (
          <button
            onClick={onEditClick}
            className="absolute top-4 right-4 p-2 bg-surface/80 backdrop-blur-sm rounded-lg text-text-muted hover:text-text-primary transition-colors"
          >
            <Icon name="Camera" size={20} />
          </button>
        )}
      </div>

      {/* Club Info */}
      <div className="max-w-6xl mx-auto px-4 -mt-20 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col lg:flex-row lg:items-end space-y-4 lg:space-y-0 lg:space-x-6">
            {/* Club Avatar */}
            <div className="relative">
              <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border-4 border-surface bg-surface shadow-lg overflow-hidden">
                <Image
                  src={club.avatar}
                  alt={club.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {userRole === 'admin' && (
                <button
                  onClick={onEditClick}
                  className="absolute bottom-2 right-2 p-2 bg-surface rounded-full shadow-md text-text-muted hover:text-text-primary transition-colors"
                >
                  <Icon name="Edit" size={16} />
                </button>
              )}
            </div>

            {/* Club Details */}
            <div className="text-surface lg:text-text-primary lg:bg-transparent bg-surface/90 backdrop-blur-sm rounded-lg p-4 lg:p-0">
              <div className="flex items-center space-x-2 mb-2">
                <h1 className="text-2xl lg:text-3xl font-bold">{club.name}</h1>
                {club.isVerified && (
                  <Icon name="CheckCircle" size={24} className="text-primary" />
                )}
              </div>
              
              <p className="text-lg lg:text-surface/80 lg:text-text-secondary mb-3">
                {club.description}
              </p>
              
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={16} />
                  <span>{club.memberCount} members</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Heart" size={16} />
                  <span>{club.followersCount} followers</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={16} />
                  <span>Founded {formatDate(club.foundedDate)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Tag" size={16} />
                  <span>{club.category}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 mt-6 lg:mt-0">
            {userRole === 'admin' ? (
              <>
                <Button
                  variant="outline"
                  onClick={onEditClick}
                  iconName="Settings"
                  className="bg-surface/80 backdrop-blur-sm"
                >
                  Manage
                </Button>
                <Button
                  variant="primary"
                  onClick={onMessageClick}
                  iconName="MessageCircle"
                >
                  Message Members
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={onMessageClick}
                  iconName="MessageCircle"
                  className="bg-surface/80 backdrop-blur-sm"
                >
                  Message
                </Button>
                <Button
                  variant={isFollowing ? 'success' : 'primary'}
                  onClick={onFollowClick}
                  iconName={isFollowing ? 'Check' : 'Plus'}
                >
                  {isFollowing ? 'Following' : 'Join Club'}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="max-w-6xl mx-auto px-4 mt-6">
        <div className="flex flex-wrap gap-2">
          {club.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClubHeader;