import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Upload } from 'lucide-react';

interface PanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Panel({ isOpen, onToggle }: PanelProps) {
  return (
    <div className="h-full bg-background flex flex-col">
      {/* Panel Content */}
      <div className="flex-1 p-4 overflow-auto">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-sm font-medium">Videos Space</h2>
        </div>

        {/* Upload Button */}
        <div className="mb-4">
          <Button className="w-full gap-2 bg-accent hover:bg-accent/90 h-10">
            <Upload size={16} />
            <span>Upload Media</span>
          </Button>
        </div>

        {/* Empty Media Grid */}
        <div className="grid grid-cols-1 gap-4">
          {/* Content will be populated dynamically */}
        </div>
      </div>
    </div>
  );
} 