import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Trash2, AlertCircle } from 'lucide-react';
import { useVideos } from '@/hooks/useVideos';
import { formatFileSize } from '@/lib/utils';
import { videoService, VideoMetadata } from '@/services/videoService';
import Image from 'next/image';

interface PanelProps {
  isOpen: boolean;
  onToggle: () => void;
}

function VideoItem({ video, onDelete }: { video: VideoMetadata; onDelete: () => void }) {
  const thumbnailUrl = videoService.getThumbnailUrl(video);

  return (
    <div className="group relative rounded-md overflow-hidden border border-border">
      {/* Thumbnail */}
      <div className="aspect-video relative">
        <Image
          src={thumbnailUrl}
          alt={video.originalName}
          fill
          className="object-cover"
          sizes="(max-width: 300px) 100vw, 300px"
        />
      </div>

      {/* Video Info */}
      <div className="p-3 bg-background">
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{video.originalName}</p>
            <p className="text-xs text-muted-foreground">
              {formatFileSize(video.size)}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={onDelete}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function Panel({ isOpen, onToggle }: PanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { videos, isLoading, error, fetchVideos, uploadVideo, deleteVideo } = useVideos();

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await uploadVideo(file);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      // Clear the input
      event.target.value = '';
    }
  };

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
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="video/*"
            onChange={handleFileChange}
          />
          <Button 
            className="w-full gap-2 bg-accent hover:bg-accent/90 h-10"
            onClick={handleUploadClick}
            disabled={isLoading}
          >
            <Upload size={16} />
            <span>{isLoading ? 'Uploading...' : 'Upload Media'}</span>
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-md flex items-center gap-2">
            <AlertCircle size={16} />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Videos Grid */}
        <div className="grid grid-cols-1 gap-4">
          {videos.map((video) => (
            <VideoItem
              key={video.id}
              video={video}
              onDelete={() => deleteVideo(video.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 