import { readdir, readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
const paths = ['app.js', 'sw.js', ...(await readdir('lib')).filter(f => f.endsWith('.js')).map(f => `lib/${f}`), 'api/chat.js'];
for (const path of paths) execFileSync(process.execPath, ['--check', path], { stdio: 'inherit' });
for (const path of ['manifest.webmanifest', 'vercel.json']) JSON.parse(await readFile(path, 'utf8'));
console.log('JavaScript and deployment configuration valid.');
