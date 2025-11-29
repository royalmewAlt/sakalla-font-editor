import fs from 'fs';
import path from 'path';

// Get all source files
const filesToPush = [];
const excludeDirs = ['.git', 'node_modules', '.next', 'dist', '.cache', '.output'];

function walkDir(dir, baseDir = '') {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const relPath = baseDir ? `${baseDir}/${file}` : file;
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      if (!excludeDirs.includes(file) && !file.startsWith('.')) {
        walkDir(fullPath, relPath);
      }
    } else {
      if (!file.startsWith('.') || file === '.gitignore') {
        filesToPush.push(relPath);
      }
    }
  }
}

walkDir('.');

console.log('Files to push:');
filesToPush.slice(0, 20).forEach(f => console.log('  -', f));
if (filesToPush.length > 20) console.log(`  ... and ${filesToPush.length - 20} more`);
console.log(`\nTotal: ${filesToPush.length} files`);
