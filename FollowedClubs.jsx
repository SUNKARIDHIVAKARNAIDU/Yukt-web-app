import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FollowedClubs = ({ clubs, onClubClick, onUnfollow }) => {
  return (
    <div className="bg-surface rounded-lg shadow-card border border-border p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-text-primary">Following</h3>
        <Button variant="ghost" size="sm" iconName="ArrowRight">
          View All
        </Button>
      </div>

      <div className="space-y-3">
        {clubs.slice(0, 4).map((club) => (
          <div
            key={club.id}
            onClick={() => onClubClick?.(club)}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-background transition-micro cursor-pointer"
          >
            <Image
              src={club.avatar}
              alt={club.name}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-text-primary text-sm truncate">{club.name}</h4>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-text-muted">{club.memberCount} members</span>
                {club.isActive && (
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-xs text-success">Active</span>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onUnfollow?.(club.id);
              }}
              className="p-1 text-text-muted hover:text-error transition-micro"
            >
              <Icon name="UserMinus" size={16} />
            </button>
          </div>
        ))}
      </div>

      {clubs.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Users" size={32} className="text-text-muted mx-auto mb-2" />
          <p className="text-text-muted text-sm">No clubs followed yet</p>
          <Button variant="primary" size="sm" className="mt-3" iconName="Search">
            Discover Clubs
          </Button>
        </div>
      )}
    </div>
  );
};

export default FollowedClubs;