import React, { useState, useRef, useEffect } from 'react';
import { Send, User, BrainCircuit, BarChart, PieChart as ChartPie } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { ChatMessage, ChatAttachment } from '../../types';

interface ChatInterfaceProps {
  agentIcon: React.ElementType;
  agentTitle: string;
  onSendMessage: (message: string) => Promise<ChatMessage>;
  initialMessages?: ChatMessage[];
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  agentIcon: Icon,
  agentTitle,
  onSendMessage,
  initialMessages = []
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSubmit = async (e: React.FormEvent) => {
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
    
    try {
      // Get agent response
      const agentResponse = await onSendMessage(input);
      setMessages(prev => [...prev, agentResponse]);
    } catch (error) {
      console.error('Error getting agent response:', error);
      // Add error message
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        text: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date()
      }]);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  };
  
  // Render chart based on attachment data
  const renderChart = (attachment: ChatAttachment) => {
    if (attachment.type !== 'chart') return null;
    
    const { type, labels, values } = attachment.data;
    
    if (type === 'bar' && labels && values) {
      // Simple bar chart visualization
      const maxValue = Math.max(...values);
      
      return (
        <div className="mt-3 bg-white dark:bg-gray-900 p-3 rounded-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-2">
            <BarChart size={14} className="text-gray-500 mr-2" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Department Completion Rates</span>
          </div>
          <div className="space-y-2">
            {labels.map((label, i) => (
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
    
    if (type === 'pie' && labels && values) {
      return (
        <div className="mt-3 bg-white dark:bg-gray-900 p-3 rounded-md border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-2">
            <ChartPie size={14} className="text-gray-500 mr-2" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Attrition Reasons</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {labels.map((label, i) => (
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
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map(message => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
            {message.sender === 'agent' && (
              <div className="flex h-8 w-8 rounded-md bg-gray-100 dark:bg-gray-700 items-center justify-center mr-2 mt-1">
                <Icon size={16} className="text-gray-600 dark:text-gray-400" />
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
              
              {/* Render attachments if present */}
              {message.attachments?.map((attachment, i) => (
                <div key={i}>
                  {renderChart(attachment)}
                </div>
              ))}
              
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        
        {isProcessing && (
          <div className="flex">
            <div className="flex items-start space-x-2 max-w-[80%]">
              <div className="rounded-full p-1.5 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 mt-1">
                <Icon size={14} />
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-tl-none px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
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
            placeholder={`Ask ${agentTitle}...`}
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
            Send
          </Button>
        </form>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Note: This is an AI-generated response. Please review before taking action.
        </p>
      </div>
    </div>
  );
};

export default ChatInterface; 