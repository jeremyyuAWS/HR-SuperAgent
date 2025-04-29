import React, { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabViewProps {
  tabs: Tab[];
  defaultTabId?: string;
}

const TabView: React.FC<TabViewProps> = ({ tabs, defaultTabId = tabs[0]?.id }) => {
  const [activeTabId, setActiveTabId] = useState(defaultTabId);
  
  const activeTab = tabs.find(tab => tab.id === activeTabId) || tabs[0];
  
  return (
    <div>
      <div className="border-b border-gray-200 dark:border-gray-800 mb-6">
        <div className="flex space-x-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`
                py-3 px-1 font-medium text-sm border-b-2 transition-colors
                ${activeTabId === tab.id 
                  ? 'border-gray-900 text-gray-900 dark:border-white dark:text-white' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        {activeTab.content}
      </div>
    </div>
  );
};

export default TabView;