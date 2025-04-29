import React from 'react';
import { X, Users, BrainCircuit, BookOpen } from 'lucide-react';
import Button from './Button';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mr-3">
              <BrainCircuit className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome to Meesho HR Agents</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="px-6 py-5 overflow-y-auto max-h-[calc(90vh-120px)]">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Welcome to the Meesho HR Agents Platform! This powerful platform is designed to revolutionize how your organization manages HR operations through AI-powered agents and centralized intelligence.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                  <Users className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">HR Agents Hub</h3>
                <p className="mt-1 text-gray-600 dark:text-gray-300">
                  Access specialized HR agents organized into three zones:
                </p>
                <ul className="mt-2 list-disc list-inside text-gray-600 dark:text-gray-300 ml-2 space-y-1">
                  <li>Employee Zone: Self-service tools for all employees</li>
                  <li>HR Zone: Powerful tools for HR professionals</li>
                  <li>Personal Agents: Customizable agents for your specific needs</li>
                </ul>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                  <BrainCircuit className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">OGI (Organizational General Intelligence)</h3>
                <p className="mt-1 text-gray-600 dark:text-gray-300">
                  Explore the collective knowledge of your organization through:
                </p>
                <ul className="mt-2 list-disc list-inside text-gray-600 dark:text-gray-300 ml-2 space-y-1">
                  <li>Dynamic Knowledge Map: Visualize relationships between HR concepts</li>
                  <li>Central Chat Assistant: Ask complex questions across all HR data</li>
                  <li>Actionable Insights: Get recommendations based on organizational patterns</li>
                </ul>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Getting Started</h3>
                <p className="mt-1 text-gray-600 dark:text-gray-300">
                  To begin using the platform:
                </p>
                <ol className="mt-2 list-decimal list-inside text-gray-600 dark:text-gray-300 ml-2 space-y-1">
                  <li>Select an agent from the HR Agents Hub</li>
                  <li>Interact with the agent using natural language</li>
                  <li>Explore the OGI tab to discover organizational insights</li>
                  <li>Customize your experience by using personal agents</li>
                </ol>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p>
              <strong>Note:</strong> This platform is powered by AI agents from the Lyzr platform. Each agent helps you complete specific HR tasks faster and more intelligently.
            </p>
          </div>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex justify-end">
          <Button variant="primary" onClick={onClose}>
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;