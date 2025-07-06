import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ActivityFeed = ({ currentLanguage }) => {
  const [activities, setActivities] = useState([
    {
      id: 1,
      type: 'post',
      title: 'Tech Workshop: Introduction to React',
      content: `Join us for an exciting hands-on workshop where we'll dive into the fundamentals of React development.\n\nWhat you'll learn:\n• Component-based architecture\n• State management basics\n• Event handling\n• Building your first React app\n\nPerfect for beginners and those looking to refresh their skills!`,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      engagement: {
        likes: 45,
        comments: 12,
        shares: 8
      },
      status: 'published'
    },
    {
      id: 2,
      type: 'event',
      title: 'Annual Tech Fest 2024',
      content: `Get ready for the biggest tech event of the year! Join us for three days of innovation, learning, and networking.\n\nEvent Highlights:\n• Keynote speakers from top tech companies\n• Hands-on workshops and coding competitions\n• Startup pitch sessions\n• Networking opportunities\n• Prize distribution ceremony`,
      image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?w=500',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      engagement: {
        likes: 128,
        comments: 34,
        shares: 22,
        rsvp: 89
      },
      status: 'published',
      eventDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    },
    {
      id: 3,
      type: 'post',
      title: 'Weekly Code Challenge Results',
      content: `Congratulations to all participants in this week's coding challenge!\n\nTop performers:\n🥇 Sarah Chen - Algorithm Optimization\n🥈 Mike Rodriguez - Clean Code Implementation\n🥉 Alex Kumar - Creative Problem Solving\n\nNext challenge starts Monday. Stay tuned!`,
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      engagement: {
        likes: 67,
        comments: 18,
        shares: 5
      },
      status: 'published'
    }
  ]);

  const translations = {
    en: {
      recentActivity: 'Recent Activity',
      edit: 'Edit',
      delete: 'Delete',
      boost: 'Boost',
      viewDetails: 'View Details',
      likes: 'likes',
      comments: 'comments',
      shares: 'shares',
      rsvp: 'RSVP',
      hoursAgo: 'hours ago',
      daysAgo: 'days ago',
      published: 'Published',
      draft: 'Draft',
      scheduled: 'Scheduled'
    },
    es: {
      recentActivity: 'Actividad Reciente',
      edit: 'Editar',
      delete: 'Eliminar',
      boost: 'Impulsar',
      viewDetails: 'Ver Detalles',
      likes: 'me gusta',
      comments: 'comentarios',
      shares: 'compartidos',
      rsvp: 'Confirmar',
      hoursAgo: 'horas atrás',
      daysAgo: 'días atrás',
      published: 'Publicado',
      draft: 'Borrador',
      scheduled: 'Programado'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInHours = Math.floor((now - timestamp) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours} ${t.hoursAgo}`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} ${t.daysAgo}`;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'text-success';
      case 'draft': return 'text-warning';
      case 'scheduled': return 'text-primary';
      default: return 'text-text-muted';
    }
  };

  const handleEdit = (id) => {
    console.log('Edit activity:', id);
  };

  const handleDelete = (id) => {
    setActivities(prev => prev.filter(activity => activity.id !== id));
  };

  const handleBoost = (id) => {
    console.log('Boost activity:', id);
  };

  return (
    <div className="bg-surface rounded-lg border border-border shadow-card">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-text-primary">{t.recentActivity}</h3>
      </div>
      
      <div className="divide-y divide-border">
        {activities.map((activity) => (
          <div key={activity.id} className="p-6">
            <div className="flex items-start space-x-4">
              {/* Activity Type Icon */}
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                activity.type === 'event' ? 'bg-secondary-50 text-secondary' : 'bg-primary-50 text-primary'
              }`}>
                <Icon name={activity.type === 'event' ? 'Calendar' : 'FileText'} size={20} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-semibold text-text-primary truncate">{activity.title}</h4>
                  <div className="flex items-center space-x-2 ml-4">
                    <span className={`text-xs font-medium ${getStatusColor(activity.status)}`}>
                      {t[activity.status]}
                    </span>
                    <span className="text-xs text-text-muted">{formatTimeAgo(activity.timestamp)}</span>
                  </div>
                </div>

                {/* Content Preview */}
                <p className="text-sm text-text-secondary mb-3 line-clamp-3 whitespace-pre-line">
                  {activity.content}
                </p>

                {/* Image */}
                {activity.image && (
                  <div className="mb-4">
                    <Image
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Event Date */}
                {activity.type === 'event' && activity.eventDate && (
                  <div className="flex items-center space-x-2 mb-3 text-sm text-text-secondary">
                    <Icon name="Calendar" size={16} />
                    <span>{activity.eventDate.toLocaleDateString()}</span>
                  </div>
                )}

                {/* Engagement Metrics */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-sm text-text-muted">
                    <div className="flex items-center space-x-1">
                      <Icon name="Heart" size={16} />
                      <span>{activity.engagement.likes} {t.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="MessageCircle" size={16} />
                      <span>{activity.engagement.comments} {t.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Share" size={16} />
                      <span>{activity.engagement.shares} {t.shares}</span>
                    </div>
                    {activity.engagement.rsvp && (
                      <div className="flex items-center space-x-1">
                        <Icon name="Users" size={16} />
                        <span>{activity.engagement.rsvp} {t.rsvp}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Edit"
                      onClick={() => handleEdit(activity.id)}
                    >
                      {t.edit}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="TrendingUp"
                      onClick={() => handleBoost(activity.id)}
                    >
                      {t.boost}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Trash2"
                      onClick={() => handleDelete(activity.id)}
                      className="text-error hover:text-error"
                    >
                      {t.delete}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;