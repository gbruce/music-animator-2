'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Play, Undo, Redo, Mic, Settings } from 'lucide-react';

export default function Home() {
  return (
    <MainLayout>
      <div className="flex flex-col h-full">
        {/* Top Bar */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Undo size={16} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Redo size={16} />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">100%</span>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings size={16} />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="rounded-lg border border-border bg-muted/30 h-[calc(100vh-12rem)] flex items-center justify-center">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent mb-4">
                <Play size={24} className="text-background" />
              </div>
              <p className="text-sm text-muted-foreground">
                Drop media here or select from library
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="h-24 border-t border-border p-4">
          <div className="flex items-center gap-4 mb-2">
            <Button size="sm" className="h-8">
              <Play size={16} className="mr-2" />
              Play
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Mic size={16} />
            </Button>
          </div>
          <div className="h-1 bg-muted rounded-full">
            <div className="h-full w-0 bg-accent rounded-full" />
          </div>
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>00:00</span>
            <span>01:00</span>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 