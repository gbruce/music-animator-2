import React from 'react';
import { Sidebar } from './sidebar';
import { Panel } from './panel';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isPanelOpen, setIsPanelOpen] = React.useState(true);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Middle Panel Container */}
      <div className="relative flex">
        {/* Panel Content */}
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

        {/* Toggle Button Container - Always visible */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 bg-muted hover:bg-muted/90 shadow-md"
            onClick={() => setIsPanelOpen(!isPanelOpen)}
          >
            {isPanelOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
} 