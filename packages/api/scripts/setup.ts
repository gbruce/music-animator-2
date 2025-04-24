import { ensureDirectories } from '../src/utils/ensureDirectories';
import fs from 'fs';
import path from 'path';

// Create .gitkeep files
function createGitKeep(dir: string) {
  const gitkeepPath = path.join(dir, '.gitkeep');
  fs.writeFileSync(gitkeepPath, '');
  console.log(`Created .gitkeep in ${dir}`);
}

// Setup directories
ensureDirectories();

// Add .gitkeep files
createGitKeep(path.join(__dirname, '../uploads'));
createGitKeep(path.join(__dirname, '../uploads/videos')); 