import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  FileVideo, 
  Layout, 
  Type, 
  Music, 
  Settings,
  Upload,
  Smartphone,
  Monitor,
  Tv
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

function SidebarItem({ icon, label, isActive }: SidebarItemProps) {
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start gap-2 ${
        isActive ? 'bg-muted hover:bg-muted' : 'hover:bg-muted'
      } text-sm h-10`}
    >
      {icon}
      <span>{label}</span>
    </Button>
  );
}

export function Sidebar() {
  return (
    <div className="w-[72px] hover:w-[240px] transition-all duration-300 border-r border-border bg-background flex flex-col h-full group">
      {/* Logo/Brand */}
      <div className="p-4 border-b border-border">
        <h1 className="text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">Music Animator</h1>
      </div>

      {/* Upload Button */}
      <div className="p-4">
        <Button className="w-full gap-2 bg-accent hover:bg-accent/90">
          <Upload size={16} />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">Upload</span>
        </Button>
      </div>

      {/* Device Selection */}
      <div className="px-4 py-2 border-y border-border">
        <div className="flex group-hover:justify-between justify-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Smartphone size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Monitor size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Tv size={16} />
          </Button>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-2 space-y-1">
        <SidebarItem icon={<FileVideo size={16} />} label="Media" isActive />
        <SidebarItem icon={<Layout size={16} />} label="Templates" />
        <SidebarItem icon={<Type size={16} />} label="Text" />
        <SidebarItem icon={<Music size={16} />} label="Audio" />
      </nav>

      {/* Bottom Section */}
      <div className="p-2 border-t border-border">
        <SidebarItem icon={<Settings size={16} />} label="Settings" />
      </div>
    </div>
  );
} 