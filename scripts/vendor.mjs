import { copyFile, mkdir } from 'node:fs/promises';
await mkdir('vendor/pdfjs', { recursive: true });
for (const name of ['pdf.min.mjs', 'pdf.worker.min.mjs']) await copyFile(`node_modules/pdfjs-dist/build/${name}`, `vendor/pdfjs/${name}`);
await copyFile('node_modules/pdfjs-dist/LICENSE', 'vendor/pdfjs/LICENSE');
await copyFile('node_modules/fflate/esm/browser.js', 'vendor/fflate.mjs');
await copyFile('node_modules/fflate/LICENSE', 'vendor/FFLATE-LICENSE');
console.log('Local, lazy-loaded document readers copied with licenses.');
