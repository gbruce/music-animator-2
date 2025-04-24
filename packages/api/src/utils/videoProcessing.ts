import { spawn } from 'child_process';
import path from 'path';

export async function extractFirstFrame(
  videoPath: string,
  outputPath: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    // FFmpeg command to extract first frame
    const ffmpeg = spawn('ffmpeg', [
      '-i', videoPath,           // Input file
      '-vf', 'select=eq(n\\,0)', // Select first frame
      '-frames:v', '1',          // Extract only one frame
      '-y',                      // Overwrite output file if exists
      outputPath                 // Output file
    ]);

    let errorMessage = '';

    ffmpeg.stderr.on('data', (data) => {
      errorMessage += data.toString();
    });

    ffmpeg.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`FFmpeg failed: ${errorMessage}`));
      }
    });

    ffmpeg.on('error', (err) => {
      reject(new Error(`Failed to start FFmpeg: ${err.message}`));
    });
  });
} 