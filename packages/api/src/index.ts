import express from 'express';
import cors from 'cors';
import { config } from './config';
import { ensureDirectories } from './utils/ensureDirectories';
import videosRouter from './routes/videos';

// Ensure upload directories exist
ensureDirectories();

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static(config.uploadDir));

// Mount the videos router
app.use('/api/videos', videosRouter);

// Add a test route to verify server is running
app.get('/', (req, res) => {
  res.json({ message: 'API Server is running' });
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
  console.log(`Upload directory: ${config.uploadDir}`);
  console.log(`Videos directory: ${config.videosDir}`);
});

export default app; 