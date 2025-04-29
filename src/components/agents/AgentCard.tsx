import React, { useState } from 'react';
import { MessageSquare, ArrowRight, AlertCircle } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { AgentType } from '../../types';
import { getAgentIcon } from '../../data/agentsData';

interface AgentCardProps {
  agent: AgentType;
  onInteract: (agent: AgentType) => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, onInteract }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = getAgentIcon(agent.icon);
  
  const getStatusBadge = () => {
    switch (agent.status) {
      case 'online':
        return <Badge variant="success">Online</Badge>;
      case 'maintenance':
        return <Badge variant="warning">Maintenance</Badge>;
      case 'offline':
        return <Badge variant="danger">Offline</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <Card 
      className="h-full transition-all duration-200 hover:shadow-card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-5 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="rounded-md p-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
            <Icon size={20} />
          </div>
          {getStatusBadge()}
        </div>
        
        <h3 className="text-base font-medium text-gray-900 dark:text-white mb-2">
          {agent.title}
        </h3>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 flex-grow">
          {agent.description}
        </p>
        
        {agent.status === 'maintenance' ? (
          <div className="mt-auto flex items-center text-yellow-600 dark:text-yellow-400 text-sm">
            <AlertCircle size={16} className="mr-1.5" />
            <span>Under maintenance</span>
          </div>
        ) : (
          <Button 
            variant={isHovered ? "primary" : "outline"}
            size="md"
            className="mt-auto transition-all duration-200 w-full justify-between"
            icon={<MessageSquare size={16} />}
            onClick={() => onInteract(agent)}
          >
            <span>Ask {agent.title}</span>
            <ArrowRight size={16} className={`transition-all duration-200 transform ${isHovered ? 'translate-x-1 opacity-100' : 'opacity-0'}`} />
          </Button>
        )}
      </div>
    </Card>
  );
};

export default AgentCard;