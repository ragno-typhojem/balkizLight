import { cp, mkdir, rm } from 'node:fs/promises';
// Only browser assets go into the static deployment directory.
await rm('public', { recursive: true, force: true });
await mkdir('public/lib', { recursive: true });
for (const file of ['index.html', 'styles.css', 'app.js', 'sw.js', 'manifest.webmanifest']) await cp(file, `public/${file}`);
for (const directory of ['assets', 'vendor']) await cp(directory, `public/${directory}`, { recursive: true });
for (const file of ['knowledge.js', 'science-sources.js', 'guide-catalog.js', 'retrieval.js', 'activities.js', 'templates.js', 'expanded-templates.js', 'advanced-templates.js', 'files.js', 'sse.js']) await cp(`lib/${file}`, `public/lib/${file}`);
console.log('BALKIZ static assets prepared. /api/chat remains a server-side Edge function.');
