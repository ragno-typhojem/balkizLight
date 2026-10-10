# BALKIZ Light 2.2 · Etkinlik atölyesi

İLKYAR projelerinde etkinlik hazırlayan gönüllüler için hafif, Türkçe bir çalışma alanı. Mevcut BALKIZ Light reposunun güncellenmiş sürümüdür. Sabit BALKIZ logosu ve sağ üstte resmi İLKYAR logosu kullanılır.

## Vercel’e kurulum

1. ZIP’i aç; dosyaları GitHub reponun köküne koy. `api/`, `lib/`, `assets/`, `vendor/`, `scripts/` klasörlerini birlikte koru.
2. Vercel’de repoyu içe aktar. Framework: **Other**. `vercel.json` kurulum, build ve `public` çıktı klasörünü tanımlar.
3. Vercel → Settings → Environment Variables: **GROQ_API_KEY** ekle. Anahtar yalnızca sunucuda olmalı; `NEXT_PUBLIC_` kullanma.
4. Yeniden deploy et. Paket bir API anahtarı içermez.

Önceki sürümden güncelliyorsan bu paketteki dosyaların tamamını kullan; özellikle `lib/activities.js` ve `lib/expanded-templates.js` dosyalarını koru. Yayından sonra açık sayfayı bir kez yenile. Sürüm işaretli tarayıcı dosyaları ve yenilenen çevrimdışı önbellek, eski kütüphanenin güncel arayüzle karışmasını önlemek için eklenmiştir. Cihazdaki sohbet geçmişi korunur.

Çok sayıda kullanıcı için isteğe bağlı ortak kota kontrolü:

- Bir ücretsiz Redis REST hesabından `UPSTASH_REDIS_REST_URL` ve `UPSTASH_REDIS_REST_TOKEN` tanımla.
- Tüm Vercel instance’larında aynı veritabanını ve `QUOTA_NAMESPACE` değerini kullan. Varsayılan alan adı `balkiz:v2`.
- Yüksek trafikte `REQUIRE_SHARED_LIMITS=1` ayarlamak, ortak kontrol eksikse isteği reddeder.
- Redis bağlantısı kesilirse ortak kontrolü atlayıp kontrolsüz istek gönderilmez. Her istek için bir atomik rezervasyon ve bir kilit bırakma çağrısı yapılır. Redis’in ücretsiz kotası da ayrıca izlenmelidir.
- Redis ayarlanmadan da çalışır; bu durumda kota, eşzamanlılık ve önbellek yalnızca o server instance’ına aittir. Instance’lar arasında kesin toplam sınır garantisi yoktur.

Diğer ayarlar `.env.example` içinde. `.env.local` veya gerçek anahtarları repoya ekleme.

## Ücretsiz kapasite nasıl korunur?

- Bilim, deney, belge incelemesi ve doğruluk değerlendirmesi `openai/gpt-oss-120b`; basit genel metin işleri `openai/gpt-oss-20b` kullanır.
- Yoğunlukta bilim modeli korunur; yanıt üst sınırı ve taşınan geçmiş azalır. Güncel kullanıcı mesajı kesilmez. Bütçeye sığmayan istek için açık hata verilir.
- Son ilgili sohbet turları kullanılır; bütün geçmiş her seferinde gönderilmez. Dosyaların soruyla ilgili küçük metin bölümleri seçilir.
- Token tahmini Türkçe için ihtiyatlı UTF-8 tahminidir; gerçek model tokenizer’ı değildir. Sağlayıcı 429 ve reset başlıkları esas alınır.
- Dakika/gün istek ve token bütçeleri ayrı tutulur. Günlük kalan istek sayısı, dakikalık limit diye yorumlanmaz.
- Aynı cihaz oturumu ve istemcinin aynı isteği beş dakika boyunca küçük bir instance önbelleğinden karşılanabilir. Kişisel cevaplar ortak kamu önbelleğine konulmaz. Aynı anda gelen aynı istek yeniden üretilmez.
- Durdurma ve bağlantı kesilmesi upstream isteğini iptal eder. Yarım yanıtlar ve uzunluk sınırına ulaşan yanıtlar tamamlanmış diye önbelleğe alınmaz.
- Kuyruk dolunca kaynak tüketen sınırsız bekleme veya otomatik tekrar döngüsü yerine yeniden deneme süresi gösterilir.
- Varsayılan dört eşzamanlı çağrı ve IP başına dakikada altı istek vardır. Okulun ortak internet bağlantısında aynı IP paylaşılabileceğinden `USER_RPM` ayarı ihtiyaca göre düzenlenebilir.
- Paylaşımlı modda rezerve edilen token bütçesi ihtiyatlı biçimde korunur; iptal edilen çağrıda kullanım bilinmiyorsa bütçe geri verilmez. Bu, kesin kapasiteyi tahmin üzerinden aşmamaya yardımcı olur.

