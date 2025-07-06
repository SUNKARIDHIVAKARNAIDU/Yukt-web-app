import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const AnalyticsWidget = ({ currentLanguage }) => {
  const followerData = [
    { month: 'Jan', followers: 120 },
    { month: 'Feb', followers: 145 },
    { month: 'Mar', followers: 178 },
    { month: 'Apr', followers: 210 },
    { month: 'May', followers: 245 },
    { month: 'Jun', followers: 289 }
  ];

  const engagementData = [
    { day: 'Mon', posts: 12, events: 3 },
    { day: 'Tue', posts: 8, events: 1 },
    { day: 'Wed', posts: 15, events: 2 },
    { day: 'Thu', posts: 10, events: 4 },
    { day: 'Fri', posts: 18, events: 2 },
    { day: 'Sat', posts: 6, events: 1 },
    { day: 'Sun', posts: 9, events: 3 }
  ];

  const translations = {
    en: {
      analytics: 'Analytics Overview',
      followerGrowth: 'Follower Growth',
      weeklyEngagement: 'Weekly Engagement',
      posts: 'Posts',
      events: 'Events',
      followers: 'Followers'
    },
    es: {
      analytics: 'Resumen de Analíticas',
      followerGrowth: 'Crecimiento de Seguidores',
      weeklyEngagement: 'Participación Semanal',
      posts: 'Publicaciones',
      events: 'Eventos',
      followers: 'Seguidores'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  return (
    <div className="bg-surface rounded-lg border border-border shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">{t.analytics}</h3>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Follower Growth Chart */}
        <div>
          <h4 className="text-sm font-medium text-text-secondary mb-3">{t.followerGrowth}</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={followerData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="followers" 
                  stroke="#2563EB" 
                  strokeWidth={2}
                  dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#2563EB', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Engagement Chart */}
        <div>
          <h4 className="text-sm font-medium text-text-secondary mb-3">{t.weeklyEngagement}</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="posts" fill="#2563EB" radius={[2, 2, 0, 0]} />
                <Bar dataKey="events" fill="#7C3AED" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center space-x-6 mt-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-xs text-text-muted">{t.posts}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-secondary rounded-full"></div>
              <span className="text-xs text-text-muted">{t.events}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsWidget;