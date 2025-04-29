import React, { useState, useRef, useEffect } from 'react';
import { Send, User, BrainCircuit, BarChart, PieChart as ChartPie } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { ChatMessage } from '../../types';
import { chatHistory } from '../../data/ogiData';

const OGIChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(chatHistory);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);
    
    // Simulate response delay
    setTimeout(() => {
      // Add assistant response
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: 'Based on organizational data, the current onboarding progress for Q2 2025 shows 85% completion rate across 127 new hires. Engineering department has the highest completion rate at 92%, followed by Marketing at 88%.',
        timestamp: new Date(),
        attachments: [
          {
            type: 'chart',
            data: {
              type: 'bar',
              labels: ['Engineering', 'Marketing', 'Sales', 'Product'],
              values: [92, 88, 82, 78]
            }
          }
        ]
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsProcessing(false);
    }, 1500);
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  };
  
  // Render chart based on attachment data
  const renderChart = (attachment: any) => {
    if (attachment.type !== 'chart') return null;
    
    const { type, labels, values } = attachment.data;
    
    if (type === 'bar') {
      // Simple bar chart visualization
      const maxValue = Math.max(...values);
      
      return (
        <div className="mt-3 bg-white dark:bg-gray-900 p-3 rounded-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-2">
            <BarChart size={14} className="text-gray-500 mr-2" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Department Completion Rates</span>
          </div>
          <div className="space-y-2">
            {labels.map((label: string, i: number) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-400">{label}</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{values[i]}%</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gray-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(values[i] / maxValue) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    if (type === 'pie') {
      return (
        <div className="mt-3 bg-white dark:bg-gray-900 p-3 rounded-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-2">
            <ChartPie size={14} className="text-gray-500 mr-2" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Attrition Reasons</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {labels.map((label: string, i: number) => (
              <div key={i} className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-gray-500 mr-2" style={{ opacity: 0.4 + (i * 0.2) }}></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">{label} ({values[i]}%)</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="flex flex-col h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-base font-medium text-gray-900 dark:text-white">OGI Assistant</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Ask questions about organizational knowledge
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map(message => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
            {message.sender === 'assistant' && (
              <div className="flex h-8 w-8 rounded-md bg-gray-100 dark:bg-gray-700 items-center justify-center mr-2 mt-1">
                <BrainCircuit size={16} className="text-gray-600 dark:text-gray-400" />
              </div>
            )}
            
            <div className={`max-w-[75%] ${message.sender === 'user' ? 'order-1' : 'order-2'}`}>
              <div 
                className={`px-4 py-2 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-gray-900 text-white rounded-tr-none' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none'
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
              
              {/* Render chart attachments if present */}
              {message.attachments?.map((attachment, i) => (
                <div key={i}>
                  {renderChart(attachment)}
                </div>
              ))}
              
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {formatTime(message.timestamp)}
              </div>
            </div>
            
            {message.sender === 'user' && (
              <div className="flex h-8 w-8 rounded-md bg-gray-100 dark:bg-gray-700 items-center justify-center ml-2 mt-1">
                <User size={16} className="text-gray-600 dark:text-gray-400" />
              </div>
            )}
          </div>
        ))}
        
        {isProcessing && (
          <div className="flex justify-start mb-4">
            <div className="flex h-8 w-8 rounded-md bg-gray-100 dark:bg-gray-700 items-center justify-center mr-2">
              <BrainCircuit size={16} className="text-gray-600 dark:text-gray-400" />
            </div>
            
            <div className="px-4 py-2 rounded-lg rounded-tl-none bg-gray-100 dark:bg-gray-700">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            type="text"
            placeholder="Ask about knowledge..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            fullWidth
            className="flex-1"
            icon={<BrainCircuit size={16} className="text-gray-400" />}
          />
          <Button 
            type="submit" 
            variant="primary"
            icon={<Send size={16} />}
            isLoading={isProcessing}
            disabled={!input.trim()}
          >
            Ask
          </Button>
        </form>
      </div>
    </div>
  );
};

export default OGIChatAssistant;