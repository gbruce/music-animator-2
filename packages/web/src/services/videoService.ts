const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface VideoMetadata {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  uploadDate: Date;
  directory: string;
  thumbnail: string;
}

export const videoService = {
  async getAllVideos(): Promise<VideoMetadata[]> {
    const response = await fetch(`${API_URL}/api/videos`);
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to fetch videos: ${error}`);
    }
    return response.json();
  },

  async uploadVideo(file: File): Promise<VideoMetadata> {
    const formData = new FormData();
    formData.append('video', file);

    const response = await fetch(`${API_URL}/api/videos/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to upload video: ${error}`);
    }
    return response.json();
  },

  async deleteVideo(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/api/videos/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to delete video: ${error}`);
    }
  },

  getThumbnailUrl(video: VideoMetadata): string {
    return `${API_URL}/uploads/${video.directory}/${video.thumbnail}`;
  },

  getVideoUrl(video: VideoMetadata): string {
    return `${API_URL}/uploads/${video.directory}/${video.filename}`;
  }
}; 