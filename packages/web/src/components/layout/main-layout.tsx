import React from 'react';
import { Sidebar } from './sidebar';
import { Panel } from './panel';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isPanelOpen, setIsPanelOpen] = React.useState(true);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Middle Panel - Fixed width */}
      <div className={`
        transition-all duration-300 ease-in-out
        ${isPanelOpen ? 'w-[300px]' : 'w-0'}
        border-r border-border
        overflow-hidden
      `}>
        <Panel 
          isOpen={isPanelOpen} 
          onToggle={() => setIsPanelOpen(!isPanelOpen)} 
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
} 