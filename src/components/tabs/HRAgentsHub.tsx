import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { getAgentsByCategory } from '../../data/agentsData';
import AgentZone from '../agents/AgentZone';
import AgentDialog from '../agents/AgentDialog';
import { AgentType } from '../../types';
import Input from '../ui/Input';

const HRAgentsHub: React.FC = () => {
  const [activeAgent, setActiveAgent] = useState<AgentType | null>(null);
  const [filter, setFilter] = useState<string>('all');
  
  const employeeAgents = getAgentsByCategory('employee');
  const hrAgents = getAgentsByCategory('hr');
  const personalAgents = getAgentsByCategory('personal');
  
  const handleInteract = (agent: AgentType) => {
    setActiveAgent(agent);
  };
  
  const renderFilter = () => {
    const filters = [
      { id: 'all', label: 'All' },
      { id: 'employee', label: 'Employee' },
      { id: 'hr', label: 'HR' },
      { id: 'personal', label: 'Personal' }
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
          <h1 className="text-2xl font-medium text-gray-900 dark:text-white">HR Agents Hub</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Access specialized AI agents to assist with HR tasks and services
          </p>
        </div>
        <div className="w-64">
          <Input
            placeholder="Search agents..."
            icon={<Search size={16} />}
            fullWidth
          />
        </div>
      </div>
      
      {renderFilter()}
      
      {(filter === 'all' || filter === 'employee') && (
        <AgentZone 
          title="Employee Zone" 
          agents={employeeAgents} 
          onInteract={handleInteract}
        />
      )}
      
      {(filter === 'all' || filter === 'hr') && (
        <AgentZone 
          title="HR Zone" 
          agents={hrAgents} 
          onInteract={handleInteract}
        />
      )}
      
      {(filter === 'all' || filter === 'personal') && (
        <AgentZone 
          title="Personal Agents" 
          agents={personalAgents} 
          onInteract={handleInteract}
        />
      )}
      
      {activeAgent && (
        <AgentDialog agent={activeAgent} onClose={() => setActiveAgent(null)} />
      )}
    </div>
  );
};

export default HRAgentsHub;