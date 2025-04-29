import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import TabView from './TabView';
import HRAgentsHub from '../tabs/HRAgentsHub';
import OGITab from '../tabs/OGITab';
import WelcomeModal from '../ui/WelcomeModal';

const AppLayout: React.FC = () => {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  
  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem('hasVisitedHRPlatform');
    if (!hasVisited) {
      setShowWelcomeModal(true);
      localStorage.setItem('hasVisitedHRPlatform', 'true');
    }
  }, []);
  
  const tabs = [
    { id: 'hr-agents', label: 'HR Agents Hub', content: <HRAgentsHub /> },
    { id: 'ogi', label: 'OGI', content: <OGITab /> }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <TabView tabs={tabs} />
        </div>
      </main>
      <WelcomeModal isOpen={showWelcomeModal} onClose={() => setShowWelcomeModal(false)} />
    </div>
  );
};

export default AppLayout;