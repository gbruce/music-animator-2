import { useState, useCallback } from 'react';
import { videoService, VideoMetadata } from '@/services/videoService';

export function useVideos() {
  const [videos, setVideos] = useState<VideoMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedVideos = await videoService.getAllVideos();
      setVideos(fetchedVideos);
    } catch (err) {
      setError('Failed to fetch videos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const uploadVideo = useCallback(async (file: File) => {
    try {
      setIsLoading(true);
      setError(null);
      const newVideo = await videoService.uploadVideo(file);
      setVideos(prev => [...prev, newVideo]);
      return newVideo;
    } catch (err) {
      setError('Failed to upload video');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteVideo = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await videoService.deleteVideo(id);
      setVideos(prev => prev.filter(video => video.id !== id));
    } catch (err) {
      setError('Failed to delete video');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    videos,
    isLoading,
    error,
    fetchVideos,
    uploadVideo,
    deleteVideo,
  };
} 