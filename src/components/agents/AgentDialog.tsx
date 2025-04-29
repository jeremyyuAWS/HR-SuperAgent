import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { AgentType, ChatMessage } from '../../types';
import { getAgentIcon } from '../../data/agentsData';
import ChatInterface from '../chat/ChatInterface';
import { chatService } from '../../services/chatService';

interface AgentDialogProps {
  agent: AgentType;
  onClose: () => void;
}

const AgentDialog: React.FC<AgentDialogProps> = ({ agent, onClose }) => {
  const Icon = getAgentIcon(agent.icon);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load chat history on mount
  useEffect(() => {
    try {
      const history = chatService.loadChatHistory(agent.id);
      if (history.length > 0) {
        setMessages(history);
      } else {
        // Create initial messages from example prompt and response
        setMessages([
          {
            id: '1',
            sender: 'user',
            text: agent.examplePrompt || 'Hello!',
            timestamp: new Date()
          },
          {
            id: '2',
            sender: 'agent',
            text: agent.exampleResponse || 'How can I help you today?',
            timestamp: new Date()
          }
        ]);
      }
    } catch (err) {
      setError('Failed to load chat history');
      console.error('Error loading chat history:', err);
    } finally {
      setIsLoading(false);
    }
  }, [agent.id, agent.examplePrompt, agent.exampleResponse]);

  const handleSendMessage = async (message: string): Promise<ChatMessage> => {
    try {
      // Add user message immediately
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: 'user',
        text: message,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);

      // Process message through chat service
      const response = await chatService.processMessage(agent, message);
      
      // Update messages with response
      setMessages(prev => [...prev, response]);
      
      // Save updated chat history
      chatService.saveChatHistory(agent.id, [...messages, userMessage, response]);
      
      return response;
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('Failed to send message. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
          <p>Loading chat history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
          <p className="text-red-500">{error}</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="rounded-lg p-2.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mr-3">
              <Icon size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">{agent.title}</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">{agent.description}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Chat Interface */}
        <ChatInterface
          agentIcon={Icon}
          agentTitle={agent.title}
          onSendMessage={handleSendMessage}
          initialMessages={messages}
        />
      </div>
    </div>
  );
};

export default AgentDialog;