# BALKIZ Light 2.8 · Etkinlik atölyesi

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

## 2.8.0: ücretsiz birinci servis ve Groq yedeği

Canlı yayın için önerilen bağlantı Cloudflare Workers AI / Workers Free, yedek Groq'tur. Cloudflare ücretsiz kullanımını günlük 10.000 neuron ile sınırlar; bu bir token veya kullanıcı sayısı değildir. Basit işlerde `@cf/qwen/qwen3-30b-a3b-fp8`, bilimsel deney ve araştırmada `@cf/openai/gpt-oss-120b` seçilir. Bu seçim fiyat/özellik belgelerine dayanır; Türkçe kalite testi yapılmadı. Neuron bütçesi hesapta bütün modellerce paylaşılır. Hesap Free planında olmalı; ücretli plana yükseltme veya kredi satın alma bu güncellemenin parçası değildir.

Kolay kurulum:

1. [Cloudflare resmî kurulumundan](https://developers.cloudflare.com/workers-ai/get-started/rest-api/) Workers AI → Use REST API bölümünü aç. Eğitim projesinin hesabıyla sınırlı token ve Account ID al.
2. `config/cloudflare.env.example` dosyasının bir kopyasında yalnız `CLOUDFLARE_ACCOUNT_ID` ve `CLOUDFLARE_API_KEY` yer tutucularını doldur. Dosyayı bilgisayarında `.env` uzantısıyla kaydet; GitHub'a yükleme.
3. Vercel proje Settings → Environment Variables bölümünde `.env` içe aktar veya metnini yapıştır. Production/Preview hedeflerini seç, kaydet ve yeniden deploy et. Mevcut `GROQ_API_KEY` kaydı korunur; şablon bu anahtarı boş değerle değiştirmez.
4. `CLOUDFLARE_FREE_PLAN=1` yalnız kurulum beyanıdır; Cloudflare'da plan değiştirmez ve gerçek hesap faturalandırmasını denetlemez. Sıfır ek ücret için gerçek Workers Free hesabını kullan.

`AI_FALLBACK=groq` ile birinci servisin erişim/kota hatası veya sunucu HTTP reddinde bir kez Groq'a geçilir. Her servis kendi kota rezervasyonundan geçer. Kullanıcı hız sınırı, genel eşzamanlılık ve ortak Redis hataları bu geçişle aşılmaz. İptal, bağlantı kopması, kesilmiş cevap veya bilimsel kontrole takılan üretilmiş yanıt tekrar üretilmez. İki servis de reddederse açık hata/bekleme süresi verilir. Aynı özel isteğin önbelleği korunur; yanıt yolu arayüzde yalnız BALKIZ olarak görünür.

Cloudflare'da cevaplar tamamlanmış JSON olarak alınır ve yerel biçim/risk kontrolünden geçirilir; sağlayıcıda strict şema garantisi verilmez. Qwen ekonomik yoluna resmî `/no_think` istem işareti eklenir; bu sert bir sağlayıcı garantisi değildir. Groq dışında önbellek token indirimi varsayılmaz.

NVIDIA **ücretsiz API sunar**; mevcut GPT-OSS 20B endpointi deneme için açıktır. Ücretsiz API Trial Terms 1.2/1.4, erişimi iç test/değerlendirmeyle sınırlar. `config/nvidia-preview.env.example` yalnız Preview/Development içindir. 120B ücretsiz endpointi güncel model sayfasında deprecated olduğundan NVIDIA varsayılanı 20B olarak düzeltildi. Gerçek üretim hakkı edinilmedikçe Vercel production ortamında evaluation bağlantısı kullanılmaz. `config/groq.env.example` eski bağlantıya dönmek içindir; hiçbir anahtarı silmez.

Anahtarlar eklenene kadar mevcut Groq bağlantısı çalışır. Env içe aktarma ve gerçek model çıktısını kullanıcı doğrular. Yerel veya canlı test bu sürümde çalıştırılmadı.

## Ücretsiz kapasite nasıl korunur?

- Basit genel açıklamalarda `openai/gpt-oss-20b`; yeni bilimsel deney, kılavuz, kimya/güvenlik, belge inceleme ve ileri araştırmada `openai/gpt-oss-120b` kullanılır. Güncel sohbet ve sağlayıcı seçimi aşağıdaki 2.7.0 notlarında açıklanır.
- Yoğunlukta bilim modeli korunur; yanıt üst sınırı ve taşınan geçmiş azalır. Güncel kullanıcı mesajı kesilmez. Bütçeye sığmayan istek için açık hata verilir.
- Son ilgili mesajlar, son yanıt ve uzun sohbette başlangıç kısıtları kısa alıntılarla korunur; hazır taslak ve kısmi yanıt bağlamı da taşınır. Sıkıştırma için ek model çağrısı yapılmaz; bütün geçmiş her seferinde gönderilmez. Dosyaların soruyla ilgili küçük metin bölümleri seçilir.
- Token tahmini Türkçe için ihtiyatlı UTF-8 tahminidir; gerçek model tokenizer’ı değildir. Sağlayıcı 429 ve reset başlıkları esas alınır.
- Dakika/gün istek ve token bütçeleri ayrı tutulur. Günlük kalan istek sayısı, dakikalık limit diye yorumlanmaz.
- Aynı cihaz oturumu ve istemcinin aynı isteği beş dakika boyunca küçük bir instance önbelleğinden karşılanabilir. Kişisel cevaplar ortak kamu önbelleğine konulmaz. Aynı anda gelen aynı istek yeniden üretilmez.
- Durdurma ve bağlantı kesilmesi upstream isteğini iptal eder. Yarım yanıtlar ve uzunluk sınırına ulaşan yanıtlar tamamlanmış diye önbelleğe alınmaz.
- Kuyruk dolunca kaynak tüketen sınırsız bekleme veya otomatik tekrar döngüsü yerine yeniden deneme süresi gösterilir.
- Varsayılan dört eşzamanlı çağrı ve IP başına dakikada altı istek vardır. Okulun ortak internet bağlantısında aynı IP paylaşılabileceğinden `USER_RPM` ayarı ihtiyaca göre düzenlenebilir.
- Yerel ve paylaşımlı modda doğrulanan gerçek kullanımla rezervasyon uzlaştırılır. Redis pencere kimlikleri eski yanıtın yeni dakika/gün sayacını azaltmasını önler. Kullanımı bilinmeyen iptal/kopmada rezervasyon korunur; sağlayıcı HTTP hata yanıtında token rezervasyonu bırakılır. Groq'un doğruladığı önbellek tokenları kullanım hesabından düşülür; NVIDIA'da raporlanan toplam kullanım ihtiyatlı olarak sayılır.

Groq limitleri model ve kuruluş bazındadır. 12 Ekim 2026’da [Groq resmi limit tablosunda](https://console.groq.com/docs/rate-limits) GPT-OSS 20B ve 120B için ücretsiz limitler model başına 30 RPM, 1.000 RPD, 8.000 TPM ve 200.000 TPD olarak listelenmiştir. Hesabının kesin sınırları değişebilir. [Groq limitleri](https://console.groq.com/docs/rate-limits) ve [hesap limitleri](https://console.groq.com/settings/limits) üzerinden kontrol et.

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

Yanıtların tamamının doğru olduğu garanti edilmez. 122 başvuru kaynağı; NASA, NIST, IUPAC, ACS, RSC, WHO, CDC, FDA, OpenStax/Rice University, üniversite fizik kaynakları, Nikon, Google Developers ve PhET gibi kaynaklardan kısa notlar içerir. Bilimsel dayanaklar, simülasyonlar ve etkinlik kılavuzları ayrı türlerdir. 12 önceki kaynağın not tarihi 5 Ekim; 68 kaynağın tarihi 10 Ekim, 20 yeni araştırma kaynağının tarihi 12 Ekim 2026’dır. Bu tarih tüm gelecekteki yanıtların doğrulandığı anlamına gelmez.

İndeks bir kez hazırlanır; sözcük eşleşmesi ve konu ağırlıklarıyla ilgili notlar seçilir. Yeni tam planlarda en fazla 3 bilimsel not (1600 karakter) ve 1 kısa kılavuz bağlamı (1100 karakter) aktarılır. Kısa takip sohbetinde en fazla 2 bilimsel not (950 karakter) seçilir; kılavuz bağlamı yeniden eklenmez. Bağlam için ayrı embedding, arama API’si veya yapay zekâ isteği yapılmaz. Metin bulunduğunda bilimsel iddianın dayanağı ilgili referanstır; kılavuz bir uygulama onayı değildir. Uygulama çalışma sırasında internette canlı araştırma yapmaz. Kaynak bulunamıyorsa ayrı kontrol gerektiği gösterilir.

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

2.8.0 kullanıcı isteğiyle araştırma ve kaynak incelemesiyle hazırlandı. Yerel test, tarayıcı testi, dev sunucusu, canlı sağlayıcı isteği veya yerel build çalıştırılmadı. Vercel Git entegrasyonu dağıtımı ayrıca derler; yayın durumu teslim sırasında GitHub Vercel durum kaydından kontrol edilir. API anahtarlarını kullanıcı Vercel ayarlarına ekler; kodun yayımlanması yeni sağlayıcıya başarılı istek yapıldığını kanıtlamaz.

## 2.3.0: birlikte geliştirme

Varsayılan görev serbest geliştirme sohbetidir. Fikir üret, deney tasarla, konuyu açıkla ve kılavuz yaz seçenekleri vardır. Kısa takipte aynı etkinliğin yalnız istenen kısmı değiştirilir. Açık son istek önceki menü seçimini geçersiz kılabilir. Kılavuzda arşiv düzeni veya araştırma düzeni seçilir; belirtilen özel belge formatı istemde öncelik alır. “Bir adım ileri”, “Daha az malzeme” ve “Kılavuz oluştur” düğmeleri yalnız mesaj taslağı hazırlar, otomatik çağrı yapmaz. Bilimsel deneyin fiziksel olarak yapıldığı iddia edilmez; model öneri ve tahmin üretir.

Geniş monitörde çalışma satırı ekran yüksekliğiyle sınırlıdır. Sohbet, ayarlar, geçmiş ve kaynak pencereleri kendi içinde kayar. Mobilde görünür ekran yüksekliği klavyeyle güncellenir; yalnız klavye yüksekliği değiştiğinde açık panel kapanmaz. Çok kısa yatay ekranlarda yazma alanı küçülür.

Standart yanıt düşük reasoning effort kullanır; yalnız ileri düzey, ayrıntılı bilim isteğinde orta düzey kullanılır. Yanıt token üst sınırı görev/uzunluk/yoğunluğa göre seçilir. Tek bir istekte kaynak araması veya ek özetleme model çağrısı yapılmaz. Değişmeyen sistem metni başta tutularak sağlayıcının [otomatik prompt önbelleği](https://console.groq.com/docs/prompt-caching) desteklenir; isabet garanti değildir. Yanıtın yanında sağlayıcı bildirirse kullanılan/önbellekteki token sayısı gösterilir; kurum kotasının tamamını göstermez.

## 2.3.1: farklı deney ve kısa bütçe

“Başka/farklı/yeni deney” mevcut etkinliği düzenleme talimatından ayrılır. Yeni deneyde kılavuz notu/puanlama etkisi kapatılır; önceki öneriler yalnız tekrar edilmemesi için kısa alıntılarla taşınır. Eski belgeler yalnız yeni istek açıkça dosyaya atıf yaparsa eklenir. Konusu belirtilmeyen istekte kullanılmamış bir ilkeyi destekleyen sınırlı kaynak notu seçilebilir; bu, önerinin fiziksel olarak denenmiş olduğunu göstermez. “Farklı deney” düğmesi istek taslağı hazırlar.

Sistem talimatı kısaldı. Normal kısa sohbet en fazla 1600, yoğun mod 1000 karakter geçmiş ve tek 700 karakter bütçeli bilimsel not taşır; yeni deneyde geçmiş 550 karakterle sınırlıdır. Ayrıntılı tam plan daha geniş bağlamı korur. Kalan yerel/sağlayıcı token kapasitesine göre çıktı ve geçmiş küçültülerek rezervasyon denenir. Redis token reddinde bildirilen kalan kapasiteyle bir küçük rezervasyon denemesi yapılabilir; bunun için ikinci bir model çağrısı yapılmaz.

429 için Retry-After önceliklidir; yoksa yetersiz token bütçesinin reset başlığı kullanılır. Günlük istek kotası bittiğinde günlük reset korunur. Hiçbir güvenilir süre yoksa ihtiyatlı dakika fallback'i kalır. Gerçek Groq, paylaşımlı Redis ve IP/gün kotaları kaldırılmadı. Arayüz kalan bekleme süresini gösterir. Detayların kaynağı [Groq limit dokümantasyonudur](https://console.groq.com/docs/rate-limits).

2.3.1 için sözdizimi kontrolü ve build yapıldı. Yeni deney niyeti, tek kaynaklı takip ve kısa reset süresi için regresyon senaryoları eklendi; kullanıcı tercihine uygun olarak otomatik/canlı testler çalıştırılmadı. Gerçek model çıktısının farklılığını ve canlı beklemeyi üretimde ölçmedik.

## 2.4.0 · Olumsuz istekler ve tamamlanan çıktılar

“Asit baz bulma”, “gıda boyasız” ve “bambaşka ve daha kimyasallarla” ifadeleri örnek konuşmadan ele alındı. Konu/malzeme dışlamaları yalnız kullanıcı mesajlarından çıkarılır; kısa geçmiş penceresine bağlı değildir. Asit–baz, gıda boyası ve kristal etkinliği için tanımlı kurallar vardır; tüm Türkçe ifadeler için tam anlama garantisi değildir. İstenmeyen kaynaklar elenir. Önceki riskli tarifler uygulama dayanağı olarak yeniden taşınmaz.

Bilimsel yanıtlar GPT-OSS modellerinde [Groq strict JSON schema](https://console.groq.com/docs/structured-outputs) ile alınır. Sağlayıcı structured output ile streaming'i birlikte desteklemediği için upstream stream:false kullanılır. Uygulamanın SSE hazırlık olayı hemen başlar; tarif yalnız tamamlanıp kontrol edilince gösterilir. Şema biçimi doğrular, bilimsel doğruluğu garanti etmez.

Deney kartı tablo/HTML yerine kısa alanlardan oluşur: 120–180 kelime, 3–5 adım ve ilgili güvenlik notları. Tamamlanma payı deney kartında normal 1800, yoğun mod 1400 tokendır; şema maliyeti rezervasyona dahildir. Kesilmiş, bozuk veya tanımlı dışlama/risk kontrollerini geçmeyen tarif cache'e alınmaz ve gösterilmez. Otomatik ikinci model çağrısı yoktur. Kontroller kapsamlı kimyasal risk değerlendirmesi değildir; öğretmen kontrolü ve ön deneme gerekir.

Eldeki kimyasallar bilinmeden açık laboratuvar isteğinde ad/etiketli derişim/uygulama ortamı soran yerel bir netleştirme sunulabilir. Bu soru API anahtarı ve model çağrısı gerektirmez. Eski uzunluk sınırında kesilen tarifler ekranda yeniden gösterilmez; kayıtlar silinmez. Kullanıcının gönderdiği sohbetin tamamı repoya aktarılmaz.

[ACS madde kimliği](https://www.acs.org/education/whatischemistry/landmarks/bakingpowder.html) ve [pH/göz koruması](https://www.acs.org/middleschoolchemistry/lessonplans/chapter6/lesson8.html) notlarıyla başvuru sayısı 102 oldu. Bu ekler deney onayı değildir.

## 2.5.0 · Yerel fikirler, malzemeler ve karşılaştırma

Otomatik mod, desteklenen fikir/malzeme/kıyaslama isteklerini önce tarayıcıda karşılar. 24 özgün araştırma önerisi için 4 yöntem/analiz seçeneği (96 uyarlama) vardır; bunlar 96 uygulama ile doğrulanmış farklı deney değildir. 31 önceki taslak ve 131 kılavuz/ek korunur. Yaş, alan, geçmişte görülen başlıklar ve tanımlı dışlamalar seçimi etkiler. Belirli bir konu havuzda bulunamazsa otomatik mod yapay zekâya geçer; yerel mod açıklama gösterir. Yerel taslaklar yapay zekâ üretimi veya ölçülmüş sonuç olarak sunulmaz. Kılavuzlar seçilen arşiv/araştırma düzeninin bütün başlıklarını kullanır.

Yerel yanıt tarayıcıda hazırlanır: Groq isteği/tokenı, Vercel chat API isteği, Redis kota rezervasyonu ve ek arama API çağrısı yoktur. Siteyi ilk yüklemek normal statik barındırma trafiği kullanır. Yapay zekâyla derinleştirme kullanıcı gönderince normal kotayı kullanır; mevcut gerçek limitler kaldırılmadı. Desteklenen yerel işler model bekleme süresinde de kullanılabilir. İlk yüklemeden sonraki çevrimdışı kullanım servis çalışanı önbelleğine bağlıdır.

32 malzemenin bilimsel/ürün adı, tipik bulunabileceği yer ve ilgili güvenlik notları vardır. Gliserol, nişasta, sodyum aljinat gibi seçenekler de bulunur. Kimyasal deneyde ürün kimliği, etiket, güvenlik bilgi formu ve öğretmen hazırlığı gerekir. Aljinat önerisi etiketli eğitim çözeltileri içindir; doğrulanmamış derişim veya karışım miktarı üretmez.

Malzeme penceresi tüm web ve 11 mağaza alanı (Hepsiburada, Trendyol, Amazon Türkiye, n11, Migros, CarrefourSA, A101, ŞOK, BİM, Koçtaş, D&R) için Google arama bağlantısı açar. Bu bir mağaza API entegrasyonu veya otomatik ürün okuma değildir. Canlı stok/fiyat/satıcı uygunluğu doğrulanmaz; satın alma yapılmaz. Tüm marketlerin kapsamı veya her malzemenin satışta olması garanti edilmez.

Kıyaslama, havuzdaki seçeneklerin araştırma sorusu, malzeme erişimi ve hazırlığını karşılaştırır. Varsayılan hafıza yalnız açık çalışmadır; kullanıcı cihazdaki çalışmaları seçerse en fazla 30 yakın çalışmanın son 12 tamamlanmış mesajı yerel seçimde kullanılabilir. Diğer çalışmaların içeriği bu işlemde sunucuya gönderilmez. Serbest metinli eski yanıtların bilimsel doğruluğu otomatik doğrulanmaz; başlıkları geçmiş bağlamı olarak gösterilebilir. Başka kullanıcıların yanıtlarını toplayan ortak öğrenme havuzu yoktur. Yapay zekâya geçilirse kısa yerel öneri kaydı açık çalışmanın bağlamına eklenir; önceki öneri kanıt sayılmaz.

Başvuru sayısı 108 oldu. Bu sürümde ACS çözünme/kromatografi, CMU aljinat, MIT nişasta süspansiyonu ve NASA kâğıt helikopter kaynakları eklendi. Uygulama çalışma sırasında internette otomatik canlı araştırma yapmaz. Bilimsel ilke kaynağı, yeni sınıf düzeninin denenmiş olduğunu kanıtlamaz.

2.5.0 için yalnız sözdizimi/dağıtım yapılandırması kontrolü ve build yapıldı. Kullanıcının talimatıyla otomatik regresyon testleri, tarayıcı/cihaz ve canlı Groq/Vercel denemeleri çalıştırılmadı. Yeni regresyon senaryoları kullanıcı için repoda bulunur. Build, dağıtım dosyalarını hazırladığını gösterir; canlı davranış veya yayımlanan sürümü doğrulamaz.

## 2.6.0 · Daha geniş araştırma havuzu ve ekonomik yönlendirme

36 yeni öneriyle özgün yerel havuz 60 fikre, yöntem/analiz seçenekleri 240 uyarlamaya çıktı. 14 yeni ürün/malzeme kaydıyla katalog 46 oldu; 8 yeni birincil başvuruyla kaynak sayısı 116'ya çıktı. Önceki 31 taslak ve 131 kılavuz/ek korunur. Yeni öneriler fiziksel olarak denenmedi; 240 uyarlama 240 bağımsız doğrulanmış deney değildir.

Yeni kartlar buharlaşma, yoğuşma, buz/ısı aktarımı, yoğunluk ve ayırma; köprü, tork, statik yük, ses ve optik; ölçek/geçiş modelleri; örnekleme, Euler yolları ve ölçüm; AI test verisi, aşırı uyum ve eşik; ozmoz, çimlenme, kök yönelimi ve robot simülasyonlarını kapsar. Her yeni kart kontrol koşullarını, ölçülecek büyüklük/birimi ve gerçek gözlem süre sınırını içerir. Günler süren bitki gözlemi tek ders içinde sonuç veriyormuş gibi gösterilmez. Kılavuzlar bu ayrıntıları seçili formatta taşır. Konu eşleşmesinde başlık/soru/malzeme önceliklidir; bilimsel açıklamadaki tek bir yan sözcük yüzünden başka konu seçilmesi azaltıldı.

Yerel havuz desteklenen işlemleri 0 model tokenıyla ve chat API çağrısı olmadan hazırlar. Normal AI yolu artık GPT-OSS 20B'yi kullanabilir. Kimya/kimyasal uygulama, güvenlik/risk, belge inceleme, ileri düzey ve belirsizlik/özel hesap işleri GPT-OSS 120B'ye gider. Ayarlarda “Ayrıntılı bilimsel çalışma” seçimi bilimsel istekleri 120B'ye yönlendirir. Bu sınıflandırma tanımlı kurallardır; bütün konular için kusursuz zorluk/risk tanısı değildir. Güvenlik talimatı ve çıktı kontrolleri her bilim modelinde korunur. Trafik nedeniyle karmaşık bilim isteği küçük modele düşürülmez; 429'dan sonra başka modelle otomatik tekrar yapılmaz.

Ekonomik kısa AI işlerinde bağlam/çıktı bütçesi küçültülür; geçerli kullanıcı mesajı ve tanımlı dışlamalar korunur. Tekrar eden bağlam talimatları kısaltıldı; GPT-OSS düşük reasoning effort kullanmaya devam eder. Bu kaynak tüketimini azaltma tasarımıdır; gerçek token tasarrufu veya model doğruluğu canlı ölçülmedi. 20B ve 120B'nin ücretsiz Groq kota tablosu aynıdır; küçük model sınırsız kullanım sağlamaz. Sunucudaki isteğe bağlı `GROQ_ECONOMY_MODEL` değişkeni ekonomik modeli belirler; önceki `GROQ_FAST_MODEL` ve `GROQ_SCIENCE_MODEL` ayarları çalışır.

Kullanıcı tercihiyle Gemini/Mistral eklenmedi. Monica Open API ücretlidir ve ücretsiz kişisel sohbet hakkıyla ayrı sistemdir. İncelenen alternatiflerin kalıcı ücretsiz/deneme/ücretli ayrımı [API-SECENEKLERI.md](API-SECENEKLERI.md) içindedir. Bu sürüm alternatif sağlayıcıya geçirilmiş değildir; kullanıcı BALKIZ arayüzünü kullanmaya devam eder, mevcut API anahtarı yalnız sunucudadır.

Teslim kontrolü yalnız JavaScript/JSON sözdizimi, dağıtım dosyalarının hazırlanması ve paket içeriğidir. Otomatik testler, tarayıcı/cihaz ve canlı Groq/Vercel çalıştırılmadı; kullanıcıya bırakıldı.

## 2.7.0 · Araştırma sohbeti, tedarik varsayımı ve NVIDIA seçeneği

Otomatik mod artık serbest etkinlik sohbetini statik kartlarla karşılamaz. “Bunu değiştir”, “başka malzemeyle aynı deney” ve “başka deney” ayrıldı. Yerel kart yalnız havuzdan açık seçimle veya “Yalnız hazır havuz” modunda açılır; kart açılması sonraki sohbeti zorla yerel moda kilitlemez. Mağaza araştırması için açık istekler yerel kalabilir. Bu tercih, anlamlı takip sohbetlerinin model kotası kullanacağı anlamına gelir; eski “her desteklenen fikir otomatik 0 token” davranışı serbest sohbet için kaldırıldı. Açılan hazır içerik yine 0 model tokenıdır.

Son çalışma sorusu, malzemeleri, yöntemin kısa özeti, son değişiklik ve dışlamalar extractive çalışma kaydıyla taşınır; ayrı özetleme/embedding model çağrısı yoktur. Numara/“ikincisi” ile seçilen alternatifin bölümü kısa bağlamda korunur. Son kullanıcı isteği ve son yanıt için ayrı geçmiş payı ayrılır. “Başka deneyin kılavuzu” artık tek kısa kart şemasına zorlanmaz; birden çok fikir isteği numaralı metin olabilir. Bu kurallar bütün Türkçe ifadeleri kusursuz anlamaz; gerçek konuşma kalitesi kullanıcı testine bırakıldı.

Gönüllüye verilen bilimsel plan ile çocuklara yapılacak anlatım ayrıldı. Yeni çalışma bilimsel derinliği araştırma düzeyindedir. “Uygun ürün ve kimyasalları tedarik edebiliriz” varsayılanı; eğitim reaktifi, ölçüm cihazı, optik filtre ve başka araçları düşünmeye izin verir. “Yalnız elimizdeki” seçeneği ve açık kullanıcı dışlamaları korunur. Stok/fiyat/SDS/ürün uygunluğu veya yapılmış tedarik garantisi değildir. Uygulama miktarı ve derişim doğrulanmadığında uydurulmaz; yine araştırma sorusu ve yöntem geliştirilebilir. Kullanıcı “tedarik edebiliriz/daha zor” derse ilgili seçenekler sonraki tur için güncellenir.

Yeni 10 ileri araştırma başlangıcıyla yerel havuz 70; 14 ek malzemeyle katalog 60; 6 yeni bilimsel başvuruyla kaynak sayısı 122 oldu. EC–derişim, C vitamini kalibrasyonu, kapalı sodyum asetat paketinde sıcaklık eğrisi, aljinat mekanik cevabı, biyopolimer akış modeli, Malus/ofset, LED kırınım geometrisi, hava sütunu modları, örnekleme/model uyumu ve sınıflandırma ablasyonu eklendi. Bunlar uygulanmış deney sonucu değildir; araç kalibrasyonu, öğretmen hazırlığı ve model sınırları açık yazılır. Önceki 31 taslak ve 131 kılavuz/ek korunur. Serbest AI'ın seçenekleri bu 70 başlangıçla sınırlı değildir.

Basit açıklamalarda ekonomik model korunur; yeni bilimsel araştırma, kılavuz, kimya/güvenlik ve ileri çalışma araştırma modeline yönlenir. Prompt/şema/cevap rezervasyonunda gerçek tokenizasyon yerine ihtiyatlı tahmin kullanılır. Daha iyi açıklama için cevap payı artırıldı; gerçek maliyet/kalite ve kota altında sohbet sayısı ölçülmedi. Kota dolduktan sonra farklı model/hesapla otomatik tekrar yapılmaz.

[API-SECENEKLERI.md](API-SECENEKLERI.md) güncel üçlü karşılaştırmayı ve NVIDIA kurulumunu içerir. GitHub Models kapanmış; HF ücretsiz hesapta dahil kredi sunmuyor. NVIDIA model denemesi için seçildi ve API adapter'ı eklendi. Free NVIDIA erişimi production hakkı olmadığı için mevcut yayın varsayılan Groq'tur. Aktivasyon sunucuda anahtar/erişim ayarlarını gerektirir; bu sürüm Vercel ortam değişkenlerini değiştirmedi. Kullanıcı BALKIZ arayüzünde kalır.

Bu sürümde yalnız sözdizimi/JSON, server import ve dağıtım dosyası kontrolleri ile build yapılır. Kullanıcının talimatıyla otomatik test, tarayıcı/cihaz ve canlı Groq/NVIDIA/Vercel testleri çalıştırılmadı. Regresyon senaryoları repoda hazırdır. Build ve Git push, konuşmanın canlı modelde doğru işlediğini kanıtlamaz.
