import React from 'react';

const ClubTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="border-b border-border">
      <nav className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
            }`}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span className="ml-2 py-1 px-2 bg-background text-text-muted rounded-full text-xs">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ClubTabs;