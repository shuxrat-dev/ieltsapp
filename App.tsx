
import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { WritingArea } from './components/WritingArea';
import { ProgressTracker } from './components/ProgressTracker';
import { Learn } from './components/Learn';
import { Essay, View } from './types';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [essays, setEssays] = useState<Essay[]>([]);
  const [currentView, setCurrentView] = useState<View>('write');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
    const savedEssays = localStorage.getItem('ielts-essays');
    if (savedEssays) {
      setEssays(JSON.parse(savedEssays));
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  const handleAddEssay = useCallback((newEssay: Essay) => {
    setEssays(prevEssays => {
        const updatedEssays = [...prevEssays, newEssay];
        localStorage.setItem('ielts-essays', JSON.stringify(updatedEssays));
        return updatedEssays;
    });
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case 'write':
        return <WritingArea onEssaySubmit={handleAddEssay} />;
      case 'progress':
        return <ProgressTracker essays={essays} />;
      case 'learn':
        return <Learn />;
      default:
        return <WritingArea onEssaySubmit={handleAddEssay} />;
    }
  };

  return (
    <div className={`flex h-screen bg-bkg-light dark:bg-bkg-dark text-primary-light dark:text-primary-dark font-sans transition-colors duration-300`}>
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
