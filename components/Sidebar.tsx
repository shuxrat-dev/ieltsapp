import React from 'react';
import { WriteIcon } from './icons/WriteIcon';
import { ProgressIcon } from './icons/ProgressIcon';
import { LearnIcon } from './icons/LearnIcon';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
  const activeClasses = 'bg-white/20 text-white';
  const inactiveClasses = 'text-gray-300 hover:bg-white/10 hover:text-white';

  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center space-x-3 px-4 py-3 rounded-lg 
        transition-all duration-200 ease-in-out transform hover:scale-105
        ${isActive ? activeClasses : inactiveClasses}
      `}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  return (
    <aside className="
      hidden md:flex flex-col w-64 p-4 
      bg-gradient-to-b from-black/40 to-black/20
      backdrop-blur-2xl border-r border-white/10
    ">
      <div className="flex items-center space-x-2 mb-12 px-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-red-500 animate-pulse-glow"></div>
        <h1 className="text-xl font-bold text-white">IELTS AI Coach</h1>
      </div>
      <nav className="flex flex-col space-y-2">
        <NavItem
          icon={<WriteIcon className="w-6 h-6" />}
          label="Write"
          isActive={currentView === 'write'}
          onClick={() => setCurrentView('write')}
        />
        <NavItem
          icon={<ProgressIcon className="w-6 h-6" />}
          label="Progress"
          isActive={currentView === 'progress'}
          onClick={() => setCurrentView('progress')}
        />
        <NavItem
          icon={<LearnIcon className="w-6 h-6" />}
          label="Learn"
          isActive={currentView === 'learn'}
          onClick={() => setCurrentView('learn')}
        />
      </nav>
    </aside>
  );
};
