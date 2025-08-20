const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'threeJs'); // Markdown 目录
const sidebarPath = path.join(__dirname, '_sidebar.md');

function walkDir(dir, prefix = '') {
  let mdFiles = [];
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      mdFiles = mdFiles.concat(walkDir(fullPath, prefix + file + '/'));
    } else if (file.endsWith('.md')) {
      mdFiles.push(prefix + file);
    }
  });
  return mdFiles;
}

const mdFiles = walkDir(docsDir);

// 生成 Markdown 格式的 sidebar
const sidebarContent = mdFiles
  .map(file => {
    const name = path.basename(file, '.md');
    const link = encodeURI(file);
    return `* [${name}](/threeJs/${link})`;
  })
  .join('\n');

fs.writeFileSync(sidebarPath, sidebarContent, 'utf-8');
console.log('✅ sidebar.md 已生成！');
