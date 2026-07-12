import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const ROOT = process.argv[2] || 'dist';
const PORT = Number(process.argv[3] || 4330);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.webmanifest': 'application/manifest+json',
};

const server = http.createServer(async (req, res) => {
  try {
    let urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    if (urlPath.endsWith('/')) urlPath += 'index.html';
    const filePath = normalize(join(ROOT, urlPath));
    if (!filePath.startsWith(normalize(ROOT))) {
      res.writeHead(403).end('Forbidden');
      return;
    }
    let target = filePath;
    try {
      const s = await stat(target);
      if (s.isDirectory()) target = join(target, 'index.html');
    } catch {
      // SPA-ish fallback: try .html, then index.html
      const asHtml = target + '.html';
      try {
        await stat(asHtml);
        target = asHtml;
      } catch {
        target = join(ROOT, 'index.html');
      }
    }
    const data = await readFile(target);
    const type = MIME[extname(target).toLowerCase()] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-cache' });
    res.end(data);
  } catch (err) {
    res.writeHead(404, { 'Content-Type': 'text/plain' }).end('404 Not Found');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`static server on http://0.0.0.0:${PORT} (root: ${ROOT})`);
});
