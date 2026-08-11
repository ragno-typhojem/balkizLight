// api/chat.js
// Vercel Serverless Function (Edge) — Groq API'ye güvenli, gerçek zamanlı akış (SSE) proxy'si.
// API key yalnızca sunucu tarafında (process.env.GROQ_API_KEY) okunur, tarayıcıya asla gönderilmez.

export const config = {
  runtime: 'edge',
};

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'openai/gpt-oss-120b';

// Basit bellek-içi hız sınırlama (edge fonksiyon instance'ı başına).
const rateMap = new Map();
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 20;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now - entry.start > RATE_WINDOW_MS) {
    rateMap.set(ip, { start: now, count: 1 });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_MAX;
}

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

// Prompt anlama gücünü artıran sistem talimatı: rol netliği, netlik önceliği,
// belirsizlikte tek makul varsayımla ilerleme, yapılandırılmış çıktı disiplini.
const SYSTEM_PROMPT = {
  role: 'system',
  content: `Sen BALKIZ adında, Türkçe konuşan, son derece yetkin bir yapay zekâ asistanısın.

Temel ilkelerin:
- Kullanıcının asıl niyetini anlamaya odaklan; soruyu yüzeysel değil, arkasındaki gerçek ihtiyaca göre yanıtla.
- İstek belirsizse, en makul yorumu seç ve varsayımını kısaca belirterek devam et; gereksiz yere soru sorup kullanıcıyı bekletme.
- Teknik konularda (kod, matematik, veri) kesin, doğrulanabilir ve çalışır cevaplar ver; kod bloklarını her zaman doğru dil etiketiyle işaretle.
- Emin olmadığın bilgilerde bunu açıkça belirt, uydurma bilgi (halüsinasyon) verme.
- Yanıtın uzunluğunu içeriğe göre ayarla: basit sorulara kısa ve net, karmaşık konulara kapsamlı ve yapılandırılmış (madde işaretleri, başlıklar, örnekler) yanıt ver.
- Türkçe dilbilgisi kurallarına özenli, doğal ve akıcı bir üslup kullan; gereksiz resmiyetten kaçın ama saygılı ve profesyonel kal.
- Kullanıcı önceki mesajlarda bağlam verdiyse, o bağlamı tutarlı şekilde kullan; çelişkiye düşme.`,
};

export default async function handler(req) {
  const origin = req.headers.get('origin') || '*';

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  }

  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405, origin);
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown';

  if (isRateLimited(ip)) {
    return json(
      { error: 'Çok fazla istek gönderildi. Lütfen bir dakika bekleyip tekrar deneyin.' },
      429,
      origin
    );
  }

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return json(
      { error: 'Sunucu yapılandırması eksik: GROQ_API_KEY tanımlı değil.' },
      500,
      origin
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Geçersiz istek gövdesi.' }, 400, origin);
  }

  const messages = Array.isArray(body?.messages) ? body.messages : null;

  if (!messages || messages.length === 0) {
    return json({ error: 'messages alanı gerekli.' }, 400, origin);
  }

  const cleanMessages = messages
    .filter(
      (m) =>
        m &&
        (m.role === 'user' || m.role === 'assistant' || m.role === 'system') &&
        typeof m.content === 'string'
    )
    .map((m) => ({ role: m.role, content: m.content.slice(0, 16000) }))
    .slice(-40);

  if (cleanMessages.length === 0) {
    return json({ error: 'Geçerli mesaj bulunamadı.' }, 400, origin);
  }

  const upstreamBody = {
    model: MODEL,
    messages: [SYSTEM_PROMPT, ...cleanMessages],
    temperature: 0.6,
    top_p: 0.9,
    max_tokens: 4096,
    stream: true,
  };

  let upstreamRes;
  try {
    upstreamRes = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(upstreamBody),
    });
  } catch (err) {
    return json(
      { error: 'Yapay zekâ servisine ulaşılamadı. Lütfen tekrar deneyin.' },
      502,
      origin
    );
  }

  if (!upstreamRes.ok || !upstreamRes.body) {
    let detail = '';
    try {
      const errJson = await upstreamRes.json();
      detail = errJson?.error?.message || JSON.stringify(errJson);
    } catch {
      detail = await upstreamRes.text().catch(() => '');
    }

    if (upstreamRes.status === 429) {
      return json(
        { error: 'Şu anda çok fazla istek var (hız sınırı). Lütfen birkaç saniye sonra tekrar deneyin.' },
        429,
        origin
      );
    }

    return json(
      { error: 'Yapay zekâ servisi bir hata döndürdü.', detail },
      upstreamRes.status || 502,
      origin
    );
  }

  // Groq'tan gelen OpenAI-uyumlu SSE akışını, istemciye sadeleştirilmiş bir
  // SSE akışı olarak yeniden yayınlıyoruz: her chunk `data: {"delta":"..."}\n\n`.
  const reader = upstreamRes.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      let buffer = '';

      function send(obj) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(obj)}\n\n`));
      }

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith('data:')) continue;

            const payload = trimmed.slice(5).trim();
            if (payload === '[DONE]') {
              send({ done: true });
              controller.close();
              return;
            }

            try {
              const parsed = JSON.parse(payload);
              const delta = parsed?.choices?.[0]?.delta?.content;
              if (delta) {
                send({ delta });
              }
            } catch {
              // Parçalı JSON satırlarını sessizce atla.
            }
          }
        }

        send({ done: true });
        controller.close();
      } catch (err) {
        send({ error: 'Akış sırasında bağlantı kesildi.' });
        controller.close();
      }
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      ...corsHeaders(origin),
    },
  });
}

function json(obj, status, origin) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(origin),
    },
  });
}
