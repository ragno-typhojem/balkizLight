const VERSION = 'balkiz-shell-v2.0.0';
const SHELL = ['/', '/index.html', '/styles.css', '/app.js', '/lib/knowledge.js', '/lib/templates.js', '/lib/files.js', '/lib/sse.js', '/assets/balkiz-mark.svg', '/assets/ilkyar-logo.png', '/manifest.webmanifest', '/vendor/marked.umd.js'];
self.addEventListener('install', event => event.waitUntil(caches.open(VERSION).then(cache => cache.addAll(SHELL))));
self.addEventListener('activate', event => event.waitUntil((async () => {
  for (const key of await caches.keys()) if (key.startsWith('balkiz-shell-') && key !== VERSION) await caches.delete(key);
  await self.clients.claim();
})()));
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  // Never cache AI traffic, private chats or external requests.
  if (event.request.method !== 'GET' || url.origin !== self.location.origin || url.pathname.startsWith('/api/')) return;
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).catch(() => caches.match('/index.html'))); return;
  }
  if (SHELL.includes(url.pathname)) {
    event.respondWith(caches.open(VERSION).then(async cache => (await cache.match(event.request)) || fetch(event.request)));
  }
});
