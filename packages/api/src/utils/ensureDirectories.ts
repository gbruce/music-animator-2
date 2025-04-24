import fs from 'fs';
import { config } from '../config';

export function ensureDirectories(): void {
  const directories = [
    config.uploadDir,
    config.videosDir
  ];

  for (const dir of directories) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  }
} 