import React from 'react';

import Button from '../../../components/ui/Button';

const FilterSidebar = ({ categories, clubs, activeFilters, onFilterChange }) => {
  const handleFilterChange = (key, value) => {
    const newFilters = {
      ...activeFilters,
      [key]: activeFilters[key] === value ? '' : value
    };
    onFilterChange?.(newFilters);
  };

  const clearAllFilters = () => {
    onFilterChange?.({
      category: '',
      dateRange: '',
      location: '',
      clubId: ''
    });
  };

  const hasActiveFilters = Object.values(activeFilters).some(filter => filter);

  return (
    <div className="bg-surface rounded-lg border border-border p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearAllFilters}
            iconName="X"
          >
            Clear
          </Button>
        )}
      </div>

      {/* Categories */}
      <div>
        <h4 className="font-medium text-text-primary mb-3">Category</h4>
        <div className="space-y-2">
          {['academic', 'social', 'sports', 'cultural'].map(category => (
            <label key={category} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={activeFilters.category === category}
                onChange={() => handleFilterChange('category', category)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <span className="text-sm text-text-secondary capitalize">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Date Range */}
      <div>
        <h4 className="font-medium text-text-primary mb-3">Date Range</h4>
        <div className="space-y-2">
          {[
            { value: 'today', label: 'Today' },
            { value: 'week', label: 'This Week' },
            { value: 'month', label: 'This Month' }
          ].map(({ value, label }) => (
            <label key={value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="dateRange"
                checked={activeFilters.dateRange === value}
                onChange={() => handleFilterChange('dateRange', value)}
                className="w-4 h-4 text-primary border-border focus:ring-primary"
              />
              <span className="text-sm text-text-secondary">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <h4 className="font-medium text-text-primary mb-3">Location</h4>
        <div className="space-y-2">
          {[
            'Main Auditorium',
            'Student Center',
            'Sports Complex',
            'Campus Amphitheater',
            'Computer Lab'
          ].map(location => (
            <label key={location} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={activeFilters.location === location}
                onChange={() => handleFilterChange('location', location)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <span className="text-sm text-text-secondary">{location}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clubs */}
      <div>
        <h4 className="font-medium text-text-primary mb-3">Clubs</h4>
        <div className="space-y-2">
          {clubs.map(club => (
            <label key={club.id} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={activeFilters.clubId === club.id.toString()}
                onChange={() => handleFilterChange('clubId', club.id.toString())}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <span className="text-sm text-text-secondary">{club.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Registration Status */}
      <div>
        <h4 className="font-medium text-text-primary mb-3">Registration</h4>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
            />
            <span className="text-sm text-text-secondary">No registration required</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
            />
            <span className="text-sm text-text-secondary">Available spots</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;