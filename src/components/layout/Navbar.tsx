import React from 'react';
import { BrainCircuit } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-9 h-9 rounded bg-black text-white mr-3">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <span className="text-lg font-medium text-gray-900 dark:text-white">Meesho HR Agents</span>
          </div>
          
          <div className="flex items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400 mr-4">v1.0</span>
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">HR Platform</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;