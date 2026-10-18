import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

const zip = new JSZip();

function addFilesRecursively(dir, rootDir = dir) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    if (
      item === 'node_modules' ||
      item === '.git' ||
      item === 'dist' ||
      item === 'vk-mbbs-app.zip'
    ) {
      continue;
    }

    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      addFilesRecursively(fullPath, rootDir);
    } else {
      const relPath = path.relative(rootDir, fullPath);
      const content = fs.readFileSync(fullPath);
      zip.file(relPath, content);
    }
  }
}

const root = path.resolve('.');
addFilesRecursively(root, root);

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' }).then((buffer) => {
  const outputPath = path.join(publicDir, 'vk-mbbs-app.zip');
  fs.writeFileSync(outputPath, buffer);
  console.log(`ZIP created successfully at ${outputPath} (${(buffer.length / 1024).toFixed(1)} KB)`);
});
