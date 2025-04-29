import React, { useState, useEffect, useRef } from 'react';
import { X, Send, ChevronDown, PanelRightOpen, BarChart } from 'lucide-react';
import { AgentType } from '../../types';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { getAgentIcon } from '../../data/agentsData';

interface AgentDialogProps {
  agent: AgentType;
  onClose: () => void;
}

const AgentDialog: React.FC<AgentDialogProps> = ({ agent, onClose }) => {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  const Icon = getAgentIcon(agent.icon);
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showResponse]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;
    
    setIsProcessing(true);
    
    // Simulate agent processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowResponse(true);
    }, 1500);
  };
  
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
        
        {/* Chat area */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* Example prompt */}
          <div className="flex flex-col space-y-4">
            <div className="flex justify-end">
              <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 rounded-2xl rounded-tr-none px-4 py-2 max-w-[80%]">
                <p className="text-sm">{agent.examplePrompt}</p>
              </div>
            </div>
            
            {/* Example response */}
            <div className="flex">
              <div className="flex items-start space-x-2 max-w-[80%]">
                <div className="rounded-full p-1.5 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 mt-1">
                  <Icon size={14} />
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-tl-none px-4 py-2">
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    {agent.exampleResponse}
                  </p>
                </div>
              </div>
            </div>
            
            {/* User input message */}
            {input && isProcessing && (
              <div className="flex justify-end">
                <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 rounded-2xl rounded-tr-none px-4 py-2 max-w-[80%]">
                  <p className="text-sm">{input}</p>
                </div>
              </div>
            )}
            
            {/* Agent processing indicator */}
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
            
            {/* Agent response */}
            {showResponse && (
              <>
                <div className="flex">
                  <div className="flex items-start space-x-2 max-w-[80%]">
                    <div className="rounded-full p-1.5 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 mt-1">
                      <Icon size={14} />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-tl-none px-4 py-2">
                      <p className="text-sm text-gray-800 dark:text-gray-200">
                        {agent.exampleResponse?.replace('Example: ', '')}
                      </p>
                      
                      {/* Optional visual attachment based on agent type */}
                      {agent.category === 'hr' && (
                        <div className="mt-3 border-t border-gray-200 dark:border-gray-600 pt-3">
                          <button 
                            className="flex items-center text-sm text-indigo-600 dark:text-indigo-400"
                            onClick={() => setShowDetails(!showDetails)}
                          >
                            <span>Show detailed analysis</span>
                            <ChevronDown size={16} className={`ml-1 transform transition-transform ${showDetails ? 'rotate-180' : ''}`} />
                          </button>
                          
                          {showDetails && (
                            <div className="mt-3 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                              <div className="p-3 bg-white dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-300">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="font-semibold">Metrics Breakdown</span>
                                  <div className="flex space-x-2">
                                    <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                      <PanelRightOpen size={14} />
                                    </button>
                                    <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                      <BarChart size={14} />
                                    </button>
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span>Engineering</span>
                                    <span className="font-medium">15%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                    <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '15%' }}></div>
                                  </div>
                                  
                                  <div className="flex justify-between">
                                    <span>Marketing</span>
                                    <span className="font-medium">10%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                    <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '10%' }}></div>
                                  </div>
                                  
                                  <div className="flex justify-between">
                                    <span>Sales</span>
                                    <span className="font-medium">14%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                    <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '14%' }}></div>
                                  </div>
                                  
                                  <div className="flex justify-between">
                                    <span>Product</span>
                                    <span className="font-medium">8%</span>
                                  </div>
                                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                    <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '8%' }}></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
            
            <div ref={messageEndRef} />
          </div>
        </div>
        
        {/* Input area */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-5">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              ref={inputRef}
              type="text"
              placeholder={`Ask ${agent.title}...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              fullWidth
              className="flex-1"
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
    </div>
  );
};

export default AgentDialog;