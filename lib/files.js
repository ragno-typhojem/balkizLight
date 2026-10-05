export const FILE_LIMITS = { count: 3, bytes: 5 * 1024 * 1024, totalBytes: 10 * 1024 * 1024, characters: 24000, totalCharacters: 48000, pages: 30 };
const TYPES = new Set(['pdf', 'docx', 'txt', 'md', 'csv', 'json']);

export function validateFile(file) {
  const extension = file.name.split('.').at(-1).toLowerCase();
  if (!TYPES.has(extension)) throw new Error('PDF, DOCX, TXT, MD, CSV veya JSON dosyası seç. Görsel ve taranmış belgelerden metin okuyamıyorum.');
  if (!file.size || file.size > FILE_LIMITS.bytes) throw new Error('Bir dosya en fazla 5 MB olabilir ve boş olmamalı.');
  return extension;
}

async function readPDF(bytes) {
  const pdfjs = await import('/vendor/pdfjs/pdf.min.mjs');
  pdfjs.GlobalWorkerOptions.workerSrc = '/vendor/pdfjs/pdf.worker.min.mjs';
  const task = pdfjs.getDocument({ data: bytes, isEvalSupported: false, useSystemFonts: true });
  let document;
  try {
    document = await task.promise;
    const pages = Math.min(document.numPages, FILE_LIMITS.pages), texts = []; let size = 0;
    for (let pageNumber = 1; pageNumber <= pages && size < FILE_LIMITS.characters; pageNumber++) {
      const page = await document.getPage(pageNumber);
      const content = await page.getTextContent();
      const text = content.items.map(item => ('str' in item ? item.str + (item.hasEOL ? '\n' : ' ') : '')).join('');
      texts.push(`[Sayfa ${pageNumber}]\n${text}`); size += text.length; page.cleanup();
    }
    return { text: texts.join('\n\n'), partial: document.numPages > pages || size > FILE_LIMITS.characters };
  } catch (error) {
    throw new Error(error.name === 'PasswordException' ? 'Parolalı PDF okunamıyor. Parolasız bir kopya seç.' : 'PDF okunamadı. Metin içeren, parolasız bir PDF seç.');
  } finally { await task.destroy(); }
}

async function readDOCX(bytes) {
  // Inspect the ZIP central directory before inflating; guard against ZIP bombs.
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let expanded = 0, entries = 0, documentSize = 0;
  for (let i = 0; i + 46 <= bytes.length; i++) {
    if (view.getUint32(i, true) !== 0x02014b50) continue;
    const size = view.getUint32(i + 24, true), nameLength = view.getUint16(i + 28, true), extra = view.getUint16(i + 30, true), comment = view.getUint16(i + 32, true);
    const name = new TextDecoder().decode(bytes.slice(i + 46, i + 46 + nameLength));
    expanded += size; entries++;
    if (name === 'word/document.xml') documentSize = size;
    if (expanded > 30 * 1024 * 1024 || entries > 2000 || size === 0xffffffff) throw new Error('DOCX açılmış boyutu fazla büyük veya desteklenmeyen bir arşiv.');
    i += 45 + nameLength + extra + comment;
  }
  if (!documentSize || documentSize > 5 * 1024 * 1024) throw new Error('Geçerli, küçük bir DOCX belgesi seç.');
  const { unzip, strFromU8 } = await import('/vendor/fflate.mjs');
  const files = await new Promise((resolve, reject) => {
    unzip(bytes, { filter: entry => entry.name === 'word/document.xml' && entry.originalSize <= 5 * 1024 * 1024 }, (error, result) => error ? reject(error) : resolve(result));
  });
  if (!files['word/document.xml']) throw new Error('DOCX içindeki belge metni okunamadı.');
  const xml = new DOMParser().parseFromString(strFromU8(files['word/document.xml']), 'application/xml');
  if (xml.querySelector('parsererror')) throw new Error('DOCX belge yapısı bozuk.');
  const paragraphs = [...xml.getElementsByTagNameNS('*', 'p')];
  const text = paragraphs.map(paragraph => [...paragraph.getElementsByTagNameNS('*', 't')].map(node => node.textContent).join('')).join('\n');
  return { text, partial: false };
}

export async function extractFile(file) {
  const type = validateFile(file), bytes = new Uint8Array(await file.arrayBuffer());
  let result;
  if (type === 'pdf') result = await readPDF(bytes);
  else if (type === 'docx') result = await readDOCX(bytes);
  else result = { text: new TextDecoder('utf-8', { fatal: false }).decode(bytes), partial: false };
  const clean = result.text.replace(/\u0000/g, '').trim();
  if (clean.length < 8 || (type === 'pdf' && clean.replace(/\[Sayfa \d+\]/g, '').trim().length < 8)) throw new Error('Okunabilir metin yok. Taranmış PDF için OCR yapılmaz; metin içeren bir belge seç.');
  return { name: file.name.slice(0, 120), text: clean.slice(0, FILE_LIMITS.characters), size: file.size, partial: result.partial || clean.length > FILE_LIMITS.characters };
}
