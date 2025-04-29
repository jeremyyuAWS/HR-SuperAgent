export type AgentType = {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'employee' | 'hr' | 'personal';
  examplePrompt?: string;
  exampleResponse?: string;
  status?: 'online' | 'offline' | 'maintenance';
};

export type ChatMessage = {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: Date;
  attachments?: ChatAttachment[];
};

export type ChatAttachment = {
  type: 'chart' | 'document' | 'metric';
  data: {
    type?: string;
    labels?: string[];
    values?: number[];
    title?: string;
    content?: string;
    value?: number;
    trend?: 'up' | 'down' | 'stable';
    change?: number;
  };
};

export type OGINode = {
  id: string;
  label: string;
  category: string;
  size: number;
  connections: string[];
};

export type OGILink = {
  source: string;
  target: string;
  strength: number;
};

export type MetricData = {
  label: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
  unit?: string;
};