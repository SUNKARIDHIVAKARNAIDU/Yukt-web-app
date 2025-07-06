import React from 'react';
import Icon from '../../../components/AppIcon';

const LanguageSelector = ({ currentLanguage, onLanguageChange }) => {
  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' }
  ];

  return (
    <div className="absolute top-4 right-4 z-10">
      <div className="relative">
        <select
          value={currentLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="appearance-none bg-surface border border-border rounded-lg px-3 py-2 pr-8 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.label}
            </option>
          ))}
        </select>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-muted pointer-events-none"
        />
      </div>
    </div>
  );
};

export default LanguageSelector;