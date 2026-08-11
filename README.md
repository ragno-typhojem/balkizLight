
# **BALKIZ**  Light

Groq’un `openai/gpt-oss-120b` modelini kullanan, tek dosyalık yapay zekâ sohbet uygulaması.

## Kurulum

1. **Groq API key al**  
   - [https://console.groq.com](https://console.groq.com) → API Keys → Create API Key  
   - `gsk_...` ile başlayan key’i kaydet.

2. **Vercel’e deploy et**  
   ```bash
   npm i -g vercel
   cd balkiz
   vercel
   ```
   veya GitHub → Vercel → Import Project.

3. **API key ekle**  
   - Vercel Dashboard → Settings → Environment Variables  
   - `GROQ_API_KEY` = aldığın key  
   - Production/Preview/Development işaretle → Redeploy.

## Yerelde çalıştırma

```bash
npm i -g vercel
cd balkiz
vercel dev
```

Tarayıcıda `http://localhost:3000` aç.

