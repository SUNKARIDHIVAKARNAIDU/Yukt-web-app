import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SearchBar = ({ onSearch, placeholder = "Search events..." }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch?.('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative flex items-center">
        <Icon 
          name="Search" 
          size={20} 
          className="absolute left-3 text-text-muted pointer-events-none" 
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary placeholder-text-muted"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 p-1 text-text-muted hover:text-text-primary transition-colors"
          >
            <Icon name="X" size={18} />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;