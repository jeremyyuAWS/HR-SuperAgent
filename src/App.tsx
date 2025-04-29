import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import AppLayout from './components/layout/AppLayout';

function App() {
  return (
    <ThemeProvider>
      <AppLayout />
    </ThemeProvider>
  );
}

export default App;