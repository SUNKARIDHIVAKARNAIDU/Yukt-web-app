import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const UpcomingEvents = ({ currentLanguage }) => {
  const upcomingEvents = [
    {
      id: 1,
      title: 'React Workshop Series',
      description: 'Learn React fundamentals with hands-on coding exercises and real-world projects.',
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      time: '2:00 PM - 5:00 PM',
      location: 'Computer Lab A-101',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300',
      attendees: 45,
      maxAttendees: 60,
      status: 'open'
    },
    {
      id: 2,
      title: 'Tech Career Fair',
      description: 'Meet with industry professionals and explore internship and job opportunities.',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      time: '10:00 AM - 4:00 PM',
      location: 'Main Auditorium',
      image: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?w=300',
      attendees: 128,
      maxAttendees: 200,
      status: 'open'
    },
    {
      id: 3,
      title: 'AI & Machine Learning Seminar',
      description: 'Explore the latest trends in artificial intelligence and machine learning applications.',
      date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      time: '1:00 PM - 3:00 PM',
      location: 'Conference Room B-205',
      image: 'https://images.pixabay.com/photo/2023/01/26/22/13/ai-generated-7747171_1280.jpg?w=300',
      attendees: 32,
      maxAttendees: 40,
      status: 'filling_fast'
    }
  ];

  const translations = {
    en: {
      upcomingEvents: 'Upcoming Events',
      attendees: 'attendees',
      maxCapacity: 'max capacity',
      viewAll: 'View All Events',
      edit: 'Edit',
      promote: 'Promote',
      open: 'Open',
      fillingFast: 'Filling Fast',
      soldOut: 'Sold Out'
    },
    es: {
      upcomingEvents: 'Próximos Eventos',
      attendees: 'asistentes',
      maxCapacity: 'capacidad máxima',
      viewAll: 'Ver Todos los Eventos',
      edit: 'Editar',
      promote: 'Promocionar',
      open: 'Abierto',
      fillingFast: 'Llenándose Rápido',
      soldOut: 'Agotado'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'text-success bg-success-50';
      case 'filling_fast': return 'text-warning bg-warning-50';
      case 'sold_out': return 'text-error bg-error-50';
      default: return 'text-text-muted bg-background';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'open': return t.open;
      case 'filling_fast': return t.fillingFast;
      case 'sold_out': return t.soldOut;
      default: return '';
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary">{t.upcomingEvents}</h3>
          <Button variant="ghost" size="sm" iconName="ArrowRight">
            {t.viewAll}
          </Button>
        </div>
      </div>

      <div className="divide-y divide-border">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="p-6">
            <div className="flex space-x-4">
              {/* Event Image */}
              <div className="flex-shrink-0">
                <Image
                  src={event.image}
                  alt={event.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              </div>

              {/* Event Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-base font-semibold text-text-primary truncate pr-2">
                    {event.title}
                  </h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                    {getStatusText(event.status)}
                  </span>
                </div>

                <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                  {event.description}
                </p>

                {/* Event Meta */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-center space-x-4 text-sm text-text-muted">
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={14} />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} />
                      <span>{event.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-text-muted">
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={14} />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={14} />
                      <span>{event.attendees}/{event.maxAttendees} {t.attendees}</span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="w-full bg-background rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" iconName="Edit">
                    {t.edit}
                  </Button>
                  <Button variant="ghost" size="sm" iconName="TrendingUp">
                    {t.promote}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;