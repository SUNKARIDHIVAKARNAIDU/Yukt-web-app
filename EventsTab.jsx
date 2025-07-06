import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EventsTab = ({ events, userRole, onEventUpdate }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEventStatus = (startDate) => {
    const now = new Date();
    const eventDate = new Date(startDate);
    
    if (eventDate < now) {
      return { status: 'past', color: 'text-text-muted', label: 'Past Event' };
    } else if (eventDate - now < 24 * 60 * 60 * 1000) {
      return { status: 'soon', color: 'text-warning', label: 'Happening Soon' };
    } else {
      return { status: 'upcoming', color: 'text-primary', label: 'Upcoming' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Create Event - Admin only */}
      {userRole === 'admin' && (
        <div className="bg-surface rounded-lg border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-text-primary">Create New Event</h3>
              <p className="text-text-secondary">Schedule events for your club members</p>
            </div>
            <Button variant="primary" iconName="Plus">
              Create Event
            </Button>
          </div>
        </div>
      )}

      {/* Events List */}
      <div className="space-y-4">
        {events.map((event) => {
          const eventStatus = getEventStatus(event.startDate);
          
          return (
            <div key={event.id} className="bg-surface rounded-lg border border-border overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-48 h-48 md:h-auto relative">
                  <Image
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-surface bg-opacity-90 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="text-center">
                      <div className="text-xs text-text-muted font-medium">
                        {new Date(event.startDate).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                      </div>
                      <div className="text-lg font-bold text-text-primary">
                        {new Date(event.startDate).getDate()}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-xl font-semibold text-text-primary">{event.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          eventStatus.status === 'past' ? 'bg-gray-100 text-gray-600' :
                          eventStatus.status === 'soon'? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {eventStatus.label}
                        </span>
                      </div>
                      <p className="text-text-secondary mb-4">{event.description}</p>
                    </div>
                    {userRole === 'admin' && (
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-text-muted hover:text-text-primary">
                          <Icon name="Edit" size={16} />
                        </button>
                        <button className="p-1 text-text-muted hover:text-text-primary">
                          <Icon name="MoreHorizontal" size={16} />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-6 text-sm text-text-secondary mb-4">
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={16} />
                      <span>{formatDate(event.startDate)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={16} />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={16} />
                      <span>{event.attendees}/{event.capacity} attending</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" iconName="Share">
                        Share
                      </Button>
                      <Button variant="outline" size="sm" iconName="Calendar">
                        Add to Calendar
                      </Button>
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      iconName="UserPlus"
                      disabled={eventStatus.status === 'past'}
                    >
                      {eventStatus.status === 'past' ? 'Event Ended' : 'Join Event'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {events.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Calendar" size={48} className="text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">No events scheduled</h3>
          <p className="text-text-muted mb-6">
            {userRole === 'admin' ?'Create your first event to get started!' :'Check back later for upcoming events.'}
          </p>
          {userRole === 'admin' && (
            <Button variant="primary" iconName="Plus">
              Create First Event
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default EventsTab;