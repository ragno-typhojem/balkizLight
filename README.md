# BALKIZ

Akışkan camdan (Liquid Glass) arayüze sahip, Groq'un `openai/gpt-oss-120b` modelini kullanan
tek dosyalık bir yapay zekâ sohbet uygulaması.

## Neden bu kurulum?

Önceki sürüm `text.pollinations.ai` adlı servisi kullanıyordu. O servis artık "Pollen" adlı
kredi sistemine geçti ($1 ≈ 1 Pollen) ve anonim/ücretsiz kullanım çok düşük bir haftalık kotaya
sıkıştırılmış durumda — bu yüzden `HTTP 402 Insufficient balance` hatası alıyordunuz.

Bunun yerine **Groq API** kullanılıyor:

- Kredi kartı istemiyor, kayıt olurken ödeme bilgisi sormuyor.
- Gerçek bir kredi/bakiye sistemi yok — kota dolunca sadece "biraz bekle" anlamına gelen
  HTTP 429 (rate limit) döner, asla "ödeme gerekiyor" hatası vermez.
- Model: `openai/gpt-oss-120b` — Groq'un Temmuz 2026'da kullanımdan kaldırdığı Llama 3.3 70B'nin
  yerine resmen önerdiği, ondan daha güçlü açık kaynaklı model.

API key **yalnızca sunucu tarafında** (`api/chat.js` içinde, Vercel ortam değişkeni olarak)
kullanılır. Tarayıcıya hiçbir zaman gönderilmez, HTML/JS dosyalarının hiçbirinde görünmez.

## Proje yapısı

```
balkiz/
├── index.html       ← Arayüzün tamamı (HTML + CSS + JS, tek dosya)
├── api/
│   └── chat.js       ← Vercel Serverless Function: Groq API'ye güvenli proxy
├── vercel.json       ← Vercel yapılandırması (güvenlik başlıkları)
├── .env.example       ← Hangi ortam değişkeninin gerektiğini gösterir (kopyalamayın)
└── .gitignore
```

## Kurulum

### 1. Groq API key alın (ücretsiz, kredi kartsız)

1. https://console.groq.com adresine gidin, Google/GitHub ile giriş yapın.
2. Sol menüden **API Keys** kısmına girin, **Create API Key** deyin.
3. `gsk_...` ile başlayan key'i kopyalayın (bir daha gösterilmez, güvenli bir yere not edin).

### 2. Vercel'e deploy edin

**Seçenek A — Vercel CLI ile (hızlı):**

```bash
npm i -g vercel
cd balkiz
vercel
```

Sorulan sorularda varsayılanları onaylayabilirsiniz (framework: Other).

**Seçenek B — GitHub üzerinden:**

1. Bu klasörü bir GitHub reposuna push edin.
2. https://vercel.com → **Add New Project** → reponuzu seçin → **Import**.
3. Framework Preset: **Other**. Build Command / Output Directory boş bırakılabilir
   (statik `index.html` + `api/` klasörü otomatik algılanır).

### 3. API key'i Vercel'e tanımlayın

Deploy ettikten sonra:

1. Vercel Dashboard → projeniz → **Settings** → **Environment Variables**.
2. `GROQ_API_KEY` adında yeni bir değişken ekleyin, değeri Groq'tan aldığınız `gsk_...` key olsun.
3. **Production**, **Preview** ve **Development** kutucuklarının hepsini işaretleyin.
4. Kaydedin, ardından **Deployments** sekmesinden en son deployment'ı **Redeploy** edin
   (ortam değişkeni eklendikten sonra yeniden deploy şart, yoksa fonksiyon eski haliyle çalışır).

Bu kadar. Siteniz artık kendi Groq key'inizle, tamamen ücretsiz ve limitsiz "ödeme gerekiyor"
hatası olmadan çalışıyor olacak.

## Yerelde test etme

```bash
npm i -g vercel
cd balkiz
vercel dev
```

`vercel dev`, `api/chat.js` fonksiyonunu yerelde çalıştırır ve `.env` dosyasındaki
(veya `vercel env pull` ile çekilen) `GROQ_API_KEY` değişkenini kullanır. Tarayıcıda
`http://localhost:3000` adresini açın.

## Hız sınırı hakkında

Groq'un ücretsiz katmanı cömert ama sınırsız değil (dakika/gün başına istek sayısı ile
sınırlıdır). Yoğun kullanımda `api/chat.js` içindeki `openai/gpt-oss-120b` çağrısı 429
döndürebilir; arayüz bu durumda kullanıcıya "çok fazla istek, biraz bekleyin" mesajını
gösterir — asla ödeme ekranı çıkarmaz. Groq'un güncel limitlerini
https://console.groq.com/docs/rate-limits adresinden görebilirsiniz.

## Model değiştirmek isterseniz

`api/chat.js` içindeki `MODEL` sabitini değiştirin. Groq'ta o an aktif olan modellerin
listesini şu uçtan görebilirsiniz:

```bash
curl https://api.groq.com/openai/v1/models -H "Authorization: Bearer $GROQ_API_KEY"
```
