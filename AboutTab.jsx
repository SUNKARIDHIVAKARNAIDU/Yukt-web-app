import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AboutTab = ({ club, userRole, onClubUpdate }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getSocialIcon = (platform) => {
    const icons = {
      twitter: 'Twitter',
      instagram: 'Instagram',
      github: 'Github',
      discord: 'MessageCircle',
      facebook: 'Facebook'
    };
    return icons[platform] || 'Globe';
  };

  return (
    <div className="space-y-8">
      {/* Mission Statement */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Mission Statement</h3>
          {userRole === 'admin' && (
            <Button variant="outline" size="sm" iconName="Edit">
              Edit
            </Button>
          )}
        </div>
        <p className="text-text-secondary leading-relaxed">{club.mission}</p>
      </div>

      {/* Club Information */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Club Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name="Calendar" size={20} className="text-primary" />
              </div>
              <div>
                <div className="text-sm text-text-secondary">Founded</div>
                <div className="font-medium text-text-primary">{formatDate(club.foundedDate)}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name="Tag" size={20} className="text-primary" />
              </div>
              <div>
                <div className="text-sm text-text-secondary">Category</div>
                <div className="font-medium text-text-primary">{club.category}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name="MapPin" size={20} className="text-primary" />
              </div>
              <div>
                <div className="text-sm text-text-secondary">Location</div>
                <div className="font-medium text-text-primary">{club.location}</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name="Users" size={20} className="text-primary" />
              </div>
              <div>
                <div className="text-sm text-text-secondary">Members</div>
                <div className="font-medium text-text-primary">{club.memberCount}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name="Globe" size={20} className="text-primary" />
              </div>
              <div>
                <div className="text-sm text-text-secondary">Website</div>
                <a href={club.website} className="font-medium text-primary hover:underline">
                  {club.website}
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name="Mail" size={20} className="text-primary" />
              </div>
              <div>
                <div className="text-sm text-text-secondary">Email</div>
                <div className="font-medium text-text-primary">{club.email}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership Team */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Leadership Team</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {club.leadership.map((leader) => (
            <div key={leader.id} className="flex items-center space-x-3 p-4 bg-background rounded-lg">
              <Image
                src={leader.avatar}
                alt={leader.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="font-medium text-text-primary">{leader.name}</div>
                <div className="text-sm text-primary">{leader.role}</div>
                <div className="text-xs text-text-secondary">{leader.major} • {leader.year}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Follow Us</h3>
        <div className="flex flex-wrap gap-4">
          {Object.entries(club.socialMedia).map(([platform, handle]) => (
            <div key={platform} className="flex items-center space-x-3 p-3 bg-background rounded-lg">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name={getSocialIcon(platform)} size={20} className="text-primary" />
              </div>
              <div>
                <div className="text-sm text-text-secondary capitalize">{platform}</div>
                <div className="font-medium text-text-primary">{handle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Achievements</h3>
        <div className="space-y-3">
          {club.achievements.map((achievement, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-background rounded-lg">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Icon name="Award" size={20} className="text-warning" />
              </div>
              <div>
                <div className="font-medium text-text-primary">{achievement.title}</div>
                <div className="text-sm text-text-secondary">{achievement.year}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Club Tags */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Interests & Activities</h3>
        <div className="flex flex-wrap gap-2">
          {club.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutTab;