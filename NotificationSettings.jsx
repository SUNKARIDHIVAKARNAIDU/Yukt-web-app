import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationSettings = ({ isOpen, onClose, settings, onSettingsChange }) => {
  const [localSettings, setLocalSettings] = useState(settings || {
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    eventReminders: true,
    messageAlerts: true,
    announcementAlerts: true,
    systemAlerts: true,
    digestFrequency: 'daily',
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '08:00'
    }
  });

  const handleToggle = (key, subKey = null) => {
    setLocalSettings(prev => {
      if (subKey) {
        return {
          ...prev,
          [key]: {
            ...prev[key],
            [subKey]: !prev[key][subKey]
          }
        };
      }
      return {
        ...prev,
        [key]: !prev[key]
      };
    });
  };

  const handleSelectChange = (key, value) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleTimeChange = (key, timeKey, value) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [timeKey]: value
      }
    }));
  };

  const handleSave = () => {
    onSettingsChange?.(localSettings);
    onClose?.();
  };

  const handleReset = () => {
    setLocalSettings(settings);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-modal bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-modal max-w-md w-full max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary">Notification Settings</h2>
          <button
            onClick={onClose}
            className="p-1 text-text-muted hover:text-text-primary transition-micro"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Settings Content */}
        <div className="p-4 space-y-6">
          {/* Delivery Methods */}
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-3">Delivery Methods</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm text-text-primary">Push Notifications</label>
                  <p className="text-xs text-text-muted">Receive notifications on your device</p>
                </div>
                <button
                  onClick={() => handleToggle('pushNotifications')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    localSettings.pushNotifications ? 'bg-primary' : 'bg-border'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      localSettings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm text-text-primary">Email Notifications</label>
                  <p className="text-xs text-text-muted">Receive notifications via email</p>
                </div>
                <button
                  onClick={() => handleToggle('emailNotifications')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    localSettings.emailNotifications ? 'bg-primary' : 'bg-border'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      localSettings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm text-text-primary">SMS Notifications</label>
                  <p className="text-xs text-text-muted">Receive urgent notifications via SMS</p>
                </div>
                <button
                  onClick={() => handleToggle('smsNotifications')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    localSettings.smsNotifications ? 'bg-primary' : 'bg-border'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      localSettings.smsNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Notification Types */}
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-3">Notification Types</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={16} className="text-primary" />
                  <span className="text-sm text-text-primary">Event Reminders</span>
                </div>
                <button
                  onClick={() => handleToggle('eventReminders')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    localSettings.eventReminders ? 'bg-primary' : 'bg-border'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      localSettings.eventReminders ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="MessageCircle" size={16} className="text-accent" />
                  <span className="text-sm text-text-primary">Message Alerts</span>
                </div>
                <button
                  onClick={() => handleToggle('messageAlerts')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    localSettings.messageAlerts ? 'bg-primary' : 'bg-border'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      localSettings.messageAlerts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="Megaphone" size={16} className="text-warning" />
                  <span className="text-sm text-text-primary">Announcements</span>
                </div>
                <button
                  onClick={() => handleToggle('announcementAlerts')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    localSettings.announcementAlerts ? 'bg-primary' : 'bg-border'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      localSettings.announcementAlerts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon name="Settings" size={16} className="text-text-muted" />
                  <span className="text-sm text-text-primary">System Alerts</span>
                </div>
                <button
                  onClick={() => handleToggle('systemAlerts')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    localSettings.systemAlerts ? 'bg-primary' : 'bg-border'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      localSettings.systemAlerts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Email Digest */}
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-3">Email Digest</h3>
            <select
              value={localSettings.digestFrequency}
              onChange={(e) => handleSelectChange('digestFrequency', e.target.value)}
              className="w-full p-2 border border-border rounded-lg bg-background text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="never">Never</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {/* Quiet Hours */}
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-3">Quiet Hours</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-primary">Enable quiet hours</span>
                <button
                  onClick={() => handleToggle('quietHours', 'enabled')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    localSettings.quietHours.enabled ? 'bg-primary' : 'bg-border'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      localSettings.quietHours.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {localSettings.quietHours.enabled && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-text-muted mb-1">Start</label>
                    <input
                      type="time"
                      value={localSettings.quietHours.start}
                      onChange={(e) => handleTimeChange('quietHours', 'start', e.target.value)}
                      className="w-full p-2 border border-border rounded-lg bg-background text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-text-muted mb-1">End</label>
                    <input
                      type="time"
                      value={localSettings.quietHours.end}
                      onChange={(e) => handleTimeChange('quietHours', 'end', e.target.value)}
                      className="w-full p-2 border border-border rounded-lg bg-background text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;