Groq limitleri model ve kuruluş bazındadır. 10 Ekim 2026’da [Groq resmi limit tablosunda](https://console.groq.com/docs/rate-limits) GPT-OSS 20B ve 120B için ücretsiz limitler model başına 30 RPM, 1.000 RPD, 8.000 TPM ve 200.000 TPD olarak listelenmiştir. Hesabının kesin sınırları değişebilir. [Groq limitleri](https://console.groq.com/docs/rate-limits) ve [hesap limitleri](https://console.groq.com/settings/limits) üzerinden kontrol et.

Ücretsiz kullanımın sınırsız veya belirli sayıda kullanıcıyı kesin desteklediği iddia edilmez. Gerçek kapasite ortalama token tüketimine, trafik dağılımına, Groq/Redis/Vercel kotalarına bağlıdır. Aynı Groq kuruluşundaki başka uygulamalar da kotayı tüketebilir. Uygulama ücretsiz planı otomatik olarak seçemez; sağlayıcı hesaplarının ücretsiz planlarda ve harcama sınırlarının uygun olduğundan emin ol.

## Gönüllü araçları

- Mobilde ayrı çalışmalar ve ayarlar panelleri; tablet/masaüstünde geniş çalışma alanı.
- Yaş, alan, süre, katılımcı, malzemeler, bilimsel derinlik ve yanıt uzunluğu ayarları.
- Akışla gelen yanıt, durdurma, manuel tekrar deneme; kullanıcı yukarı okurken kaydırma konumu korunur.
- Yerel geçmiş, arama, JSON yedekleme ve mevcut çalışmaları koruyarak yedek yükleme.
- Markdown indirme, yanıta kopyalama, açık/koyu görünüm.
- 22 başlıkta 31 çevrimdışı taslak (6 ileri düzey araştırma), başlık/malzeme araması ve alan filtresi. Taslak açmak Groq çağrısı veya token harcamaz; bir mesajla yapay zekâdan geliştirme istemek kota kullanır. İlk açılış internet gerektirir. Yapay zekâ çevrimdışı çalışmaz.
- Ücretsiz, yerel kaynaklar; ilk yüklemede PDF/DOCX okuyucuları indirilmez, gerekince aynı siteden yüklenir.

## Etkinlik kütüphanesi

Kullanıcının paylaştığı klasör başlıkları kütüphanede ve etkinlik ayarlarında bulunur: Kimya, Fizik / Fen, Edebiyat, Geleceğe Mektuplar, İlkokullara Etkinlik, Astronomi, Yaratıcı Drama, Masa Deneyleri, Matematik, Müzik, 3. Koridor Deneyleri, VR, Yapay Zeka Etkinliği, 0. Atölyeler, 1. Dış Deneyler, Denge Deneyi, Resim, 2. Gece deneyleri, Robot, Origami, İlkyar Tanıtımı ve Göremediğimiz Canavarlar.

Önceki 25 başlangıç taslağı korunur; sarkaç verisi, Malus yasası, asit kuvveti/derişim simülasyonu, Euler/Hamilton rotaları, sınıflandırma hata tablosu ve akış süresi için 6 ileri düzey araştırma eklenmiştir. Bunlar düzenlenebilir özgün geliştirme önerileridir. İleri düzey seçimi daha fazla hesap, grafik, model ve belirsizlik anlamına gelir. Varsayılan görev etkinlik geliştirmektir; kullanıcı istemedikçe puanlama, eleştiri veya geri bildirim raporu üretilmez.

Paylaşılan Drive arşivinden 131 PDF/Word/Google Docs kılavuzu ve ek için kısa planlama bilgileri, geliştirme fikirleri ve kaynak bağlantıları hazırlanmıştır. Tanıtım klasörü, edebiyat kitapları ve hedef dışı dosyalar kaynak araştırmasına alınmamıştır. Belgelerin tam metinleri, kişisel e-postalar ve asıl dosyalar pakete aktarılmaz. Metin çıkarımı görsellerin veya gömülü formüllerin tamamını doğrulamaz; 6 ek görsel içerik olarak işaretlenmiştir. Ayrıntılar SOURCE-NOTES.md içindedir.

Kaynaklar ve kılavuzlar penceresinde konu, alan ve türle yerel arama yapılır. Bir kılavuzun “Bu etkinliği geliştir” düğmesi düzenlenebilir bir istek hazırlar; göndermeden yapay zekâ çağrılmaz.

Robot taslağı komut dizilerini kâğıt üzerinde çalıştırır. VR taslağı mevcut, uygun cihaz varsa kullanılabilecek bir etkinlik önerisidir; uygulama VR oynatıcısı sunmaz. Her ikisi de yeni cihaz veya ücretli servis olmadan uygulanabilen alternatif içerir. Gece ve dış alan taslaklarının izin/gözetim koşulları ayrıca belirtilmiştir; mikrobiyoloji taslağında canlı örnek veya kültür kullanılmaz. Mektuplar çocuğa aittir ve kişisel bilgilerinin modele gönderilmesi istenmez.

Yeni içerikler yalnızca tarayıcıda saklanan statik metinlerdir. Arama ve filtreleme yerelde yapılır. Tüm katalog her yapay zekâ isteğine eklenmez; yalnızca seçili alan ve ilgili kısa kaynak notları kullanılır. Sanat/edebiyat gibi alanlardaki basit yaratıcı işler hızlı modele yönlenebilir; bilimsel içerik ve inceleme istekleri bilim modelini kullanır.

## Dosyalar

PDF (metin içeren), DOCX, TXT, MD, CSV ve JSON. En fazla üç dosya, dosya başına 5 MB, toplam 10 MB. Bir dosyadan 24.000, toplam 48.000 karakter metin alınır. PDF’in en fazla ilk 30 sayfası okunur. Uzun belgeler açıkça kısmi gösterilir; modele yalnızca seçilen alıntılar gönderilir.

Dosyanın kendisi ve çıkarılan tam metin cihaz belleğinde kalır; sohbet kaydında dosya adları yer alır. Seçili metin bölümleri yanıt istendiğinde Groq’a gönderilir. Sayfa yenilenirse dosyayı tekrar eklemek gerekir. Taranmış PDF, resim OCR’ı, parola korumalı belgeler, ses/video ve eski `.doc` desteklenmez. Yüklenen çocuk bilgileri veya başka kişisel veriler kullanılmamalıdır.

## Bilimsel doğruluk ve güvenlik

Yanıtların tamamının doğru olduğu garanti edilmez. 80 başvuru kaynağı; NASA, NIST, IUPAC, ACS, RSC, WHO, CDC, FDA, OpenStax/Rice University, üniversite fizik kaynakları, Nikon, Google Developers ve PhET gibi kaynaklardan kısa notlar içerir. Bilimsel dayanaklar, simülasyonlar ve etkinlik kılavuzları ayrı türlerdir. 12 önceki kaynağın not tarihi 5 Ekim; 68 yeni kaynağın tarihi 10 Ekim 2026’dır. Bu tarih tüm gelecekteki yanıtların doğrulandığı anlamına gelmez.

İndeks bir kez hazırlanır; sözcük eşleşmesi ve konu ağırlıklarıyla ilgili notlar seçilir. Model başına normal istekte en fazla 4 bilimsel not (2400 karakter bütçesi), kısa/yoğun modda 3 not (1600 karakter bütçesi) ve en fazla 1 kısa kılavuz bağlamı (1100 karakter) aktarılır. Bağlam için ayrı embedding, arama API’si veya yapay zekâ isteği yapılmaz. Metin bulunduğunda bilimsel iddianın dayanağı ilgili referanstır; kılavuz bir uygulama onayı değildir. Uygulama çalışma sırasında internette canlı araştırma yapmaz. Kaynak bulunamıyorsa ayrı kontrol gerektiği gösterilir.

Bilimsel bilgi, varsayım, gözlem ve öneri ayrılmalı; hesaplarda birimler gösterilmelidir. Deneylerde yetişkin gözetimi, yaşa uygunluk ve ilgili malzeme riskleri istenir. Tehlikeli deneyler yerine düşük riskli alternatif veya simülasyon önerilir. Her çıktı öğretmen/gönüllü kontrolünden geçmelidir. Yalnızca isteme eklenen talimatlar bütün hataları engellemez.

İLKYAR’ın resmi [tanıtım sayfası](https://ilkyar.org.tr/tanitim/) ve [logosu](https://ilkyar.org.tr/wp-content/uploads/2021/06/logo.png) kullanılmıştır. Logo sahipliği İLKYAR’a aittir; bu ürün resmi temsil veya kurumsal onay iddiasında bulunmaz. BALKIZ ve üçüncü taraf okuyucu lisansları korunmuştur.

## Yerelde çalıştırma

Node.js 22 veya üstü:

```sh
cp .env.example .env.local
# .env.local içine kendi GROQ_API_KEY değerini ekle.
npm install
npm run dev
```

`http://127.0.0.1:3000` adresini aç. Vercel build’i tarayıcı varlıklarını `public/` altında üretir; API anahtarı bu klasöre yazılmaz. `api/chat.js` ayrı sunucu fonksiyonudur.

PDF.js ve fflate bu pakette lisanslarıyla hazırdır. Güncellemeleri yeniden kopyalamak için `npm run vendor` kullanılabilir. Kontrol komutları `npm test` ve `npm run check`; gerçek cihaz, Vercel ve gerçek Groq denemelerini kullanıcı yapacaktır.


## Bu sürümün teslim sınırı

2.2.0 için otomatik test, tarayıcı/cihaz testi ve canlı Vercel/Groq denemesi çalıştırılmadı; kullanıcıya bırakıldı. Build yalnızca dağıtım dosyalarını hazırlar. Bu paket yayına alınmış bir sürüm değildir.
