// Split UTF-8, CRLF and a final event without a trailing newline.
export async function* readSSE(body) {
  const reader = body.getReader(), decoder = new TextDecoder();
  let buffer = '', finished = false;
  try {
    while (!finished) {
      const { value, done } = await reader.read();
      finished = done; buffer += decoder.decode(value || new Uint8Array(), { stream: !done });
      buffer = buffer.replace(/\r\n/g, '\n');
      let end;
      while ((end = buffer.indexOf('\n\n')) !== -1) {
        const event = buffer.slice(0, end); buffer = buffer.slice(end + 2);
        const data = event.split('\n').filter(line => line.startsWith('data:')).map(line => line.slice(5).trimStart()).join('\n');
        if (data) yield data;
      }
      if (buffer.length > 1000000) throw new Error('Yanıt akışı geçersiz.');
    }
    const data = buffer.split('\n').filter(line => line.startsWith('data:')).map(line => line.slice(5).trimStart()).join('\n');
    if (data) yield data;
  } finally {
    if (!finished) await reader.cancel().catch(() => {});
    reader.releaseLock();
  }
}

export const encodeEvent = value => new TextEncoder().encode(`data: ${JSON.stringify(value)}\n\n`);
