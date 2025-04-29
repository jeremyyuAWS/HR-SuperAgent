import React from 'react';
import AgentCard from './AgentCard';
import { AgentType } from '../../types';

interface AgentZoneProps {
  title: string;
  agents: AgentType[];
  onInteract: (agent: AgentType) => void;
}

const AgentZone: React.FC<AgentZoneProps> = ({ title, agents, onInteract }) => {
  return (
    <div className="mb-10">
      <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
        {title}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {agents.map(agent => (
          <AgentCard 
            key={agent.id} 
            agent={agent} 
            onInteract={onInteract}
          />
        ))}
      </div>
    </div>
  );
};

export default AgentZone;