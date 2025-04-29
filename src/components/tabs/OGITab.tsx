import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import KnowledgeGraph from '../ogi/KnowledgeGraph';
import OGIChatAssistant from '../ogi/ChatAssistant';
import MetricsCard from '../ogi/MetricsCard';
import Input from '../ui/Input';
import { ogiNodes, ogiLinks, hrMetrics } from '../../data/ogiData';

const OGITab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const renderFilter = () => {
    const filters = [
      { id: 'all', label: 'All' },
      { id: 'metrics', label: 'Metrics' },
      { id: 'knowledge', label: 'Knowledge' },
      { id: 'chat', label: 'Chat' }
    ];
    
    return (
      <div className="flex space-x-4 mb-6">
        {filters.map(item => (
          <button
            key={item.id}
            className={`px-4 py-1.5 text-sm rounded-md transition ${
              filter === item.id
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setFilter(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    );
  };
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-medium text-gray-900 dark:text-white">Organizational General Intelligence (OGI)</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Explore organizational knowledge, insights, and patterns
          </p>
        </div>
        <div className="w-64">
          <Input 
            placeholder="Search knowledge..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            icon={<Search size={16} />}
          />
        </div>
      </div>
      
      {renderFilter()}
      
      {(filter === 'all' || filter === 'metrics') && (
        <div>
          <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
            HR Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 mb-8">
            {hrMetrics.map((metric, index) => (
              <MetricsCard key={index} metric={metric} />
            ))}
          </div>
        </div>
      )}
      
      {(filter === 'all' || filter === 'knowledge' || filter === 'chat') && (
        <div>
          {(filter === 'all' || filter === 'knowledge') && (
            <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
              Knowledge Map
            </h2>
          )}
          
          <div className="flex flex-col lg:flex-row gap-5">
            {/* Knowledge Graph (3/4 width) */}
            <div className="lg:w-3/4">
              {isLoading ? (
                <div className="w-full h-[500px] border border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center bg-white dark:bg-gray-800">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-500 dark:text-gray-400">Loading knowledge graph...</p>
                  </div>
                </div>
              ) : (
                <KnowledgeGraph nodes={ogiNodes} links={ogiLinks} />
              )}
            </div>
            
            {/* Chat Assistant (1/4 width) */}
            {(filter === 'all' || filter === 'chat') && (
              <div className="lg:w-1/4">
                <OGIChatAssistant />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OGITab;