const VERSION = 'balkiz-shell-v2.2.0';
const SHELL = ['/', '/index.html', '/styles.css?v=2.2.0', '/app.js?v=2.2.0', '/lib/knowledge.js?v=2.2.0', '/lib/science-sources.js?v=2.2.0', '/lib/guide-catalog.js?v=2.2.0', '/lib/retrieval.js?v=2.2.0', '/lib/advanced-templates.js?v=2.2.0', '/lib/activities.js?v=2.2.0', '/lib/templates.js?v=2.2.0', '/lib/expanded-templates.js?v=2.2.0', '/lib/files.js?v=2.2.0', '/lib/sse.js?v=2.2.0', '/assets/balkiz-mark.svg', '/assets/ilkyar-logo.png', '/manifest.webmanifest', '/vendor/marked.umd.js'];
const SHELL_PATHS = new Set(SHELL.map(path => path.split('?')[0]));
self.addEventListener('install', event => event.waitUntil((async () => {
  await (await caches.open(VERSION)).addAll(SHELL);
  // Versioned modules keep open pages coherent; take over without reloading a live chat.
  await self.skipWaiting();
})()));
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
  if (SHELL_PATHS.has(url.pathname)) {
    event.respondWith(caches.open(VERSION).then(async cache => (await cache.match(event.request)) || fetch(event.request).catch(async error => {
      // Earlier open pages can still read the shell if they go offline after an update.
      const fallback = await cache.match(event.request, { ignoreSearch: true });
      if (fallback) return fallback;
      throw error;
    })));
  }
});
