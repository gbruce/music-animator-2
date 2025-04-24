import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config';
import { extractFirstFrame } from '../utils/videoProcessing';

const router = Router();

// Configure multer for video upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Generate UUID for the video
    const videoId = uuidv4();
    
    // Create video-specific directory
    const videoDir = path.join(config.videosDir, videoId);
    fs.mkdirSync(videoDir, { recursive: true });
    
    // Store the videoId for use in the filename callback
    req.videoId = videoId;
    
    cb(null, videoDir);
  },
  filename: (req, file, cb) => {
    // Use the videoId from the destination callback
    const ext = path.extname(file.originalname);
    const filename = `source${ext}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Accept only video files
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed'));
    }
  },
  limits: {
    fileSize: config.maxFileSize,
  },
});

// Add videoId to Request type
declare module 'express-serve-static-core' {
  interface Request {
    videoId?: string;
  }
}

// Video metadata storage
interface VideoMetadata {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  uploadDate: Date;
  directory: string;
  thumbnail: string;
}

const videos = new Map<string, VideoMetadata>();

// Get all videos
router.get('/', (req, res) => {
  const videoList = Array.from(videos.values());
  res.json(videoList);
});

// Upload a video
router.post('/upload', upload.single('video'), async (req, res) => {
  try {
    if (!req.file || !req.videoId) {
      return res.status(400).json({ error: 'No video file provided' });
    }

    const videoDir = path.join(config.videosDir, req.videoId);
    const videoPath = path.join(videoDir, req.file.filename);
    const thumbnailPath = path.join(videoDir, 'thumbnail.jpg');

    // Extract thumbnail
    try {
      await extractFirstFrame(videoPath, thumbnailPath);
    } catch (error) {
      console.error('Failed to generate thumbnail:', error);
      // Continue without thumbnail if generation fails
    }

    const videoMetadata: VideoMetadata = {
      id: req.videoId,
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      uploadDate: new Date(),
      directory: path.join('videos', req.videoId),
      thumbnail: 'thumbnail.jpg'
    };

    videos.set(videoMetadata.id, videoMetadata);
    res.status(201).json(videoMetadata);
  } catch (error) {
    // Clean up the directory if upload fails
    if (req.videoId) {
      const videoDir = path.join(config.videosDir, req.videoId);
      if (fs.existsSync(videoDir)) {
        fs.rmSync(videoDir, { recursive: true, force: true });
      }
    }
    res.status(500).json({ error: 'Failed to upload video' });
  }
});

// Add route to serve static files
router.get('/file/:id/:filename', (req, res) => {
  const { id, filename } = req.params;
  const video = videos.get(id);

  if (!video) {
    return res.status(404).json({ error: 'Video not found' });
  }

  const filePath = path.join(config.videosDir, id, filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  res.sendFile(filePath);
});

// Delete a video
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const video = videos.get(id);

  if (!video) {
    return res.status(404).json({ error: 'Video not found' });
  }

  try {
    // Delete the entire video directory
    const videoDir = path.join(config.videosDir, video.id);
    if (fs.existsSync(videoDir)) {
      fs.rmSync(videoDir, { recursive: true, force: true });
    }
    videos.delete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete video' });
  }
});

export default router; 