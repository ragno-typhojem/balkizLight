import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, extname, sep } from 'node:path';
import handler from '../api/chat.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const port = Number(process.env.PORT || 3000);
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.webmanifest': 'application/manifest+json' };
const config = JSON.parse(await readFile(resolve(root, 'vercel.json'), 'utf8'));
const server = http.createServer(async (req, res) => {
  const controller = new AbortController();
  res.on('close', () => { if (!res.writableFinished) controller.abort(); });
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const rule = config.headers.find(item => item.source === '/(.*)');
    for (const header of rule?.headers || []) res.setHeader(header.key, header.value);
    if (url.pathname === '/api/chat') {
      const headers = new Headers(); for (const [key, value] of Object.entries(req.headers)) if (value) headers.set(key, Array.isArray(value) ? value.join(', ') : value);
      headers.set('x-forwarded-for', req.socket.remoteAddress || 'local');
      const body = ['GET', 'HEAD'].includes(req.method) ? undefined : req;
      const request = new Request(url, { method: req.method, headers, body, duplex: 'half', signal: controller.signal });
      const response = await handler(request); res.statusCode = response.status;
      for (const [key, value] of response.headers) res.setHeader(key, value);
      if (response.body) {
        const reader = response.body.getReader();
        try {
          while (!controller.signal.aborted) {
            const { value, done } = await reader.read(); if (done) break;
            if (!res.write(value)) await new Promise(resolve => { res.once('drain', resolve); res.once('close', resolve); });
          }
        } finally { if (controller.signal.aborted) await reader.cancel().catch(() => {}); reader.releaseLock(); }
      }
      res.end(); return;
    }
    const pathname = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
    const path = resolve(root, `.${pathname}`);
    const allowed = ['/index.html', '/styles.css', '/app.js', '/sw.js', '/manifest.webmanifest'].includes(pathname) || /^\/(assets|vendor|lib)\//.test(pathname);
    if (!allowed || !path.startsWith(root + sep) || pathname.includes('..')) { res.writeHead(404); res.end('Not found'); return; }
    const content = await readFile(path); res.setHeader('Content-Type', `${types[extname(path)] || 'application/octet-stream'}; charset=utf-8`);
    res.setHeader('Cache-Control', 'no-cache'); res.end(content);
  } catch { if (!res.headersSent) res.writeHead(404); res.end('Not found'); }
});
server.listen(port, '127.0.0.1', () => console.log(`BALKIZ local preview: http://127.0.0.1:${port}`));
