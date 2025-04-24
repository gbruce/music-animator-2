import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

interface PanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface MediaItemProps {
  thumbnail: string;
  duration: string;
}

function MediaItem({ thumbnail, duration }: MediaItemProps) {
  return (
    <div className="relative group cursor-pointer">
      <div className="aspect-video rounded-md overflow-hidden bg-muted">
        <img src={thumbnail} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute bottom-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-background/80 text-xs">
        <Clock size={12} />
        <span>{duration}</span>
      </div>
    </div>
  );
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

        {/* Media Grid */}
        <div className="grid grid-cols-1 gap-4">
          <MediaItem 
            thumbnail="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180' viewBox='0 0 320 180'%3E%3Crect width='320' height='180' fill='%232A2D3E'/%3E%3C/svg%3E"
            duration="00:15"
          />
          <MediaItem 
            thumbnail="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180' viewBox='0 0 320 180'%3E%3Crect width='320' height='180' fill='%232A2D3E'/%3E%3C/svg%3E"
            duration="00:10"
          />
          <MediaItem 
            thumbnail="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180' viewBox='0 0 320 180'%3E%3Crect width='320' height='180' fill='%232A2D3E'/%3E%3C/svg%3E"
            duration="00:10"
          />
        </div>
      </div>
    </div>
  );
} 