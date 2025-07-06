import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const JoinClubModal = ({ club, onJoin, onClose }) => {
  const [formData, setFormData] = useState({
    reason: '',
    skills: '',
    experience: '',
    availability: '',
    agreeToTerms: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.agreeToTerms) {
      onJoin?.(formData);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-surface rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text-primary">Join {club.name}</h2>
          <button
            onClick={onClose}
            className="p-2 text-text-muted hover:text-text-primary transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Why do you want to join this club?
            </label>
            <textarea
              value={formData.reason}
              onChange={(e) => handleChange('reason', e.target.value)}
              placeholder="Tell us about your interest in joining..."
              className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Relevant Skills & Experience
            </label>
            <textarea
              value={formData.skills}
              onChange={(e) => handleChange('skills', e.target.value)}
              placeholder="List any relevant skills or experience..."
              className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Availability
            </label>
            <select
              value={formData.availability}
              onChange={(e) => handleChange('availability', e.target.value)}
              className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select your availability</option>
              <option value="high">High - Can attend most events</option>
              <option value="medium">Medium - Can attend some events</option>
              <option value="low">Low - Limited availability</option>
            </select>
          </div>

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={(e) => handleChange('agreeToTerms', e.target.checked)}
              className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary"
            />
            <label htmlFor="agreeToTerms" className="text-sm text-text-secondary">
              I agree to the club's terms and conditions and understand the membership responsibilities
            </label>
          </div>

          <div className="flex items-center space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!formData.agreeToTerms}
              className="flex-1"
            >
              Join Club
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinClubModal;