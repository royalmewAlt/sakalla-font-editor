import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const excludeDirs = ['.git', 'node_modules', '.next', 'dist', '.cache', '.output'];

function getFiles(dir, baseDir = '') {
  const files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const relPath = baseDir ? `${baseDir}/${item}` : item;
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      if (!excludeDirs.includes(item) && !item.startsWith('.')) {
        files.push(...getFiles(fullPath, relPath));
      }
    } else {
      if (!item.startsWith('.') || item === '.gitignore') {
        files.push({ path: relPath, fullPath });
      }
    }
  }
  return files;
}

async function deployToGitHub() {
  console.log('Starting GitHub deployment...');
  
  // Get all files
  const files = getFiles('.');
  console.log(`Found ${files.length} files to deploy`);
  
  // Read files and create tree
  const trees = [];
  for (const file of files) {
    try {
      const content = fs.readFileSync(file.fullPath, 'utf-8');
      trees.push({
        path: file.path,
        mode: '100644',
        type: 'blob',
        content: content
      });
    } catch (e) {
      console.error(`Error reading ${file.path}:`, e.message);
    }
  }
  
  console.log(`Prepared ${trees.length} files for commit`);
  console.log('Ready to push to GitHub!');
  
  // Save for later use
  fs.writeFileSync('/tmp/github-files.json', JSON.stringify(trees, null, 2));
}

deployToGitHub();
