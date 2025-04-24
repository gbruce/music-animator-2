import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Panel({ isOpen, onToggle }: PanelProps) {
  return (
    <div className="h-full relative bg-background">
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 h-8 w-8 bg-muted"
        onClick={onToggle}
      >
        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </Button>

      {/* Panel Content */}
      <div className="h-full p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium">Videos Space</h2>
        </div>

        {/* Empty Media Grid */}
        <div className="grid grid-cols-1 gap-4">
          {/* Content will be populated dynamically */}
        </div>
      </div>
    </div>
  );
} 