import path from 'path';

// Base upload directory will be in the api package
const DEFAULT_UPLOAD_DIR = path.join(__dirname, '..', 'uploads');

export const config = {
  port: process.env.PORT || 3001,
  uploadDir: process.env.UPLOAD_DIR || DEFAULT_UPLOAD_DIR,
  // Videos will be in a subdirectory
  videosDir: path.join(process.env.UPLOAD_DIR || DEFAULT_UPLOAD_DIR, 'videos'),
  maxFileSize: 100 * 1024 * 1024, // 100MB limit
}; 