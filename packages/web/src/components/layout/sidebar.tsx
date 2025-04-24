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
      className={`w-full flex-col gap-1 py-2 ${
        isActive ? 'bg-muted hover:bg-muted' : 'hover:bg-muted'
      } text-xs h-auto`}
    >
      {icon}
      <span className="text-center">{label}</span>
    </Button>
  );
}

export function Sidebar() {
  return (
    <div className="w-[80px] border-r border-border bg-background flex flex-col h-full">
      {/* Logo/Brand */}
      <div className="p-3 border-b border-border">
        <h1 className="text-center text-sm font-bold">MA</h1>
      </div>

      {/* Upload Button */}
      <div className="p-3">
        <Button className="w-full flex-col gap-1 py-2 bg-accent hover:bg-accent/90">
          <Upload size={16} />
          <span className="text-xs">Upload</span>
        </Button>
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